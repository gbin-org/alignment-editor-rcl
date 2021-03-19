import React from 'react';

import shallowRender from '../../../test/testHelpers/shallowRender';
import mountRender from '../../../test/testHelpers/mountRender';

import ParagraphView from 'components/paragraphView';
import { AlignmentContext, initialState } from 'contexts/alignment';

describe('ParagraphView', (): void => {
  it('renders the alignment canvas', (): void => {
    const wrapper = shallowRender(
      <ParagraphView
        sourceSegments={[
          { text: 'ταχὺς', type: 'source', position: 0 },
          {
            text: 'εἰς',
            type: 'source',
            position: 1,
            catIsContent: false,
          },
          {
            text: 'τὸ',
            group: 0,
            type: 'source',
            position: 2,
            catIsContent: false,
          },
          { text: 'ἀκοῦσαι', type: 'source', position: 3 },
        ]}
        referenceSegments={[]}
        targetSegments={[
          { text: 'quick', type: 'target', position: 0 },
          { text: 'to', type: 'target', position: 1 },
          { text: 'listen', type: 'target', position: 2 },
        ]}
        sourceDirection={'ltr'}
        targetDirection={'rtl'}
      />
    );

    const alignmentCanvas = wrapper.find('div#alignment-canvas');
    expect(alignmentCanvas).toBeTruthy();
  });
  it('renders linked segments', (): void => {
    const wrapper = mountRender(
      <AlignmentContext.Provider
        value={{
          state: {
            ...initialState,
            parentRef: document.createElement('div'),
            sourceRefs: { 0: document.createElement('div') },
            targetRefs: { 0: document.createElement('div') },
            userLinks: [{ id: 0, sources: [0], targets: [0], type: 'manual' }],
          },
          dispatch: jest.fn(),
        }}
      >
        <ParagraphView
          sourceSegments={[{ text: 'ταχὺς', type: 'source', position: 0 }]}
          referenceSegments={[]}
          targetSegments={[{ text: 'quick', type: 'target', position: 0 }]}
          sourceDirection={'ltr'}
          targetDirection={'ltr'}
        />
      </AlignmentContext.Provider>
    );

    const segments = wrapper.find('.text-segment.linked');
    expect(segments.length).toEqual(2);

    const sourceSegment = segments.first();
    expect(sourceSegment.text()).toEqual('ταχὺς');

    const targetSegment = segments.last();
    expect(targetSegment.text()).toEqual('quick');
  });
});
