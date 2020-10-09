import React, { ReactElement } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import {
  AlignmentProps,
  AlignmentState,
  DefaultAlignmentProps,
} from './types/alignment';
import {
  selectSourceTextSegmentAction,
  selectTargetTextSegmentAction,
  deSelectSourceTextSegmentAction,
  deSelectTargetTextSegmentAction,
  selectLinkAction,
} from './actions/alignment';
import { AppState } from './reducers';

export class LinkLinesComp extends React.Component<
  AlignmentProps,
  AlignmentState
> {
  private colorMap: Record<string, string> = {
    default: '#d5d9e0',
    selected: 'black',
    blue: 'PowderBlue',
    green: 'LightSeaGreen',
    orange: 'orange',
  };

  private svgRefs: any;

  public static defaultProps: AlignmentProps = DefaultAlignmentProps;

  constructor(props: AlignmentProps) {
    super(props);

    this.svgRefs = React.createRef();
  }

  private getColor(ref: any): string {
    const matchedValues = Object.values(ref.current.classList).filter(
      (className) => {
        if (Object.keys(this.colorMap).includes(String(className))) {
          return className !== 'default';
        }
        return false;
      }
    );
    if (matchedValues.includes('selected')) {
      return this.colorMap.selected;
    }
    return this.colorMap[String(matchedValues[0])] || this.colorMap.default;
  }

  private selectLink(link: any): void {
    const {
      selectSourceTextSegmentFunc,
      selectTargetTextSegmentFunc,
      selectLinkFunc,
    } = this.props;
    link.sources.forEach((source: number) => {
      selectSourceTextSegmentFunc(source);
    });
    link.targets.forEach((target: number) => {
      selectTargetTextSegmentFunc(target);
    });
    selectLinkFunc();
  }

  private otherLinkSelected(color: string): boolean {
    const { linkSelected } = this.props;
    return linkSelected && color !== this.colorMap.selected;
  }

  public links(): ReactElement[] {
    const { links, refDict, reRenderLinks } = this.props;
    const linkElements: ReactElement[] = [];
    links.forEach((link: any) => {
      const sourceName = `source-${link.sources[0]}`;
      const targetName = `target-${link.targets[0]}`;
      const sourceRef = refDict.get(sourceName);
      const targetRef = refDict.get(targetName);
      if (sourceRef && sourceRef.current && targetRef && targetRef.current) {
        const color = this.getColor(sourceRef);
        const disabled = this.otherLinkSelected(color) ? 'disabled' : '';
        const x1 = sourceRef.current.offsetLeft - 12;
        const y1 = sourceRef.current.offsetTop;
        const x2 = targetRef.current.offsetLeft - 12;
        const y2 = targetRef.current.offsetTop;
        linkElements.push(
          <line
            className={`link-line ${color} ${disabled}`}
            key={`${sourceName}-links-${targetName}-${reRenderLinks}}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeWidth="4"
            stroke={color}
            onClick={(): void => {
              if (!this.otherLinkSelected(color)) {
                this.selectLink(link);
              }
            }}
          />
        );
      }
    });

    return linkElements;
  }

  public render(): ReactElement {
    const { reverseAlignmentDisplay, reRenderLinks } = this.props;
    const reverseClass = reverseAlignmentDisplay ? 'reverse' : '';
    const linkElements = this.links();
    return (
      <svg
        ref={this.svgRefs}
        key={`svg-link-canvas-${reRenderLinks}-${linkElements.length}`}
        className={`links-canvas ${reverseClass}`}
      >
        {linkElements}
      </svg>
    );
  }
}

//export const mapStateToProps = (state: AppState): any => {
//return {
//linkSelected: state.alignment.linkSelected,
//alignmentData: state.alignment.alignmentData,
//source: state.alignment.source,
//target: state.alignment.target,
//reverseAlignmentDisplay: state.alignment.reverseAlignmentDisplay,
//reRenderLinks: state.alignment.reRenderLinks,
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
//selectLinkFunc: (): void => {
//dispatch(selectLinkAction());
//},
//});

//const LinkLines = connect(mapStateToProps, mapDispatchToProps)(LinkLinesComp);

export default LinkLinesComp;
