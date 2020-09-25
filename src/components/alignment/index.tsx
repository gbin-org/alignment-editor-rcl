/* eslint-disable jsx-a11y/click-events-have-key-events  */
import React, { ReactElement } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import _ from 'lodash';
import Spinner from '../spinner';
import {
  fetchAlignmentDataAction,
  //verifyAlignmentAction,
  addLinkAction,
  clearLinkSelectionsAction,
  removeSelectedLinkAction,
  reverseAlignmentDisplayAction,
  //uncheckCompleteBoxAction,
  //updateVerseStatusAction,
  //openEditorAction,
  //fetchSuggestionAction,
  selectSourceTextSegmentAction,
  selectTargetTextSegmentAction,
} from './actions/alignment';
import { AlignmentProps, AlignmentState, DefaultAlignmentProps } from './types/alignment';
import { AppState } from './reducers';
//import getCurrentProjectId from '../../lib/getCurrentProjectId';
import LinksContainer from './linksContainer';
import { SelectedTextSegment, TranslationLink } from './structs';
import { VerseIdParser } from './verseIdParser';
import { isHackedForAlignment } from './hackedVerseIds';
import SelectAlignmentDirection from './selectAlignmentDirection';

export class AlignmentComp extends React.Component<AlignmentProps, AlignmentState> {
  private verseIdParser: VerseIdParser = new VerseIdParser();

  public static defaultProps: AlignmentProps = DefaultAlignmentProps;

