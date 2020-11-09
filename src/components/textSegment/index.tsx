import React, { ReactElement, useContext } from 'react';

import { AlignmentActionTypes } from 'contexts/alignment/reducer';

import { AlignmentContext } from 'contexts/alignment';
import { TextSegment, TextSegmentType } from 'core/structs';
import { Link } from 'core/structs/link';

import 'components/textSegment/textSegmentStyle.scss';

export interface TextSegmentProps {
  segmentData: TextSegment;
  isDisabled: boolean;
  isSelected: boolean;
  isLinked: boolean;
  group: number;
  displayStyle: 'line' | 'paragraph';
}

const lineDisplayStyle = { display: 'inline-block' };
const paragraphDisplayStyle = { display: 'inline-block', marginTop: '1rem' };

//const segmentColors: Record<number, string> = {
//0: 'default',
//1: 'blue',
//2: 'green',
//3: 'orange',
//};

//const popoverPlacement = (props: TextSegmentProps): "top" | "bottom" => {
//const { reverseDisplay } = props;
//if (reverseDisplay) {
//return "bottom";
//}
//return "top";
//};

//const searchConcordance = (
//props: TextSegmentProps,
//term: string | undefined
//): void => {
//const { searchConcordance, isLeftPanelOpen } = props;
//const projectId = "1";
//if (searchConcordance) {
//searchConcordance(projectId, term, isLeftPanelOpen);
//}
//};

//const selectionHandler = (props: TextSegmentProps): void => {
//const {
//selectTextSegmentFunc,
//deSelectTextSegmentFunc,
//isSelected,
//segmentData,
//} = props;
//const { type, position } = segmentData;
//if (isSelected) {
//deSelectTextSegmentFunc(type, position);
//} else {
//selectTextSegmentFunc(type, position);
//}
//};

//const enrichedData = (props: TextSegmentProps): ReactElement | null => {
//const { refName, segment } = props;
//if (refName.includes("source")) {
//return (
//<OverlayTrigger
//key={refName + segment.strongsX}
//trigger="click"
//placement={popoverPlacement(props)}
//prettier-ignore
//overlay={(
//<Popover id="test">
//<Popover.Title as="h3">{segment.text}</Popover.Title>
//<Popover.Content>
//<p>
//{((): React.ReactElement | undefined => {
//if (segment?.lemma) {
//return (
//<button
//type="button"
//className="btn btn-link alignment-btn"
//onClick={(): void => {
//searchConcordance(props, segment.lemma)
//}}
//>
//{segment.lemma}
//</button>
//)
//}

//return undefined;
//})()}
//</p>
//<p>
//{((): React.ReactElement | undefined => {
//if (segment?.strongsX) {
//return (
//<button
//type="button"
//className="btn btn-link alignment-btn"
//onClick={(): void => {
//searchConcordance(props, segment.strongsX)
//}}
//>
//{segment.strongsX}
//</button>
//)
//}

//return undefined;
//})()}
//</p>
//<p>
//{segment.english}
//</p>
//</Popover.Content>
//</Popover>
//)}
//>
//<div className="enriched-data">{segment.english}</div>
//</OverlayTrigger>
//);
//}
//return null;
//};

//const dropdownSearchMenu = (props: TextSegmentProps): ReactElement | null => {
//const { refName, segment, linkedTargetWords } = props;

//if (refName.includes("source")) {
//const { lemma, strongsX, text, english } = segment;

//if (linkedTargetWords) {
//return (
//<div>
//<Dropdown drop="down" key={refName + strongsX}>
//<Dropdown.Toggle
//variant="link"
//id={`interlinear-dropdown-btn-${refName}-${strongsX}`}
//>
//{english}
//</Dropdown.Toggle>

//<Dropdown.Menu>
//<Dropdown.Item
//onClick={(): void => {
//searchConcordance(props, lemma);
//}} >
//<FormattedMessage id="dict.searchLemma">
//{(message: string): ReactElement => (
//<OverlayTrigger
//placement="right"
//overlay={
//<Tooltip id="tooltip-disabled">{message}</Tooltip>
//}
//>
//<span className="d-inline-block">{lemma}</span>
//</OverlayTrigger>
//)}
//</FormattedMessage>
//</Dropdown.Item>

//{((): ReactElement => {
//if (text) {
//return (
//<Dropdown.Item
//onClick={(): void => {
//searchConcordance(props, linkedTargetWords);
//}}
//>
//<FormattedMessage id="dict.searchTranslation">
//{(message: string): ReactElement => (
//<OverlayTrigger
//placement="right"
//overlay={
//<Tooltip id="tooltip-disabled">{message}</Tooltip>
//}
//>
//<span className="d-inline-block">
//{linkedTargetWords}
//</span>
//</OverlayTrigger>
//)}
//</FormattedMessage>
//</Dropdown.Item>
//);
//}

//return <></>;
//})()}
//</Dropdown.Menu>
//</Dropdown>
//</div>
//);
//}

//return (
//<div>
//<button
//key={`interlinear-dropdown-btn-${refName}-${strongsX}`}
//type="button"
//className="btn btn-link disabled"
//>
//{english}
//</button>
//</div>
//);
//}

