const arrayHasIntersection = (
  firstArray: number[],
  secondArray: number[]
): boolean => {
  const filtered = firstArray.filter((item) => secondArray.includes(item));
  return Boolean(filtered.length);
};

export default arrayHasIntersection;
