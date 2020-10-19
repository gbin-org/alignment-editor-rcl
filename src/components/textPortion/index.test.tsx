import React from 'react';

import shallowRender from 'testHelpers/shallowRender';
import mountRender from 'testHelpers/mountRender';
import TextPortion from 'components/textPortion';
import { Link } from 'core/structs';

describe('TextPortion', (): void => {
  it('can render a simple example', () => {
    const wrapper = shallowRender(
      <TextPortion
        type="source"
        direction={'ltr'}
        textSegments={[
          { text: 'a', type: 'source', position: 1 },
          {
            text: 'source',
            type: 'source',
            position: 2,
          },
          {
            text: 'text',
            type: 'source',
            position: 3,
          },
        ]}
        selectTextSegmentFunc={(type, position) => {}}
        deSelectTextSegmentFunc={(type, position) => {}}
        refGatherer={() => {}}
        links={[]}
        focusedLinks={new Map<Link, boolean>()}
        segmentHovered={() => {}}
        toggleDirection={() => {}}
      />
    );
    const sourceContainer = wrapper.find('div.source-container');
    const textSegments = wrapper.find('span.text-segment');
  });

  it('renders a set of source segments', () => {
    const wrapper = mountRender(
      <TextPortion
        type="source"
        direction={'ltr'}
        textSegments={[
          { text: 'a', type: 'source', position: 1 },
          {
            text: 'source',
            type: 'source',
            position: 2,
          },
          {
            text: 'text',
            type: 'source',
            position: 3,
          },
        ]}
        selectTextSegmentFunc={(type, position) => {}}
        deSelectTextSegmentFunc={(type, position) => {}}
        refGatherer={() => {}}
        links={[]}
        focusedLinks={new Map<Link, boolean>()}
        segmentHovered={() => {}}
        toggleDirection={() => {}}
      />
    );
    const textSegments = wrapper.find('span.text-segment');
    expect(textSegments.length).toEqual(3);
    const renderedText = textSegments
      .map((segment) => segment.text())
      .join(' ');
    expect(renderedText).toEqual('a source text');
  });

  it('renders appropriate text direction (ltr)', () => {
    const wrapper = mountRender(
      <TextPortion
        type="source"
        direction={'ltr'}
        textSegments={[
          { text: 'a', type: 'source', position: 1 },
          {
            text: 'source',
            type: 'source',
            position: 2,
          },
          {
            text: 'text',
            type: 'source',
            position: 3,
          },
        ]}
        selectTextSegmentFunc={(type, position) => {}}
        deSelectTextSegmentFunc={(type, position) => {}}
        refGatherer={() => {}}
        links={[]}
        focusedLinks={new Map<Link, boolean>()}
        segmentHovered={() => {}}
        toggleDirection={() => {}}
      />
    );
    const sourceContainer = wrapper.find('div.source-container');
    const styles = sourceContainer.render()[0].attribs.style;
    expect(styles.includes('direction: ltr;')).toEqual(true);
  });

  it('renders appropriate text direction (rtl)', () => {
    const wrapper = mountRender(
      <TextPortion
        type="source"
        direction={'rtl'}
        textSegments={[
          { text: 'a', type: 'source', position: 1 },
          {
            text: 'source',
            type: 'source',
            position: 2,
          },
          {
            text: 'text',
            type: 'source',
            position: 3,
          },
        ]}
        selectTextSegmentFunc={(type, position) => {}}
        deSelectTextSegmentFunc={(type, position) => {}}
        refGatherer={() => {}}
        links={[]}
        focusedLinks={new Map<Link, boolean>()}
        segmentHovered={() => {}}
        toggleDirection={() => {}}
      />
    );
    const sourceContainer = wrapper.find('div.source-container');
    const styles = sourceContainer.render()[0].attribs.style;
    expect(styles.includes('direction: rtl;')).toEqual(true);
  });
});
