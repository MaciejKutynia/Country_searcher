interface SetItem {
  start: number;
  finish: number;
}

export const setItem = (page: number, limiter: number): SetItem => {
  let start: number =
    page > 1
      ? page > 2
        ? (page - 1) * limiter + 2
        : (page - 1) * limiter + 1
      : (page - 1) * limiter;
  let finish: number = page > 1 ? limiter * page + 1 : limiter * page;
  return {
    start,
    finish,
  };
};
