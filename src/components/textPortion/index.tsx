import React, { ReactElement, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

import { AlignmentContext } from 'contexts/alignment';

import { findLinkForTextSegment } from 'core/findLink';
import { determineGroup } from 'core/findGroup';
import { TextSegment, TextSegmentType, Link } from 'core/structs';
import TextSegmentComponent from 'components/textSegment';

type Direction = 'ltr' | 'rtl';

interface TextPortionProps {
  type: TextSegmentType;
  textSegments: TextSegment[];
  refGatherer: (position: number, ref: HTMLDivElement | null) => void;
  links: Link[];
  direction: Direction;
  toggleDirection: (oldState: Direction) => void;
  textDirectionToggle: boolean;
  displayStyle: 'line' | 'paragraph';
  toggleTextSelectionFunc: (type: TextSegmentType, position: number) => void;
  segmentSelections: Record<number, boolean>;
}

const lineDisplayStyle = {
  display: 'inline-block',
  whiteSpace: 'nowrap',
};
const paragraphDisplayStyle = {
  display: 'inline-block',
};

const isFocused = (
  links: Link[],
  focusedLinks: Map<Link, boolean>,
  textSegment: TextSegment
): boolean => {
  const link = findLinkForTextSegment(links, textSegment);
  if (link && focusedLinks) {
    return focusedLinks.get(link) ?? false;
  }
  return false;
};

const textDirectionToggle = (props: TextPortionProps): ReactElement => {
  if (props.textDirectionToggle) {
    return (
      <FontAwesomeIcon
        icon={faExchangeAlt}
        style={{
          cursor: 'pointer',
          background: 'black',
          color: 'white',
          borderRadius: '5px',
          fontSize: '1rem',
          marginTop: '-0.2rem',
          padding: '0.3rem',
        }}
        onClick={(): void => {
          props.toggleDirection(props.direction);
        }}
      />
    );
  }
  return <></>;
};
export const TextPortion = (props: TextPortionProps): ReactElement => {
  const {
    type,
    refGatherer,
    textSegments,
    links,
    direction,
    displayStyle,
    toggleTextSelectionFunc,
    segmentSelections,
  } = props;

  const { state, dispatch } = useContext(AlignmentContext);

  const configuredStyle =
    displayStyle === 'line' ? lineDisplayStyle : paragraphDisplayStyle;

  return (
    <div style={{ display: 'flex', alignContent: 'center' }}>
      {textDirectionToggle(props)}

      <div
        className={`${type}-container`}
        style={{ ...configuredStyle, direction }}
      >
        {textSegments.map(
          (textSegment, index): ReactElement => {
            const relatedLink = findLinkForTextSegment(links, textSegment);
            const linkIndex = relatedLink ? links.indexOf(relatedLink) : index;
            return (
              <TextSegmentComponent
                key={`${type}-${textSegment.position}`}
                refGatherer={refGatherer.bind(null, textSegment.position)}
                segmentData={textSegment}
                isDisabled={textSegment.catIsContent === false ?? false}
                isSelected={
                  segmentSelections &&
                  (segmentSelections[textSegment.position] ?? false)
                }
                isLinked={Boolean(relatedLink)}
                group={determineGroup(links, linkIndex)}
                toggleTextSelectionFunc={toggleTextSelectionFunc}
                displayStyle={displayStyle}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default TextPortion;
