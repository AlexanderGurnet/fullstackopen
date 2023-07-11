import axios from 'axios';

const config = {
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
  },
};

const baseUrl = 'https://weatherapi-com.p.rapidapi.com/current.json';

const getWheatherByLatLon = (lat, lon) => {
  const response = axios.get(`${baseUrl}?q=${lat},${lon}`, config);
  return response.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getWheatherByLatLon,
};
