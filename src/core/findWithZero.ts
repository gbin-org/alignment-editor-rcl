/** findWithZero --
 *
 * In more than one place in this RCL, recursive calls to `.find`
 * are used on arrays of numbers. `0` is a falsy value in js/ts.
 *
 * This creates some confusing bugs where we find a thing,
 * the thing happens to be `0`, and therefore it appears that
 * we did not find anything.
 *
 * This function handles the "false falsyness" of `0` in these cases.
 * Use sparingly. Live long and prosper.
 *
 **/

const findWithZero = (
  array: any[] | undefined,
  predicate: (testCase: number) => boolean
): boolean => {
  const plainFindResult = array?.find(predicate);
  const resultIsZero = plainFindResult === 0 ? true : false;
  return plainFindResult || resultIsZero;
};

export default findWithZero;
