import { Link } from 'core/structs';

import { determineGroup } from 'core/findGroup';

describe('findGroup', (): void => {
  describe('determineGroup', (): void => {
    it('handles single many:many relationship', (): void => {
      const links: Link[] = [
        { id: 0, sources: [0, 1], targets: [0, 1], type: 'manual' },
      ];
      const result = determineGroup(links, 0);
      expect(result).toEqual(1);
    });

    it('handles two neighbor many:many relationship', (): void => {
      const links: Link[] = [
        { id: 0, sources: [0, 1], targets: [0, 1], type: 'manual' },
        { id: 1, sources: [2, 3], targets: [2, 3], type: 'manual' },
      ];

      const result0 = determineGroup(links, 0);
      expect(result0).toEqual(1);

      const result1 = determineGroup(links, 1);
      expect(result1).toEqual(2);
    });

    it('handles two distant many:many relationship', (): void => {
      const links: Link[] = [
        { id: 0, sources: [0, 1], targets: [0, 1], type: 'manual' },
        { id: 1, sources: [2], targets: [2], type: 'manual' },
        { id: 2, sources: [3, 4], targets: [3, 4], type: 'manual' },
      ];

      const result0 = determineGroup(links, 0);
      expect(result0).toEqual(1);

      const result1 = determineGroup(links, 1);
      expect(result1).toEqual(0);

      const result2 = determineGroup(links, 2);
      expect(result2).toEqual(2);
    });
  });
});
