import React, { ReactElement } from 'react';

import { TextSegment, TextSegmentType } from 'core/structs';

import 'components/textSegment/textSegmentStyle.scss';

export interface TextSegmentProps {
  segmentData: TextSegment;
  refGatherer: (ref: HTMLDivElement | null) => void;
  selectTextSegmentFunc: (type: TextSegmentType, position: number) => void;
  deSelectTextSegmentFunc: (type: TextSegmentType, position: number) => void;
  isDisabled: boolean;
  isSelected: boolean;
  isLinked: boolean;
  isFocused: boolean;
  group: number;
  hoverHook: (isHovered: boolean) => void;
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

const selectionHandler = (props: TextSegmentProps): void => {
  const {
    selectTextSegmentFunc,
    deSelectTextSegmentFunc,
    isSelected,
    segmentData,
  } = props;
  const { type, position } = segmentData;
  if (isSelected) {
    deSelectTextSegmentFunc(type, position);
  } else {
    selectTextSegmentFunc(type, position);
  }
};

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

export const TextSegmentComponent = (props: TextSegmentProps): ReactElement => {
  const {
    segmentData,
    isSelected,
    isLinked,
    isDisabled,
    isFocused,
    group,
    refGatherer,
    hoverHook,
    displayStyle
  } = props;
  //const color = segmentColors[segmentData.color || 0];
  const selectedClass = isSelected ? "selected" : "";
  const disabledClass = isDisabled ? "disabled" : "";
  const linkedClass = isLinked ? "linked" : "not-linked";
  //const isLinkableClass = isLinkable ? "linkable" : "not-linkable";
  const focusedClass = isFocused ? "focused" : "";
  const containerStyle = displayStyle === 'line' ? lineDisplayStyle : paragraphDisplayStyle;
  const renderedGroup = displayStyle === 'line' ? group : 0;
  return (
    <div
      style={containerStyle}
      ref={refGatherer}
      className={`${segmentData.type}${segmentData.position}`}
    >
      {/*enrichedDataTop(props)*/}
      <span
        role="button"
        className={`text-segment ${disabledClass} ${linkedClass} ${selectedClass} ${focusedClass} group-${renderedGroup}`}
        tabIndex={0}
        onClick={(): void => {
          selectionHandler(props);
        }}
        onKeyPress={(): void => {
          selectionHandler(props);
        }}
        onMouseOver={() => {
          hoverHook(true);
        }}
        onMouseLeave={() => {
          hoverHook(false);
        }}
      >
        {segmentData.text}
      </span>
      {/*enrichedDataBottom(props)*/}
    </div>
  );
};

export default TextSegmentComponent;