//return null;
//};

//const enrichedDataTop = (props: TextSegmentProps): ReactElement | null => {
//const { reverseDisplay } = props;
//if (reverseDisplay) {
//return dropdownSearchMenu(props);
//}
//return null;
//};

//const enrichedDataBottom = (props: TextSegmentProps): ReactElement | null => {
//const { reverseDisplay } = props;
//if (!reverseDisplay) {
//return enrichedData(props);
//}
//return null;
//};

const findRelatedLink = (textSegment: TextSegment, links: Link[]): Link|undefined => {
return links.find((link: Link): boolean =>{ 

        if (textSegment.type === 'source') { return link.sources.includes(textSegment.position)} 
        if (textSegment.type === 'target') { return link.targets.includes(textSegment.position)} return false});

};

const handleLinkSelection = (
  link: Link,
  dispatch: React.Dispatch<AlignmentActionTypes>
): void => {
  dispatch({
    type: 'setInProgressLink',
    payload: link,
  });

  link.sources.forEach((sourcePosition: number): void => {
    dispatch({
      type: 'toggleSelectedSourceTextSegment',
      payload: { position: sourcePosition },
    });
  });

  link.targets.forEach((targetPosition: number): void => {
    dispatch({
      type: 'toggleSelectedTargetTextSegment',
      payload: { position: targetPosition },
    });
  });
};

const handleSegmentSelection = (
  type: TextSegmentType,
  position: number,
  dispatch: React.Dispatch<AlignmentActionTypes>
): void => {
  if (type === 'source') {
    dispatch({
      type: `toggleSelectedSourceTextSegment`,
      payload: { position },
    });
  }
  if (type === 'target') {
    dispatch({
      type: `toggleSelectedTargetTextSegment`,
      payload: { position },
    });
  }
};

const handleClick = (
  type: TextSegmentType,
  position: number,
  relatedLink: Link | undefined,
  inProgressLink: Link | null,
  dispatch: React.Dispatch<AlignmentActionTypes>
): void => {
  console.log(inProgressLink);

  if (relatedLink) {
    handleLinkSelection(relatedLink, dispatch);
  } else if (inProgressLink) {
    handleLinkSelection(
      {
        sources: inProgressLink.sources.concat(
          type === 'source' ? [position] : []
        ),
        targets: inProgressLink.targets.concat(
          type === 'target' ? [position] : []
        ),
        type: 'manual',
      },
      dispatch
    );
  } else {
    handleSegmentSelection(type, position, dispatch);
  }
};
export const TextSegmentComponent = (props: TextSegmentProps): ReactElement => {
  const {
    segmentData,
    isSelected,
    isLinked,
    isDisabled,
    group,
    displayStyle,
  } = props;
  //const color = segmentColors[segmentData.color || 0];

  const { state, dispatch } = useContext(AlignmentContext);

  const relatedLink = findRelatedLink(segmentData, state.links);

  const selectedClass = isSelected ? 'selected' : '';
  const disabledClass = isDisabled ? 'disabled' : '';
  const linkedClass = isLinked ? 'linked' : 'not-linked';
  //const isLinkableClass = isLinkable ? "linkable" : "not-linkable";
  const focusedClass =
    relatedLink && state.focusedLinks.get(relatedLink) ? 'focused' : '';
  const containerStyle =
    displayStyle === 'line' ? lineDisplayStyle : paragraphDisplayStyle;
  const renderedGroup = displayStyle === 'line' ? group : 0;

  return (
    <div
      style={containerStyle}
      ref={(ref: HTMLDivElement) => {
        if (ref && displayStyle === 'line') {
          if (segmentData.type === 'source') {
            if (state.sourceRefs[segmentData.position] !== ref) {
              dispatch({
                type: 'addSourceRef',
                payload: { position: segmentData.position, ref: ref },
              });
            }
          }
          if (state.targetRefs[segmentData.position] !== ref) {
            if (segmentData.type === 'target') {
              dispatch({
                type: 'addTargetRef',
                payload: { position: segmentData.position, ref: ref },
              });
            }
          }
        }
      }}
      className={`${segmentData.type}${segmentData.position}`}
    >
      {/*enrichedDataTop(props)*/}
      <span
        role="button"
        className={`text-segment ${disabledClass} ${linkedClass} ${selectedClass} ${focusedClass} group-${renderedGroup}`}
        tabIndex={0}
        onClick={() => {
          handleClick(
            segmentData.type,
            segmentData.position,
            relatedLink,
            state.inProgressLink,
            dispatch
          );
        }}
        onKeyPress={() => {
          handleClick(
            segmentData.type,
            segmentData.position,
            relatedLink,
            state.inProgressLink,
            dispatch
          );
        }}
        onMouseOver={() => {
          if (relatedLink) {
            dispatch({ type: 'focusLink', payload: { link: relatedLink } });
          }
        }}
        onMouseLeave={() => {
          if (relatedLink) {
            dispatch({ type: 'unFocusLink', payload: { link: relatedLink } });
          }
        }}
      >
        {segmentData.text}
      </span>
      {/*enrichedDataBottom(props)*/}
    </div>
  );
};

export default TextSegmentComponent;
