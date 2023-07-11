import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => {
  const response = axios.get(`${baseUrl}/all`);
  return response.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
};
