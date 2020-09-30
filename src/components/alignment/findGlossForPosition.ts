import { Gloss } from './structs';

const EMPTY_GLOSS_CHAR = '-';

const findGlossForPosition = (glosses: Gloss[], textId: string, positionId: string): string => {
  const potentialMorphId = `${textId}${positionId}`;
  const morphId = potentialMorphId.padEnd(12, '1');
  return glosses?.find((item) => item.textId === morphId)?.gloss || EMPTY_GLOSS_CHAR;
};

export default findGlossForPosition;
