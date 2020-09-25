import React, { ReactElement } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { OverlayTrigger, Popover, Dropdown, Tooltip } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

import './textSegmentStyle.scss';

import {
  TextSegmentProps,
  TextSegmentState,
  DefaultTextSegmentProps,
} from "./types/textSegment";
//import {
  //selectSourceTextSegmentAction,
  //selectTargetTextSegmentAction,
  //deSelectSourceTextSegmentAction,
  //deSelectTargetTextSegmentAction,
  //searchBoxSubmitsAction,
  //searchBoxChangesAction,
  //changeManuscriptAccordionAction,
  //dismissAlignment,
  //toggleManuscriptAction,
//} from "./actions/alignment";
//import { AppState } from "./reducers";
import { TranslationLink } from "./structs/projectTranslations";

const segmentColors: Record<number, string> = {
  0: "default",
  1: "blue",
  2: "green",
  3: "orange",
};

const popoverPlacement = (props: TextSegmentProps): "top" | "bottom" => {
  const { reverseDisplay } = props;
  if (reverseDisplay) {
    return "bottom";
  }
  return "top";
};

const searchConcordance = (
  props: TextSegmentProps,
  term: string | undefined
): void => {
  const { searchConcordance, isLeftPanelOpen } = props;
  const projectId = "1";
  if (searchConcordance) {
    searchConcordance(projectId, term, isLeftPanelOpen);
  }
};

const alignmentDataAndLinksPresent = (
  alignmentData: any,
  verseCode: string
): boolean => {
  return (
    alignmentData[verseCode] &&
    alignmentData[verseCode].links &&
    alignmentData[verseCode].links.length
  );
};

