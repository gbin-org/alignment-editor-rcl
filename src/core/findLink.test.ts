import { Link } from 'core/structs';

import { findReferenceLinkForUserLink } from 'core/findLink';

describe('findLink', (): void => {
  describe('findReferenceLinkForUserLink', (): void => {
    it('works', (): void => {
      const referenceLinks: Link[] = [
        {
          sources: [3],
          targets: [4],
          type: 'manual',
          id: 0,
        },
        {
          sources: [4],
          targets: [7],
          type: 'manual',
          id: 1,
        },
      ];

      const userLink: Link = {
        sources: [4],
        targets: [8],
        type: 'manual',
        id: 1,
      };

      const result = findReferenceLinkForUserLink(referenceLinks, userLink);

      expect(result).toEqual({
        id: 0,
        sources: [3],
        targets: [4],
        type: 'manual',
      });
    });
  });
});
