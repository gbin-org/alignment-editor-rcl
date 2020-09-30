import React, { ReactElement } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';
import { AlignmentProps, AlignmentState, DefaultAlignmentProps } from './types/alignment';
import LinkLines from './linkLines';
import TextSegment from '../textSegment';
import { AppState } from './reducers';
import { reverseAlignmentDisplayAction, reRenderLinksAction } from './actions/alignment';
import findGlossForPosition from './findGlossForPosition';
import { VerseIdParser } from './verseIdParser';
import { computeVerseLinkedWords } from './functions';

/* eslint react/prefer-stateless-function: "off" */
export class LinksContainerComp extends React.Component<AlignmentProps, AlignmentState> {
  private refDict: Map<string, any>;

  public static defaultProps: AlignmentProps = DefaultAlignmentProps;

  public constructor(props: AlignmentProps) {
    super(props);
    this.refDict = new Map();
  }

  public componentDidMount(): void {
    window.addEventListener('resize', this.reRender.bind(this));
  }

  componentDidUpdate(): void {
    this.reRenderLines();
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.reRender.bind(this));
  }

  private reRender(): void {
    const { reverseAlignmentDisplayFunc } = this.props;
    reverseAlignmentDisplayFunc();
    reverseAlignmentDisplayFunc();
  }

  protected reRenderLines(): void {
    const { reRenderLinksFunc } = this.props;
    if (reRenderLinksFunc) {
      reRenderLinksFunc();
    }
  }

  private hasGroup(link: any): boolean {
    return link.sources.length > 1 || link.targets.length > 1;
  }

  private groupSegments(sourceSegments: any[], targetSegments: any[], links: any[]): any {
    const groupedSourceSegments = sourceSegments.map((segment) => {
      const { glosses, verseCode } = this.props;
      const gloss = findGlossForPosition(glosses, verseCode, segment.positionId);
      return {
        text: segment.segment,
        group: 0,
        color: 0,
        catIsContent: segment.catIsContent,
        strongsX: segment.strongsX,
        english: gloss,
        lemma: segment.lemma,
      };
    });
    const groupedTargetSegments = targetSegments.map((segment) => {
      return { text: segment, group: 0, color: 0 };
    });
    let group = 1;
    let color = 1;
    if (links && links.length) {
      links.forEach((link) => {
        if (this.hasGroup(link)) {
          link.sources.forEach((sourceSegmentIndex: number) => {
            groupedSourceSegments[sourceSegmentIndex].group = group;
            groupedSourceSegments[sourceSegmentIndex].color = color;
          });
          link.targets.forEach((targetSegmentIndex: number) => {
            groupedTargetSegments[targetSegmentIndex].group = group;
            groupedTargetSegments[targetSegmentIndex].color = color;
          });
          color = color > 2 ? 1 : (color += 1);
          group += 1;
        }
      });
    }
    return { groupedSourceSegments, groupedTargetSegments };
  }

  public displaySegments(
    groupedSourceSegments: any,
    groupedTargetSegments: any,
    isSource: boolean,
    linksAlt: any,
  ): ReactElement[] {
    const { reverseAlignmentDisplay } = this.props;
    let returnedSegments = isSource ? groupedSourceSegments : groupedTargetSegments;
    let returnedType = isSource ? 'source' : 'target';
    if (reverseAlignmentDisplay) {
      returnedSegments = !isSource ? groupedSourceSegments : groupedTargetSegments;
      returnedType = !isSource ? 'source' : 'target';
    }
    return this.textMapper(returnedSegments, returnedType, linksAlt);
  }

  public content(): ReactElement[] {
    const {
      sourceText,
      targetText,
      links,
      reverseAlignmentDisplay,
      isRTL,
      isNTrtlAlignSource,
      isOTrtlAlignSource,
      isNTltrAlignSource,
      isOTltrAlignSource,
      isNTrtlAlignTarget,
      isOTrtlAlignTarget,
      isNTltrAlignTarget,
      isOTltrAlignTarget,
      verseCode,
    } = this.props;

    let sourceTextAlt = _.cloneDeep(sourceText);
    let targetTextAlt = _.cloneDeep(targetText);
    const linksAlt = _.cloneDeep(links);
    const sourceTextLen = sourceTextAlt.length;
    const targetTextLen = targetTextAlt.length;

    // are we in OT or NT?
    const verseIdParser = new VerseIdParser();
    const testament = verseIdParser.isNT(verseCode) ? 'nt' : 'ot';

    let reverseTextSource = false;
    let reverseTextTarget = false;

    if (isRTL) {
      reverseTextSource = true;
      reverseTextTarget = true;
      if (testament === 'ot') {
        if (isOTrtlAlignSource) {
          reverseTextSource = false;
        }
        if (isOTrtlAlignTarget) {
          reverseTextTarget = false;
        }
      } else {
        if (isNTrtlAlignSource) {
          reverseTextSource = false;
        }
        if (isNTrtlAlignTarget) {
          reverseTextTarget = false;
        }
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (testament === 'ot') {
        if (isOTltrAlignSource) {
          reverseTextSource = true;
        }
        if (isOTltrAlignTarget) {
          reverseTextTarget = true;
        }
      } else {
        if (isNTltrAlignSource) {
          reverseTextSource = true;
        }
        if (isNTltrAlignTarget) {
          reverseTextTarget = true;
        }
      }
    }

    if (reverseTextSource) {
      sourceTextAlt = _.reverse(sourceTextAlt);

      // reverse the Source links
      for (let i = 0; i < linksAlt.length; i += 1) {
        const sourceArray = new Array<number>();
        // eslint-disable-next-line no-loop-func
        linksAlt[i].sources.forEach((item: number) => {
          sourceArray.push(sourceTextLen - item - 1);
        });
        linksAlt[i].sources = sourceArray;
      }
    }

    if (reverseTextTarget) {
      targetTextAlt = _.reverse(targetTextAlt);

      // reverse the Target links
      for (let i = 0; i < linksAlt.length; i += 1) {
        const targetArray = new Array<number>();
        // eslint-disable-next-line no-loop-func
        linksAlt[i].targets.forEach((item: number) => {
          targetArray.push(targetTextLen - item - 1);
        });
        linksAlt[i].targets = targetArray;
      }
    }

    const stack = new Array<ReactElement>();
    const { groupedSourceSegments, groupedTargetSegments } = this.groupSegments(
      sourceTextAlt,
      targetTextAlt,
      linksAlt,
    );
    const linked = linksAlt && linksAlt.length;
    const linkedClass = linked ? 'linked' : 'unlinked';
    const reversedClass = reverseAlignmentDisplay ? 'reverse' : '';
    if (linked) {
      stack.push(<LinkLines key="link-lines" links={linksAlt} refDict={this.refDict} />);
    }

    stack.push(
      <div
        key="target-text-container"
        className={`target-container ${linkedClass} ${reversedClass}`}
      >
        {this.displaySegments(groupedSourceSegments, groupedTargetSegments, false, linksAlt)}
      </div>,
    );

    if (!linked) {
      stack.push(
        <div key="no-links-container" className="no-links-exist">
          <span className="text-segment default">No Links Exist</span>
        </div>,
      );
    }

    stack.push(
      <div key="source-text-container" className={`source-container ${reversedClass}`}>
        {this.displaySegments(groupedSourceSegments, groupedTargetSegments, true, linksAlt)}
      </div>,
    );

    return stack;
  }

  public textMapper(segments: any[], type: string, linksAlt: any): ReactElement[] {
    const { links, targetText } = this.props;
    let linkedWords: Record<number, string> = {};
    if (links && targetText) {
      linkedWords = computeVerseLinkedWords(links, targetText);
    }

    return segments.map((segment: any, index: number) => {
      const refName = `${type}-${index}`;
      const ref = React.createRef<HTMLSpanElement>();
      const isLinkable = type === 'target' || segment.catIsContent;
      this.refDict.set(refName, ref);
      const linkedTargetWords = linkedWords[index];

      return (
        <TextSegment
          theRef={ref}
          key={`text-segment-${refName}`}
          segmentData={segment}
          isSelected={false}
          isDisabled={false}
          isLinked={false}
          selectTextSegmentFunc={(type: 'source'|'target', position: number) => {}}
          deSelectTextSegmentFunc={(type: 'source'|'target', position: number) => {}}
        />
      );
    });
  }

  public render(): ReactElement {
    return (
      <div key="links-container" className="links-container">
        {this.content()}
      </div>
    );
  }
}