const isLinked = (props: TextSegmentProps): boolean => {
  const { refName, verseCode, alignmentData, linksAlt } = props;
  const [segmentType, position] = refName.split("-");
  console.log("position ", position);
  console.log(segmentType);
  if (alignmentDataAndLinksPresent(alignmentData, verseCode)) {
    return false;
  }

  if (segmentType === "source") {
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
};

const isSelected = (props: TextSegmentProps): boolean => {
  const { refName, source, target } = props;
  const [segmentType, position] = refName.split("-");
  if (segmentType === "source") {
    const inSource = source.filter((item) => {
      return String(item.position) === String(position);
    });
    return Boolean(inSource.length);
  }
  const inTarget = target.filter((item) => {
    return String(item.position) === String(position);
  });
  return Boolean(inTarget.length);
};

const selectionHandler = (props: TextSegmentProps): void => {
  const {
    refName,
    selectSourceTextSegmentFunc,
    selectTargetTextSegmentFunc,
    deSelectSourceTextSegmentFunc,
    deSelectTargetTextSegmentFunc,
    linkSelected,
    isLinkable,
  } = props;
  const selected = isSelected(props);
  console.log(selected);
  const [segmentType, position] = refName.split("-");
  const newState = !selected;
  if (!linkSelected && !isLinked(props) && isLinkable) {
    if (newState) {
      if (segmentType === "source") {
        selectSourceTextSegmentFunc(position);
      } else {
        selectTargetTextSegmentFunc(position);
      }
    } else if (segmentType === "source") {
      deSelectSourceTextSegmentFunc(position);
    } else {
      deSelectTargetTextSegmentFunc(position);
    }
  }
};

const enrichedData = (props: TextSegmentProps): ReactElement | null => {
  const { refName, segment } = props;
  if (refName.includes("source")) {
    return (
      <OverlayTrigger
        key={refName + segment.strongsX}
        trigger="click"
        placement={popoverPlacement(props)}
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
                            searchConcordance(props, segment.lemma)
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
                            searchConcordance(props, segment.strongsX)
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
};

const dropdownSearchMenu = (props: TextSegmentProps): ReactElement | null => {
  const { refName, segment, linkedTargetWords } = props;

  if (refName.includes("source")) {
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
                  searchConcordance(props, lemma);
                }}
              >
                <FormattedMessage id="dict.searchLemma">
                  {(message: string): ReactElement => (
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-disabled">{message}</Tooltip>
                      }
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
                        searchConcordance(props, linkedTargetWords);
                      }}
                    >
                      <FormattedMessage id="dict.searchTranslation">
                        {(message: string): ReactElement => (
                          <OverlayTrigger
                            placement="right"
                            overlay={
                              <Tooltip id="tooltip-disabled">{message}</Tooltip>
                            }
                          >
                            <span className="d-inline-block">
                              {linkedTargetWords}
                            </span>
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
};

const enrichedDataTop = (props: TextSegmentProps): ReactElement | null => {
  const { reverseDisplay } = props;
  if (reverseDisplay) {
    return dropdownSearchMenu(props);
  }
  return null;
};

const enrichedDataBottom = (props: TextSegmentProps): ReactElement | null => {
  const { reverseDisplay } = props;
  if (!reverseDisplay) {
    return enrichedData(props);
  }
  return null;
};

export const TextSegment = (props: TextSegmentProps): ReactElement => {
  const { refName, segment, theRef, linkSelected, isLinkable } = props;
  const color = segmentColors[segment.color || 0];
  const selected = isSelected(props);
  const selectedClass = selected ? "selected" : "";
  const disabledClass = linkSelected ? "disabled" : "";
  const isLinkedClass = isLinked(props) ? "disabled" : "";
  const statusClass = isLinked(props) ? "linked" : "not-linked";
  const isLinkableClass = isLinkable ? "linkable" : "not-linkable";
  return (
    <div style={{display: 'inline-block'}}>
      {enrichedDataTop(props)}
      <span
        ref={theRef}
        role="button"
        className={`text-segment ${refName} ${color} ${selectedClass} ${disabledClass} ${isLinkedClass} ${isLinkableClass} ${statusClass}`}
        tabIndex={0}
        onClick={(): void => {
          selectionHandler(props);
        }}
        onKeyPress={(): void => {
          selectionHandler(props);
        }}
      >
        {segment.text}
      </span>
      {enrichedDataBottom(props)}
    </div>
  );
};

//export class TextSegmentComp extends React.Component<
  //TextSegmentProps,
  //TextSegmentState
//> {
  //public static defaultProps: TextSegmentProps = DefaultTextSegmentProps;

  //public constructor(props: TextSegmentProps) {
    //super(props);
  //}
//}

//export const mapStateToProps = (state: AppState): any => {
  //return {
    //source: state.alignment.source,
    //target: state.alignment.target,
    //linkSelected: state.alignment.linkSelected,
    //verseCode: state.alignment.verseCode,
    //alignmentData: state.alignment.alignmentData,
    //reverseDisplay: state.alignment.reverseAlignmentDisplay,
    //isLeftPanelOpen: state.profile.isLeftPanelOpen,
  //};
//};

//export const mapDispatchToProps = (dispatch: Dispatch): any => ({
  //selectSourceTextSegmentFunc: (position: number): void => {
    //dispatch(selectSourceTextSegmentAction(position));
  //},
  //selectTargetTextSegmentFunc: (position: number): void => {
    //dispatch(selectTargetTextSegmentAction(position));
  //},
  //deSelectSourceTextSegmentFunc: (position: number): void => {
    //dispatch(deSelectSourceTextSegmentAction(position));
  //},
  //deSelectTargetTextSegmentFunc: (position: number): void => {
    //dispatch(deSelectTargetTextSegmentAction(position));
  //},
  //searchConcordance: (
    //projectId: string,
    //term: string,
    //isLeftPanelOpen: boolean
  //): void => {
    //if (!isLeftPanelOpen) {
    //dispatch(toggleManuscriptAction('Left'));
    //}
    //dispatch(dismissAlignment());
    //dispatch(changeManuscriptAccordionAction(2));
    //dispatch(searchBoxChangesAction(term));
    //dispatch(searchBoxSubmitsAction(projectId, term));
  //},
//});

//const TextSegment = connect(mapStateToProps, mapDispatchToProps)(TextSegmentComp);

export default TextSegment;
