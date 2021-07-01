import {
  UserTextSegment,
  TextSegment,
  TextSegmentType,
  Link,
} from 'core/structs';

export const projectUserSegments = (
  userSegments: UserTextSegment[],
  type: TextSegmentType
): TextSegment[] => {
  return userSegments?.map(
    (userSegment: UserTextSegment, index: number): TextSegment => {
      if (userSegment) {
        return { ...userSegment, type, position: index };
      }

      return { text: '', type, position: index };
    }
  );
};

export const projectLinks = (links: Link[]): Link[] => {
  const filteredLinks = links?.filter((link: Link) => {
    return Boolean(link);
  });
  return filteredLinks ?? [];
};

export default projectUserSegments;
