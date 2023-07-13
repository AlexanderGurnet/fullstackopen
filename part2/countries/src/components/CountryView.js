import WeatherWidget from './WeatherWidget';

const CountryView = ({ country }) => {
  return (
    <section>
      <h2>{country.name.common}</h2>
      <div>Capital {country.capital ? country.capital[0] : 'none'}</div>
      <div>Area {country.area}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img width={200} src={country.flags.png} alt={country.flags.alt} />
      <WeatherWidget latlon={country.capitalInfo.latlng} />
    </section>
  );
};

export default CountryView;
