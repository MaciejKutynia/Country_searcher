import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router';
import { CountryDetails, Param } from '../utils/interfaces';

import { getCountries } from '../utils/fetchData';

const DetalisScreen = () => {
  const history = useHistory();
  let { code }: Param = useParams();

  const [country, setCountry] = useState<CountryDetails>();

  useEffect(() => {
    fetchCountry();
    async function fetchCountry() {
      const allCountries = await getCountries();
      const country = allCountries.find(
        (item: CountryDetails) => item.name === code
      );
      setCountry(country);
    }
  }, [code]);

  return (
    <>
      <button id='back-button' onClick={() => history.push('/')}>
        Back
      </button>
      {country && (
        <div className='detail-container'>
          <img className='flag' src={country.flag} alt='' />
          <div className='details'>
            <span id='name'>{country.name}</span>
            <span>
              Native name: <strong>{country.nativeName}</strong>
            </span>
            <span>
              Capital: <strong>{country.capital}</strong>
            </span>
            <span>
              Population: <strong>{country.population.toLocaleString()}</strong>
            </span>
            {country.currencies &&
              country.currencies.map((currency) => (
                <div className='currencies'>
                  <span>
                    Currency name: <strong>{currency.name}</strong>
                  </span>
                  <span>
                    Currency symbol: <strong>{currency.symbol}</strong>
                  </span>
                  <span>
                    Currency code: <strong>{currency.code}</strong>
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DetalisScreen;
