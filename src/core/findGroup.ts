import { Link } from 'core/structs';

const NUMBER_OF_GROUPS = 3;

const isGroup = (link: Link): boolean => {
  return link.sources.length > 1 || link.targets.length > 1;
};

export const calculateGroups = (links: Link[]): number[] => {
  let counter = 0;
  return links.map((link: Link): number => {
    if (isGroup(link)) {
      const group = (counter += 1);
      if (counter === NUMBER_OF_GROUPS) {
        counter = 0;
      }
      return group;
    }
    return 0;
  });
};

export const determineGroup = (links: Link[], index: number): number => {
  const groups = calculateGroups(links);
  return groups[index];
};
