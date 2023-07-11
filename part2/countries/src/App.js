import { useState, useEffect } from 'react';

import FindCountries from './components/FindCountries';
import Countries from './components/Countries';

import countriesService from './services/countries';

const App = () => {
  const [searchingCountry, setSearchingCountry] = useState('');
  const [countries, setCountries] = useState(null);

  let filteredCountries =
    searchingCountry === ''
      ? countries
      : countries?.filter((country) => country.name.common.toLowerCase().includes(searchingCountry.toLowerCase()));

  useEffect(() => {
    countriesService.getAll().then((allCountries) => setCountries(allCountries));
  }, []);

  const handleOnCountryChange = (event) => {
    setSearchingCountry(event.target.value);
  };

  return (
    <>
      <FindCountries value={searchingCountry} handleOnChange={handleOnCountryChange} />
      <Countries countries={filteredCountries} searchingCountry={searchingCountry} />
    </>
  );
};

export default App;
