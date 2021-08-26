import React, { useState, useEffect } from 'react';

import {
  getRegions,
  getCountries,
  searchCountries,
  getPageArray,
  setPaginationIndexes,
} from '../utils/fetchData';

import { Country, Param } from '../utils/interfaces';

import { useHistory, useParams } from 'react-router';

const MainScreen = () => {
  const history = useHistory();

  const { id }: Param = useParams();

  const limitations: number[] = [25, 50, 60];
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [itemsForPage, setItemsForPage] = useState<Country[]>([]);
  const [pages, setPages] = useState<number[]>([]);
  const [limiter, setLimiter] = useState<number>(limitations[0]);
  const [regions, setRegions] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [lastQuery, setLastQuery] = useState<string>('');

  useEffect(() => {
    isNaN(parseInt(id)) ? setPage(1) : setPage(parseInt(id));
    parseInt(id) === 1 && history.push('/');
  }, [id, history]);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      const countries = await getCountries();
      const regions = await getRegions();
      setCountries(countries);
      setSelectedCountries(countries);
      setRegions(regions);
    }
  }, []);

  useEffect(() => {
    const pageArray = getPageArray(selectedCountries.length, limiter);
    setPages(pageArray);
  }, [page, limiter, selectedCountries]);

  useEffect(() => {
    const index = setPaginationIndexes(page, limiter);
    let start: number = index.start;
    let finish: number = index.finish;
    setItemsForPage(countries.slice(start, finish));
  }, [page, limiter, countries]);

  const getLimiterHandler = (e: any) => {
    setPage(1);
    setLimiter(parseInt(e.currentTarget.innerText));
    history.push('/');
  };

  const changePageHandler = (e: any) => {
    setPage(parseInt(e.currentTarget.innerText));
    history.push(`/p=${e.currentTarget.innerText}`);
  };

  const showDetalisHandler = (name: string) => {
    history.push(`/detail/${name}`);
  };

  const selectValueHandler = (e: any) => {
    setPage(1);
    const index = setPaginationIndexes(page, limiter);
    let start: number = index.start;
    let finish: number = index.finish;
    history.push('/');
    if (e.currentTarget.value === 'All') {
      setSelectedCountries(countries);
      setItemsForPage(countries.slice(start, finish));
      return;
    }
    setSelectedCountries(
      countries.filter((country) => country.region === e.currentTarget.value)
    );
    setItemsForPage(
      countries
        .filter((country) => country.region === e.currentTarget.value)
        .slice(start, finish)
    );
  };

  const searchCountriesHandler = async () => {
    const searchedCountries = await searchCountries(query);
    setLastQuery(query);
    setSelectedCountries(searchedCountries);
    setItemsForPage(searchedCountries);
    setCountries(searchedCountries);
    setQuery('');
  };

  const getAllCountries = async () => {
    const select: any = document.querySelector('select');
    select.value = 'All';
    setPage(1);
    setLastQuery('');
    const allCountries = await getCountries();
    setSelectedCountries(allCountries);
    setItemsForPage(allCountries);
    setCountries(allCountries);
    history.push('/');
  };

  return (
    <div>
      <div className='search'>
        <button id='reset' onClick={getAllCountries} title='Reset'>
          Reset
        </button>
        <input
          type='text'
          className='search-input'
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onKeyUp={(e) => e.key === 'Enter' && searchCountriesHandler()}
        />
        <button id='search' title='Search' onClick={searchCountriesHandler}>
          Search
        </button>
      </div>
      <div className='search-results'>
        {lastQuery !== '' ? (
          <span>
            Search results for: <b>{lastQuery}</b>
          </span>
        ) : (
          ''
        )}
      </div>
      <div className='select'>
        <select onChange={selectValueHandler}>
          {regions.map((region, index) => (
            <option value={region} key={index}>
              {region === '' ? 'Unknown' : region}
            </option>
          ))}
        </select>
      </div>
      <div className='content'>
        {countries.length && (
          <>
            <strong>Countries: {selectedCountries.length}</strong>
            <div>
              {itemsForPage.map((item, index) => (
                <p
                  key={index}
                  onClick={showDetalisHandler.bind(this, item.name)}>
                  {item.name}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
      <div className='toolbar'>
        <div className='limiter'>
          {limitations.length &&
            limitations.map((limitItems) => (
              <button
                key={limitItems}
                onClick={getLimiterHandler}
                className={
                  limitItems === limiter
                    ? 'limiter__item selected'
                    : 'limiter__item'
                }>
                {limitItems}
              </button>
            ))}
        </div>
        <div className='pages'>
          {countries.length &&
            pages.map((item) => (
              <span
                onClick={changePageHandler}
                key={item}
                className={page === item ? 'page selected' : 'page'}>
                {item}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
