import { UserTextSegment, TextSegment, TextSegmentType } from 'core/structs';

export const projectUserSegments = (
  userSegments: UserTextSegment[],
  type: TextSegmentType
): TextSegment[] => {
  return userSegments?.map(
    (userSourceSegment: UserTextSegment, index: number): TextSegment => {
      return { ...userSourceSegment, type, position: index };
    }
  );
};

export default projectUserSegments;
