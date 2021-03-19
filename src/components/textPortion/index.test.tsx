import React from 'react';

import mountRender from '../../../test/testHelpers/mountRender';

import { AlignmentContext, initialState } from 'contexts/alignment';
import TextPortion from 'components/textPortion';

describe('TextPortion', (): void => {
  it('can render a simple example', () => {
    const wrapper = mountRender(
      <TextPortion
        type="source"
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
        displayStyle="line"
      />
    );
    const textSegments = wrapper.find('div.text-segment');
    expect(textSegments.length).toEqual(3);
  });

  it('renders a set of source segments', () => {
    const wrapper = mountRender(
      <TextPortion
        type="source"
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
        displayStyle="line"
      />
    );
    const textSegments = wrapper.find('div.text-segment');
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
        displayStyle="line"
      />
    );
    const sourceContainer = wrapper.find('div.source-container');
    // Forced to use any because of mismatch between cheerio api and types.
    const styles = (sourceContainer.render()[0] as any).attribs.style;
    expect(styles.includes('direction: ltr;')).toEqual(true);
  });

  it('renders appropriate text direction (rtl)', () => {
    const wrapper = mountRender(
      <AlignmentContext.Provider
        value={{
          state: { ...initialState, sourceTextDirection: 'rtl' },
          dispatch: jest.fn(),
        }}
      >
        <TextPortion
          type="source"
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
          displayStyle="line"
        />
      </AlignmentContext.Provider>
    );
    const sourceContainer = wrapper.find('div.source-container');
    // Forced to use any because of mismatch between cheerio api and types.
    const styles = (sourceContainer.render()[0] as any).attribs.style;
    expect(styles.includes('direction: rtl;')).toEqual(true);
  });
});
