import React from 'react';

import shallowRender from 'testHelpers/shallowRender';
import LinksContainer from 'components/linksContainer';

describe('LinksContainer', (): void => {
  it('renders the alignment canvas', (): void => {
    const wrapper = shallowRender(
      <LinksContainer
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
        targetSegments={[
          { text: 'quick', type: 'target', position: 0 },
          { text: 'to', type: 'target', position: 1 },
          { text: 'listen', type: 'target', position: 2 },
        ]}
        selectTextSegmentFunc={(type, position) => {}}
        deSelectTextSegmentFunc={(type, position) => {}}
        links={[
          { sources: [0], targets: [0], type: 'manual' },
          { sources: [3], targets: [1, 2], type: 'manual' },
        ]}
        sourceDirection={'ltr'}
        targetDirection={'rtl'}
      />
    );

    const alignmentCanvas = wrapper.find('div#alignment-canvas');
    expect(alignmentCanvas).toBeTruthy();
  });
});