//export const mapStateToProps = (state: AppState): any => {
  //return {
    //source: state.alignment.source,
    //target: state.alignment.target,
    //reverseAlignmentDisplay: state.alignment.reverseAlignmentDisplay,
    //glosses: state.gloss.glosses,
    //isRTL: state.project.isRTL,
    //isNTrtlAlignSource: state.profile.isNTrtlAlignSource,
    //isOTrtlAlignSource: state.profile.isOTrtlAlignSource,
    //isNTltrAlignSource: state.profile.isNTltrAlignSource,
    //isOTltrAlignSource: state.profile.isOTltrAlignSource,
    //isNTrtlAlignTarget: state.profile.isNTrtlAlignTarget,
    //isOTrtlAlignTarget: state.profile.isOTrtlAlignTarget,
    //isNTltrAlignTarget: state.profile.isNTltrAlignTarget,
    //isOTltrAlignTarget: state.profile.isOTltrAlignTarget,
  //};
//};

//export const mapDispatchToProps = (dispatch: Dispatch): any => ({
  //reverseAlignmentDisplayFunc: (): void => {
    //dispatch(reverseAlignmentDisplayAction());
  //},

  //reRenderLinksFunc: (): void => {
    //dispatch(reRenderLinksAction());
  //},
//});
//const LinksContainer = connect(mapStateToProps, mapDispatchToProps)(LinksContainerComp);

export default LinksContainerComp;
