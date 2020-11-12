const lastId = (ids: number[]): number => {
  if (!ids.length) {
    return -1;
  }
  return Math.max(...ids);
};

export const nextId = (ids: number[]): number => {
  const prev = lastId(ids);
  return prev + 1;
};

export default nextId;
