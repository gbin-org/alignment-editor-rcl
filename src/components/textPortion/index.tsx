import React, { ReactElement, useContext } from 'react';

import { AlignmentContext } from 'contexts/alignment';
import { TextSegment, TextSegmentType, SyntaxNode, Link } from 'core/structs';
import { TextSegmentWrapper } from 'components/textSegmentWrapper';

import './textPortionStyle.scss';

interface TextPortionProps {
  type: TextSegmentType;
  textSegments: TextSegment[];
  sourceSyntax?: SyntaxNode;
  displayStyle: 'line' | 'paragraph' | 'tree';
}

const lineDisplayStyle = {
  display: 'inline-block',
  whiteSpace: 'nowrap',
  height: '2rem',
};
const paragraphDisplayStyle = {
  display: 'inline-block',
};

//const findNextNode = (
//currentNode: SyntaxNode,
//syntaxNodes: SyntaxNode[],
//siblings?: SyntaxNode[]
//): SyntaxNode | null => {
//const hasChildren = currentNode.children && currentNode.children.length > 0;

//const currentIndex = siblings?.findIndex((node) => {
//return (
//node.type === currentNode.type &&
//node.start === currentNode.start &&
//node.end === currentNode.end
//);
//});

//let youngerSibling = undefined;
//if (
//siblings &&
//currentIndex &&
//siblings.length &&
//siblings.length <= currentIndex + 1
//) {
//youngerSibling = siblings[currentIndex + 1];
//}

//if (hasChildren) {
//return currentNode.children[0];
//}

//if (youngerSibling) {
//return youngerSibling;
//}

//return null;
//};

//const recurseSourceSyntax = (
//sourceSyntax: SyntaxNode[],
//textSegments: TextSegment[],
//renderedNodes: ReactElement[],
//currentNode?: SyntaxNode,
//currentSiblings?: SyntaxNode[]
//): ReactElement[] => {
//console.log('RECURSE');
//console.log('sourceSyntax', sourceSyntax);
//console.log('textSegments', textSegments);
//console.log('renderedNodes', renderedNodes);
//console.log('currentNode', currentNode);
//console.log('currentSiblings', currentSiblings);

//let siblings = currentSiblings ?? sourceSyntax;
//let node = currentNode ?? sourceSyntax[0];
//if (!node.children || node.children.length === 0) {
//const { start, end } = node;
//console.log('start/end', start, end + 1);
//const textSegmentsCopy = textSegments.slice();
//const segmentsToRender = textSegmentsCopy.splice(start, end + 1);
//console.log('next segments to render', segmentsToRender);
//renderedNodes.push(
//<div>
//{segmentsToRender.map((textSegment: TextSegment) => {
//return (
//<TextSegmentWrapper
//key={`source-${textSegment.position}`}
//textSegment={textSegment}
//displayStyle={'paragraph'}
///>
//);
//})}
//</div>
//);
//}

//const hasChildren = node.children && node.children.length > 0;

//const currentIndex = siblings?.findIndex((aNode) => {
//return (
//aNode.type === node.type &&
//aNode.start === node.start &&
//aNode.end === node.end
//);
//});

//console.log('currentIndex', currentIndex);
//console.log('siblings length', siblings.length);
//console.log('siblings bound', currentIndex + 1 <= siblings.length);
//let nextNode = undefined;
//let nextSiblings = siblings;

//if (
//siblings &&
//(currentIndex !== undefined || currentIndex != null) &&
//siblings.length &&
//currentIndex + 1 <= siblings.length
//) {
//console.log('next sibling canddiate', siblings[currentIndex + 1]);
//nextNode = siblings[currentIndex + 1];
//}

//if (hasChildren) {
//console.log('hasChildren');
//nextNode = node.children[0];
//nextSiblings = node.children;
//}

//console.log('nextNode', nextNode);

//if (nextNode) {
//return recurseSourceSyntax(
//sourceSyntax,
//textSegments,
//renderedNodes,
//nextNode,
//nextSiblings
//);
//}
//console.log('FINISH RECURSE');
//return renderedNodes;
//};

