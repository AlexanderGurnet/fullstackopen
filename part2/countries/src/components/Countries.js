import CountryView from './CountryView';
import CountryItem from './CountryItem';

const Countries = ({ countries, searchingCountry }) => {
  if (!countries) {
    return 'Loading...';
  }

  if (searchingCountry === '' && countries) {
    return 'Start typing country name...';
  }

  if (countries.length >= 10 && searchingCountry !== '') {
    return 'Too many matches, specify another filter';
  }

  return (
    <div>
      {countries.map((country) => {
        if (countries.length === 1) {
          return <CountryView key={country.name.common} country={country} />;
        }
        return <CountryItem key={country.name.common} country={country} />;
      })}
    </div>
  );
};

export default Countries;