  private reverseSourceLinksIfNeeded(): SelectedTextSegment[] {
    const {
      source,
      verseCode,
      isRTL,
      alignmentData,
      isNTrtlAlignSource,
      isOTrtlAlignSource,
      isNTltrAlignSource,
      isOTltrAlignSource,
    } = this.props;

    let sourceTextAlt = _.cloneDeep(source);

    // are we in OT or NT?
    const verseIdParser = new VerseIdParser();
    const testament = verseIdParser.isNT(verseCode) ? 'nt' : 'ot';

    let reverseTextSource = false;

    if (isRTL) {
      reverseTextSource = true;
      if (testament === 'ot') {
        if (isOTrtlAlignSource) {
          reverseTextSource = false;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (isNTrtlAlignSource) {
          reverseTextSource = false;
        }
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (testament === 'ot') {
        if (isOTltrAlignSource) {
          reverseTextSource = true;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (isNTltrAlignSource) {
          reverseTextSource = true;
        }
      }
    }

    if (reverseTextSource) {
      const verseAlignmentData = alignmentData[verseCode];
      const sourceTextLen = verseAlignmentData.sourceSegments.length;

      const sourceArray = new Array<SelectedTextSegment>();
      source.forEach((item: SelectedTextSegment) => {
        const segment: SelectedTextSegment = { position: sourceTextLen - item.position - 1 };
        sourceArray.push(segment);
      });
      sourceTextAlt = sourceArray;
    }

    return sourceTextAlt;
  }

  private reverseTargetLinksIfNeeded(): SelectedTextSegment[] {
    const {
      target,
      verseCode,
      isRTL,
      alignmentData,
      isNTrtlAlignTarget,
      isOTrtlAlignTarget,
      isNTltrAlignTarget,
      isOTltrAlignTarget,
    } = this.props;

    let targetTextAlt = _.cloneDeep(target);

    // are we in OT or NT?
    const verseIdParser = new VerseIdParser();
    const testament = verseIdParser.isNT(verseCode) ? 'nt' : 'ot';

    let reverseTextTarget = false;

    if (isRTL) {
      reverseTextTarget = true;
      if (testament === 'ot') {
        if (isOTrtlAlignTarget) {
          reverseTextTarget = false;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (isNTrtlAlignTarget) {
          reverseTextTarget = false;
        }
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (testament === 'ot') {
        if (isOTltrAlignTarget) {
          reverseTextTarget = true;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (isNTltrAlignTarget) {
          reverseTextTarget = true;
        }
      }
    }

    if (reverseTextTarget) {
      // reverse the order back to LTR position order
      const verseAlignmentData = alignmentData[verseCode];
      const targetTextLen = verseAlignmentData.textSegments.length;

      const targetArray = new Array<SelectedTextSegment>();
      target.forEach((item: SelectedTextSegment) => {
        const segment: SelectedTextSegment = { position: targetTextLen - item.position - 1 };
        targetArray.push(segment);
      });
      targetTextAlt = targetArray;
    }

    return targetTextAlt;
  }

  private createLink(): void {
    if (this.hasSourceAndTargetSelection()) {
      const { verseCode, addLinkFunc, clearLinkSelectionsFunc } = this.props;

      const sourceTextAlt = this.reverseSourceLinksIfNeeded();
      const targetTextAlt = this.reverseTargetLinksIfNeeded();

      addLinkFunc(verseCode, sourceTextAlt, targetTextAlt);
      clearLinkSelectionsFunc();
    }
  }

  private removeLink(verseCode: string): void {
    const { linkSelected, removeSelectedLinkFunc } = this.props;
    if (linkSelected) {
      const sourceTextAlt = this.reverseSourceLinksIfNeeded();
      const targetTextAlt = this.reverseTargetLinksIfNeeded();

      removeSelectedLinkFunc(verseCode, sourceTextAlt, targetTextAlt);
    }
  }

  private handleKeyboard(event: any): void {
    const { isReadOnly } = this.props;
    if (!isReadOnly) {
      if (event.key === ' ') {
        const { verseCode, linkSelected } = this.props;
        if (linkSelected) {
          this.removeLink(verseCode);
        } else if (this.hasSourceAndTargetSelection()) {
          this.createLink();
        }
      }
    }
  }

  private hasSelection(): boolean {
    const { source, target } = this.props;
    return Boolean(source.length) || Boolean(target.length);
  }

  private hasSourceAndTargetSelection(): boolean {
    const { source, target } = this.props;
    return Boolean(source.length) && Boolean(target.length);
  }

  public instruction(): ReactElement {
    const { linkSelected } = this.props;
    let message: ReactElement = <FormattedMessage id="alignment.addOrRemove" />;
    if (this.hasSelection()) {
      message = <FormattedMessage id="alignment.selectAndAdd" />;
    }

    if (linkSelected) {
      message = <FormattedMessage id="alignment.removeOrClear" />;
    }
    return <span className="alignment-action message">{message}</span>;
  }

  public mode(): ReactElement {
    const {
      verseCode,
      linkSelected,
      isReadOnly,
      clearLinkSelectionsFunc,
      reverseAlignmentDisplayFunc,
    } = this.props;
    let addClasses = 'alignment-action add disabled';
    let removeClasses = 'alignment-action remove disabled';
    let clearClasses = 'alignment-action clear disabled';

    if (this.hasSelection()) {
      clearClasses = 'alignment-action';
    }

    if (!isReadOnly) {
      if (this.hasSourceAndTargetSelection()) {
        addClasses = 'alignment-action add';
      }

      if (linkSelected) {
        addClasses = 'alignment-action add disabled';
        removeClasses = 'alignment-action remove';
      }
    }
    return (
      <span className="alignment-modal-mode">
        <OverlayTrigger
          key="tooltip-alignment-add"
          trigger="hover"
          placement="top"
          // prettier-ignore
          overlay={(
            <Tooltip id="tooltip-alignment-add">
              <FormattedMessage id="alignment.add" />
            </Tooltip>
          )}
        >
          <i
            tabIndex={0}
            aria-label="Add Link"
            role="button"
            className={`fas fa-link ${addClasses}`}
            onClick={(): void => {
              if (!isReadOnly) {
                this.createLink();
              }
            }}
          />
        </OverlayTrigger>
        <OverlayTrigger
          key="tooltip-alignment-delete"
          trigger="hover"
          placement="top"
          // prettier-ignore
          overlay={(
            <Tooltip id="tooltip-alignment-delete">
              <FormattedMessage id="alignment.delete" />
            </Tooltip>
          )}
        >
          <i
            tabIndex={0}
            aria-label="Remove Link"
            role="button"
            className={`fas fa-unlink ${removeClasses}`}
            onClick={(): void => {
              if (!isReadOnly) {
                this.removeLink(verseCode);
              }
            }}
          />
        </OverlayTrigger>
        <OverlayTrigger
          key="tooltip-alignment-clear"
          trigger="hover"
          placement="top"
          // prettier-ignore
          overlay={(
            <Tooltip id="tooltip-alignment-clear">
              <FormattedMessage id="alignment.clear" />
            </Tooltip>
          )}
        >
          <i
            tabIndex={0}
            aria-label="Clear Selection"
            role="button"
            className={`fas fa-recycle ${clearClasses}`}
            onClick={(): void => {
              clearLinkSelectionsFunc(verseCode);
            }}
          />
        </OverlayTrigger>
        <OverlayTrigger
          key="tooltip-alignment-reverse"
          trigger="hover"
          placement="top"
          // prettier-ignore
          overlay={(
            <Tooltip id="tooltip-alignment-reverse">
              <FormattedMessage id="alignment.reverse" />
            </Tooltip>
          )}
        >
          <i
            aria-label="Reverse Display"
            className="alignment-action reverse fas fa-exchange-alt fa-rotate-90"
            role="button"
            tabIndex={0}
            onKeyDown={(): void => {
              reverseAlignmentDisplayFunc();
            }}
            onClick={(): void => {
              reverseAlignmentDisplayFunc();
            }}
          />
        </OverlayTrigger>
      </span>
    );
  }

  public content(): ReactElement {
    const {
      alignmentData,
      verseCode,
      isRTL,
      isNTrtlAlignSource,
      isOTrtlAlignSource,
      isNTltrAlignSource,
      isOTltrAlignSource,
      isNTrtlAlignTarget,
      isOTrtlAlignTarget,
      isNTltrAlignTarget,
      isOTltrAlignTarget,
    } = this.props;
    const verseAlignmentData = alignmentData[verseCode];
    if (!Object.keys(alignmentData[verseCode]).length) {
      return (
        <>
          <FormattedMessage id="alignment.error" />
        </>
      );
    }
    if (
      verseAlignmentData === 'loading' ||
      !(verseAlignmentData.sourceText && verseAlignmentData.text)
    ) {
      return (
        <div key="alignment-data-spinner-container" className="alignment-spinner">
          <Spinner key="alignment-data-loading-spinner" />
        </div>
      );
    }
    return (
      <LinksContainer
        sourceText={verseAlignmentData.sourceManuscriptData}
        targetText={verseAlignmentData.textSegments}
        links={verseAlignmentData.links}
        verseCode={verseCode}
        isRTL={isRTL}
        isNTrtlAlignSource={isNTrtlAlignSource}
        isOTrtlAlignSource={isOTrtlAlignSource}
        isNTltrAlignSource={isNTltrAlignSource}
        isOTltrAlignSource={isOTltrAlignSource}
        isNTrtlAlignTarget={isNTrtlAlignTarget}
        isOTrtlAlignTarget={isOTrtlAlignTarget}
        isNTltrAlignTarget={isNTltrAlignTarget}
        isOTltrAlignTarget={isOTltrAlignTarget}
      />
    );
  }

  public reference(): ReactElement {
    const { verseCode } = this.props;
    if (verseCode) {
      const { book, ref } = this.verseIdParser.getReadableReferenceForGbiId(verseCode);
      const reference = ` ${ref}`;
      return (
        <>
          <FormattedMessage id={book} />
          {reference}
        </>
      );
    }
    return <></>;
  }

  public render(): ReactElement {
    const {
      isVisible,
      verseCode,
      alignmentData,
      verifyAlignmentFunc,
      closeAlignmentFunc,
      //fetchDataFunc,
      isRTL,
      isNTrtlAlignSource,
      isOTrtlAlignSource,
      isNTltrAlignSource,
      isOTltrAlignSource,
      isNTrtlAlignTarget,
      isOTrtlAlignTarget,
      isNTltrAlignTarget,
      isOTltrAlignTarget,
      reverseAlignmentDisplay,
      clearLinkSelectionsFunc,
    } = this.props;
    const verseAlignmentData = alignmentData[verseCode];
    let localLinksVerified = false;
    //if (!verseAlignmentData) {
      //fetchDataFunc(getCurrentProjectId(), verseCode);
      //return <Spinner />;
    //}

    const { linksVerified } = verseAlignmentData;
    if (linksVerified) {
      localLinksVerified = linksVerified;
    }

    return (
      <div role="none" onKeyDown={this.handleKeyboard.bind(this)}>
        <Modal
          className="alignment-modal"
          show={isVisible && isHackedForAlignment(verseCode)}
          dialogClassName="modal-full"
        >
          <Modal.Header closeButton={false}>
            <div className="header-container">
              <Modal.Title>
                <FormattedMessage id="checking" />
                :&nbsp;
                <div className="alignment-reference">{this.reference()}</div>
              </Modal.Title>
              {this.instruction()}
            </div>
          </Modal.Header>
          <Modal.Body>
            <div key="alignment-modal-content" className="alignment-modal-content">
              <div className="left-modal-panel">
                <div className="inside-modal-top">
                  <SelectAlignmentDirection
                    isNTrtlAlignSource={isNTrtlAlignSource}
                    isOTrtlAlignSource={isOTrtlAlignSource}
                    isNTltrAlignSource={isNTltrAlignSource}
                    isOTltrAlignSource={isOTltrAlignSource}
                    isNTrtlAlignTarget={isNTrtlAlignTarget}
                    isOTrtlAlignTarget={isOTrtlAlignTarget}
                    isNTltrAlignTarget={isNTltrAlignTarget}
                    isOTltrAlignTarget={isOTltrAlignTarget}
                    isRTL={isRTL}
                    verseCode={verseCode}
                    uid=""
                    iconPosition="top"
                    reverseAlignmentDisplay={reverseAlignmentDisplay}
                    clearLinkSelectionsFunc={clearLinkSelectionsFunc}
                  />
                </div>
                <div className="inside-modal-bottom">
                  <SelectAlignmentDirection
                    isNTrtlAlignSource={isNTrtlAlignSource}
                    isOTrtlAlignSource={isOTrtlAlignSource}
                    isNTltrAlignSource={isNTltrAlignSource}
                    isOTltrAlignSource={isOTltrAlignSource}
                    isNTrtlAlignTarget={isNTrtlAlignTarget}
                    isOTrtlAlignTarget={isOTrtlAlignTarget}
                    isNTltrAlignTarget={isNTltrAlignTarget}
                    isOTltrAlignTarget={isOTltrAlignTarget}
                    isRTL={isRTL}
                    verseCode={verseCode}
                    uid=""
                    iconPosition="bottom"
                    reverseAlignmentDisplay={reverseAlignmentDisplay}
                    clearLinkSelectionsFunc={clearLinkSelectionsFunc}
                  />
                </div>
              </div>
              {this.content()}
            </div>
          </Modal.Body>

          <Modal.Footer className="alignment-modal-footer">
            {this.mode()}

            <div className="verify">
              <OverlayTrigger
                key="tooltip-alignment-close"
                trigger="hover"
                placement="top"
                // prettier-ignore
                overlay={(
                  <Tooltip id="tooltip-alignment-close">
                    <FormattedMessage id="alignment.close" />
                  </Tooltip>
                )}
              >
                <i
                  tabIndex={0}
                  id="close-alignment"
                  aria-label="Close Alignment"
                  role="button"
                  className="fas fa-times alignment-action"
                  onClick={(): void => {
                    closeAlignmentFunc();
                  }}
                  onKeyDown={(): void => {
                    closeAlignmentFunc();
                  }}
                />
              </OverlayTrigger>

              <OverlayTrigger
                key="tooltip-alignment-verify"
                trigger="hover"
                placement="top"
                // prettier-ignore
                overlay={(
                  <Tooltip id="tooltip-alignment-verify">
                    <FormattedMessage id="alignment.verify" />
                  </Tooltip>
                )}
              >
                <button
                  type="button"
                  // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                  tabIndex={2}
                  id="verify-alignment"
                  aria-label="Verify Alignment"
                  className="btn-link alignment-action d-content"
                  onClick={(): void => {
                    verifyAlignmentFunc(
                      '1',
                      verseCode,
                      alignmentData[verseCode].links,
                    );
                  }}
                  onKeyDown={(): void => {
                    verifyAlignmentFunc(
                      '1',
                      verseCode,
                      alignmentData[verseCode].links,
                    );
                  }}
                  disabled={localLinksVerified}
                >
                  <i className="fas fa-check" />
                </button>
              </OverlayTrigger>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export const mapStateToProps = (state: AppState): any => {
  return {
    alignmentData: state.alignment.alignmentData,
    isVisible: state.verseEditor.triggerAlignmentFlag,
    verseCode: state.alignment.verseCode,
    source: state.alignment.source,
    target: state.alignment.target,
    linkSelected: state.alignment.linkSelected,
    isReadOnly: state.project.isReadOnly,
    isRTL: state.project.isRTL,
    isNTrtlAlignSource: state.profile.isNTrtlAlignSource,
    isOTrtlAlignSource: state.profile.isOTrtlAlignSource,
    isNTltrAlignSource: state.profile.isNTltrAlignSource,
    isOTltrAlignSource: state.profile.isOTltrAlignSource,
    isNTrtlAlignTarget: state.profile.isNTrtlAlignTarget,
    isOTrtlAlignTarget: state.profile.isOTrtlAlignTarget,
    isNTltrAlignTarget: state.profile.isNTltrAlignTarget,
    isOTltrAlignTarget: state.profile.isOTltrAlignTarget,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): any => ({
  fetchDataFunc: (projectId: string, verseId: string): void => {
    dispatch(fetchAlignmentDataAction(projectId, verseId));
  },

  addLinkFunc: (
    verseCode: string,
    sources: SelectedTextSegment[],
    targets: SelectedTextSegment[],
  ): void => {
    const convertedSources = sources.map((source) => {
      return Number(source.position);
    });
    const convertedTargets = targets.map((target) => {
      return Number(target.position);
    });
    dispatch(addLinkAction(verseCode, convertedSources, convertedTargets));
  },

  clearLinkSelectionsFunc: (): void => {
    dispatch(clearLinkSelectionsAction());
  },

  selectSourceTextSegmentFunc: (position: number): void => {
    dispatch(selectSourceTextSegmentAction(position));
  },

  selectTargetTextSegmentFunc: (position: number): void => {
    dispatch(selectTargetTextSegmentAction(position));
  },

  removeSelectedLinkFunc: (
    verseCode: string,
    sourceAlt: SelectedTextSegment[],
    targetAlt: SelectedTextSegment[],
  ): void => {
    dispatch(removeSelectedLinkAction(verseCode, sourceAlt, targetAlt));
  },

  closeAlignmentFunc: (): void => {
    dispatch(clearLinkSelectionsAction());
  },

  verifyAlignmentFunc: (projectId: string, verseId: string, links: TranslationLink): void => {
    //dispatch(verifyAlignmentAction(projectId, verseId, links));
    dispatch(clearLinkSelectionsAction());
  },

  reverseAlignmentDisplayFunc: (): void => {
    dispatch(reverseAlignmentDisplayAction());
  },

  uncheckCompleteBoxFunc: (verseCode: string): void => {
    //dispatch(uncheckCompleteBoxAction(verseCode));
  },

  openEditorFunc: (verseCode: string): void => {
    //dispatch(openEditorAction(verseCode));
  },

  fetchSuggestionFunc: (projectId: string, textId: string, versification: string): void => {
    //dispatch(fetchSuggestionAction(projectId, textId, versification));
  },

  updateVerseStatusFunc: (projectId: string, textId: string, complete: boolean): void => {
    //dispatch(updateVerseStatusAction(projectId, textId, complete));
  },
});

const Alignment = connect(mapStateToProps, mapDispatchToProps)(AlignmentComp);

export default Alignment;