const recurseSyntax = (
  syntaxNode: SyntaxNode,
  depth: number,
  textSegments: TextSegment[],
  type: 'source' | 'reference' | 'target',
  referenceLinks: Link[],
  referenceText: TextSegment[],
  userLinks: Link[],
  targetText: TextSegment[]
): ReactElement => {
  const isLeaf = !syntaxNode.children || !syntaxNode.children.length;
  let textSegmentSelection: any[] = [];
  if (isLeaf) {
    textSegmentSelection = textSegments.slice(
      syntaxNode.start,
      syntaxNode.end + 1
    );
    if (type === 'reference') {
      const referencePositions = textSegmentSelection
        .map((sourceSegment: TextSegment) => {
          const matchingReferenceLinks = referenceLinks.filter((link: Link) => {
            return link.sources.includes(sourceSegment.position);
          });
          return matchingReferenceLinks.map((referenceLink: Link) => {
            return referenceLink.targets;
          });
        })
        .flat()
        .flat()
        .flat()
        .flat()
        .flat()
        .filter((segment) => Boolean(segment));
      const referenceSegments = referencePositions
        .map((referencePosition) => {
          return referenceText.find((referenceSegment: TextSegment) => {
            return referenceSegment.position === referencePosition;
          });
        })
        .filter((thing) => !!thing);
      textSegmentSelection = referenceSegments;
    }

    if (type === 'target') {
      const targetPositions = textSegmentSelection
        .map((sourceSegment: TextSegment) => {
          const matchingReferenceLinks = referenceLinks.filter((link: Link) => {
            return link.sources.includes(sourceSegment.position);
          });
          console.log('matching REF LINKS', matchingReferenceLinks);

          const matchingUserLinks = matchingReferenceLinks.map(
            (referenceLink: Link) => {
              return userLinks.find((userLink: Link) => {
                return Boolean(
                  userLink.sources.find((userLinkSourcePosition: number) => {
                    return referenceLink.targets.includes(
                      userLinkSourcePosition
                    );
                  })
                );
              });
            }
          );
          //.filter((link) => Boolean(link));

          console.log('matching USER LINKS', matchingUserLinks);
          //    ??

          //const matchingUserLinks = userLinks.filter((link: Link) => {
          //return link.sources.includes(sourceSegment.position);
          //});
          return matchingUserLinks.map((userLink: Link | undefined) => {
            return userLink?.targets;
          });
        })
        .flat()
        .flat()
        .flat()
        .flat()
        .flat()
        .filter((segment) => Boolean(segment));
      const targetSegments = targetPositions
        .map((targetPosition) => {
          return targetText.find((targetSegment: TextSegment) => {
            return targetSegment.position === targetPosition;
          });
        })
        .filter((thing) => !!thing);
      textSegmentSelection = targetSegments;
    }
  }

  return (
    <div className={`source-container syntax depth-${depth}`} style={{}}>
      <span>{syntaxNode.type}</span>
      <div style={{ display: 'inline' }}>
        {textSegmentSelection.map((textSegment) => {
          return (
            <TextSegmentWrapper
              key={`source-${textSegment.position}`}
              textSegment={textSegment}
              displayStyle={'paragraph'}
            />
          );
        })}
      </div>
      {syntaxNode.children &&
        syntaxNode.children.length &&
        syntaxNode.children.map((child) => {
          return recurseSyntax(
            child,
            depth + 1,
            textSegments,
            type,
            referenceLinks,
            referenceText,
            userLinks,
            targetText
          );
        })}
    </div>
  );
};

export const TextPortion = (props: TextPortionProps): ReactElement => {
  const { type, textSegments, displayStyle, sourceSyntax } = props;

  const { state } = useContext(AlignmentContext);

  const direction =
    props.type === 'source'
      ? state.sourceTextDirection
      : state.targetTextDirection;

  const configuredStyle =
    displayStyle === 'line' ? lineDisplayStyle : paragraphDisplayStyle;

  if (displayStyle === 'tree') {
    return (
      <div
        className="text-portion-container"
        style={{
          display: 'flex',
          alignContent: 'center',
          maxHeight: '15rem',
          padding: '0.5rem',
          marginBottom: '0.5rem',
          marginRight: '0.5rem',
        }}
      >
        {sourceSyntax &&
          recurseSyntax(
            sourceSyntax,
            0,
            textSegments,
            type,
            state.referenceLinks ?? [],
            state.referenceSegments,
            state.userLinks,
            state.targetSegments
          )}
      </div>
    );
  }

  return (
    <div
      className="text-portion-container"
      style={{
        display: 'flex',
        alignContent: 'center',
        maxHeight: '15rem',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        marginRight: '0.5rem',
      }}
    >
      <div
        className={`${type}-container`}
        style={{ ...configuredStyle, paddingRight: '5rem', direction }}
      >
        {textSegments?.map((textSegment: TextSegment): ReactElement => {
          return (
            <TextSegmentWrapper
              key={`${type}-${textSegment.position}`}
              textSegment={textSegment}
              displayStyle={displayStyle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TextPortion;
