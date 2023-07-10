import { useState, useEffect } from 'react';

import countriesService from './services/countries';

const FindCountries = ({ value, handleOnChange }) => {
  return (
    <form>
      <div>
        Find countries: <input value={value} onChange={handleOnChange} />
      </div>
    </form>
  );
};

const App = () => {
  const [SearchingCountry, setSearchingCountry] = useState('');
  const [countries, setCountries] = useState([]);

  let filteredCountries =
    SearchingCountry === ''
      ? countries
      : countries.filter((country) => country.name.common.toLowerCase().includes(SearchingCountry.toLowerCase()));

  useEffect(() => {
    countriesService.getAll().then((allCountries) => setCountries(allCountries));
  }, []);

  const handleOnCountryChange = (event) => {
    setSearchingCountry(event.target.value);
  };

  return (
    <>
      <FindCountries value={SearchingCountry} handleOnChange={handleOnCountryChange} />
      <div>
        {filteredCountries.map((country) => (
          <div>{country.name.common}</div>
        ))}
      </div>
    </>
  );
};

export default App;
