import { useState } from 'react';

import CountryView from './CountryView';

const CountryItem = ({ country }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div>
      {country.name.common} <button onClick={() => setIsShown(!isShown)}>{isShown ? 'Hide' : 'Show'}</button>
      {isShown && <CountryView country={country} />}
    </div>
  );
};

export default CountryItem;
