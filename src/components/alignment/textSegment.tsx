import React, { ReactElement } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { OverlayTrigger, Popover, Dropdown, Tooltip } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { TextSegmentProps, TextSegmentState, DefaultTextSegmentProps } from './types/textSegment';
import {
  selectSourceTextSegmentAction,
  selectTargetTextSegmentAction,
  deSelectSourceTextSegmentAction,
  deSelectTargetTextSegmentAction,
  //searchBoxSubmitsAction,
  //searchBoxChangesAction,
  //changeManuscriptAccordionAction,
  //dismissAlignment,
  //toggleManuscriptAction,
} from './actions/alignment';
import { AppState } from './reducers';
import { TranslationLink } from './structs';
//import getCurrentProjectId from '../../lib/getCurrentProjectId';

export class TextSegmentComp extends React.Component<TextSegmentProps, TextSegmentState> {
  private segmentColors: Record<number, string> = {
    0: 'default',
    1: 'blue',
    2: 'green',
    3: 'orange',
  };

  public static defaultProps: TextSegmentProps = DefaultTextSegmentProps;

  public constructor(props: TextSegmentProps) {
    super(props);
  }

  private selectionHandler(): void {
    const {
      refName,
      selectSourceTextSegmentFunc,
      selectTargetTextSegmentFunc,
      deSelectSourceTextSegmentFunc,
      deSelectTargetTextSegmentFunc,
      linkSelected,
      isLinkable,
    } = this.props;
    const selected = this.isSelected();
    const [segmentType, position] = refName.split('-');
    const newState = !selected;
    if (!linkSelected && !this.isLinked() && isLinkable) {
      if (newState) {
        if (segmentType === 'source') {
          selectSourceTextSegmentFunc(position);
        } else {
          selectTargetTextSegmentFunc(position);
        }
      } else if (segmentType === 'source') {
        deSelectSourceTextSegmentFunc(position);
      } else {
        deSelectTargetTextSegmentFunc(position);
      }
    }
  }

  private isSelected(): boolean {
    const { refName, source, target } = this.props;
    const [segmentType, position] = refName.split('-');
    if (segmentType === 'source') {
      const inSource = source.filter((item) => {
        return String(item.position) === String(position);
      });
      return Boolean(inSource.length);
    }
    const inTarget = target.filter((item) => {
      return String(item.position) === String(position);
    });
    return Boolean(inTarget.length);
  }

  private alignmentDataAndLinksPresent(alignmentData: any, verseCode: string): boolean {
    return (
      alignmentData[verseCode] &&
      alignmentData[verseCode].links &&
      alignmentData[verseCode].links.length
    );
  }

  private isLinked(): boolean {
    const { refName, verseCode, alignmentData, linksAlt } = this.props;
    const [segmentType, position] = refName.split('-');
    if (!this.alignmentDataAndLinksPresent(alignmentData, verseCode)) {
      return false;
    }

    if (segmentType === 'source') {
      const foundLinks = linksAlt.filter((link: TranslationLink): boolean => {
        const positions = link.sources;
        return positions.includes(Number(position));
      });
      return Boolean(foundLinks.length);
    }
    const foundLinks = linksAlt.filter((link: TranslationLink): boolean => {
      const positions = link.targets;
      return positions.includes(Number(position));
    });
    return Boolean(foundLinks.length);
  }

  private popoverPlacement(): 'top' | 'bottom' {
    const { reverseDisplay } = this.props;
    if (reverseDisplay) {
      return 'bottom';
    }
    return 'top';
  }

  protected searchConcordance(term: string | undefined): void {
    const { searchConcordance, isLeftPanelOpen } = this.props;
    const projectId = '1';
    if (searchConcordance) {
      searchConcordance(projectId, term, isLeftPanelOpen);
    }
  }

  private enrichedData(): ReactElement | null {
    const { refName, segment } = this.props;
    if (refName.includes('source')) {
      return (
        <OverlayTrigger
          key={refName + segment.strongsX}
          trigger="click"
          placement={this.popoverPlacement()}
          // prettier-ignore
          overlay={(
            <Popover id="test">
              <Popover.Title as="h3">{segment.text}</Popover.Title>
              <Popover.Content>
                <p>
                  {((): React.ReactElement | undefined => {
                    if (segment?.lemma) {
                      return (
                        <button
                          type="button"
                          className="btn btn-link alignment-btn"
                          onClick={(): void => {
                            this.searchConcordance(segment.lemma)
                          }}
                        >
                          {segment.lemma}
                        </button>
                      )
                    }

                    return undefined;
                  })()}
                </p>
                <p>
                  {((): React.ReactElement | undefined => {
                    if (segment?.strongsX) {
                      return (
                        <button
                          type="button"
                          className="btn btn-link alignment-btn"
                          onClick={(): void => {
                            this.searchConcordance(segment.strongsX)
                          }}
                        >
                          {segment.strongsX}
                        </button>
                      )
                    }

                    return undefined;
                  })()}
                </p>
                <p>
                  {segment.english}
                </p>
              </Popover.Content>
            </Popover>
          )}
        >
          <div className="enriched-data">{segment.english}</div>
        </OverlayTrigger>
      );
    }
    return null;
  }

