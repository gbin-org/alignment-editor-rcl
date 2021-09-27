import _ from 'lodash';
import { Link, SimplifiedLink } from 'core/structs/link';

const simplifier = (link: Link): SimplifiedLink => {
  return { sources: link.sources.sort(), targets: link.targets.sort() };
};

export const checkAnswer = (answer: Link[], currentState: Link[]): boolean => {
  console.log('checking answer...');
  const comparableState = _.sortBy(currentState.map(simplifier), [
    'sources',
    'targets',
  ]);
  const comparableAnswer = _.sortBy(answer.map(simplifier), [
    'sources',
    'targets',
  ]);

  return _.isEqual(comparableState, comparableAnswer);
};

export default checkAnswer;
