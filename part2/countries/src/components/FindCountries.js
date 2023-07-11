const FindCountries = ({ value, handleOnChange }) => {
  return (
    <form>
      <div>
        Find countries: <input value={value} onChange={handleOnChange} />
      </div>
    </form>
  );
};

export default FindCountries;
