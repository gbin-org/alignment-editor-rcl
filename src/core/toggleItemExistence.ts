export const toggleItemExistence = (
  array: number[] = [],
  value: number
): number[] => {
  const itemIndex = array.indexOf(value);

  if (itemIndex === -1) {
    return array.concat(value);
  }

  return array.filter((item) => !(item === value));
};

export default toggleItemExistence;
