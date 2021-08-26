export interface Country {
  name: string;
  region: string;
  flag: string;
}

export interface Param {
  code: string;
  id: string;
}

export interface Currencies {
  code: string;
  name: string;
  symbol: string;
}

export interface CountryDetails {
  name: string;
  region: string;
  nativeName: string;
  capital: string;
  flag: string;
  population: number;
  currencies: Currencies[];
}

export interface PaginationIndexes {
  start: number;
  finish: number;
}
