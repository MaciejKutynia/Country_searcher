import { PaginationIndexes } from './interfaces';

export const getCountries = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const data = await res.json();
  return data;
};

export const searchCountries = async (name: string) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
  const data = res.json();
  return data;
};

export const getRegions = async () => {
  let regions: string[] = [];
  const data = await getCountries();
  for (const country in data) {
    if (!regions.includes(data[country].region)) {
      regions.push(data[country].region);
    }
  }
  regions.unshift('All');
  return regions;
};

export const getPageArray = (length: number, limiter: number): number[] => {
  let pageArray: number[] = [];
  let divided = length / limiter;
  for (let i = 1; i <= divided + 1; i++) {
    pageArray.push(i);
  }
  return pageArray;
};

export const setPaginationIndexes = (
  page: number,
  limiter: number
): PaginationIndexes => {
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
