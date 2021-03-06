import axios from 'axios';
import { Config } from 'react-native-config';

const request = axios.create({
  timeout: 20000,
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default request;