  protected dropdownSearchMenu(): ReactElement | null {
    const { refName, segment, linkedTargetWords } = this.props;

    if (refName.includes('source')) {
      const { lemma, strongsX, text, english } = segment;

      if (linkedTargetWords) {
        return (
          <div>
            <Dropdown drop="down" key={refName + strongsX}>
              <Dropdown.Toggle
                variant="link"
                id={`interlinear-dropdown-btn-${refName}-${strongsX}`}
              >
                {english}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(): void => {
                    this.searchConcordance(lemma);
                  }}
                >
                  <FormattedMessage id="dict.searchLemma">
                    {(message: string): ReactElement => (
                      <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip id="tooltip-disabled">{message}</Tooltip>}
                      >
                        <span className="d-inline-block">{lemma}</span>
                      </OverlayTrigger>
                    )}
                  </FormattedMessage>
                </Dropdown.Item>

                {((): ReactElement => {
                  if (text) {
                    return (
                      <Dropdown.Item
                        onClick={(): void => {
                          this.searchConcordance(linkedTargetWords);
                        }}
                      >
                        <FormattedMessage id="dict.searchTranslation">
                          {(message: string): ReactElement => (
                            <OverlayTrigger
                              placement="right"
                              overlay={<Tooltip id="tooltip-disabled">{message}</Tooltip>}
                            >
                              <span className="d-inline-block">{linkedTargetWords}</span>
                            </OverlayTrigger>
                          )}
                        </FormattedMessage>
                      </Dropdown.Item>
                    );
                  }

                  return <></>;
                })()}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        );
      }

      return (
        <div>
          <button
            key={`interlinear-dropdown-btn-${refName}-${strongsX}`}
            type="button"
            className="btn btn-link disabled"
          >
            {english}
          </button>
        </div>
      );
    }

    return null;
  }

  private enrichedDataTop(): ReactElement | null {
    const { reverseDisplay } = this.props;
    if (reverseDisplay) {
      return this.dropdownSearchMenu();
    }
    return null;
  }

  private enrichedDataBottom(): ReactElement | null {
    const { reverseDisplay } = this.props;
    if (!reverseDisplay) {
      return this.enrichedData();
    }
    return null;
  }

  public render(): ReactElement {
    const { refName, segment, theRef, linkSelected, isLinkable } = this.props;
    const color = this.segmentColors[segment.color || 0];
    const selected = this.isSelected();
    const isLinked = this.isLinked();
    const selectedClass = selected ? 'selected' : '';
    const disabledClass = linkSelected ? 'disabled' : '';
    const isLinkedClass = isLinked ? 'disabled' : '';
    const statusClass = isLinked ? 'linked' : 'not-linked';
    const isLinkableClass = isLinkable ? 'linkable' : 'not-linkable';
    return (
      <div className="d-inline-block">
        {this.enrichedDataTop()}
        <span
          ref={theRef}
          role="button"
          className={`text-segment ${refName} ${color} ${selectedClass} ${disabledClass} ${isLinkedClass} ${isLinkableClass} ${statusClass}`}
          tabIndex={0}
          onClick={(): void => {
            this.selectionHandler();
          }}
          onKeyPress={(): void => {
            this.selectionHandler();
          }}
        >
          {segment.text}
        </span>
        {this.enrichedDataBottom()}
      </div>
    );
  }
}

export const mapStateToProps = (state: AppState): any => {
  return {
    source: state.alignment.source,
    target: state.alignment.target,
    linkSelected: state.alignment.linkSelected,
    verseCode: state.alignment.verseCode,
    alignmentData: state.alignment.alignmentData,
    reverseDisplay: state.alignment.reverseAlignmentDisplay,
    isLeftPanelOpen: state.profile.isLeftPanelOpen,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch): any => ({
  selectSourceTextSegmentFunc: (position: number): void => {
    dispatch(selectSourceTextSegmentAction(position));
  },
  selectTargetTextSegmentFunc: (position: number): void => {
    dispatch(selectTargetTextSegmentAction(position));
  },
  deSelectSourceTextSegmentFunc: (position: number): void => {
    dispatch(deSelectSourceTextSegmentAction(position));
  },
  deSelectTargetTextSegmentFunc: (position: number): void => {
    dispatch(deSelectTargetTextSegmentAction(position));
  },
  searchConcordance: (projectId: string, term: string, isLeftPanelOpen: boolean): void => {
    //if (!isLeftPanelOpen) {
      //dispatch(toggleManuscriptAction('Left'));
    //}
    //dispatch(dismissAlignment());
    //dispatch(changeManuscriptAccordionAction(2));
    //dispatch(searchBoxChangesAction(term));
    //dispatch(searchBoxSubmitsAction(projectId, term));
  },
});

const TextSegment = connect(mapStateToProps, mapDispatchToProps)(TextSegmentComp);

export default TextSegment;
