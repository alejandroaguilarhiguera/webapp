import { AppProps } from 'next/app';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../config';

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(async (configAxios) => {
  const dataLocalStorage = await AsyncStorage.getItem('@session');
  const session = JSON.parse(dataLocalStorage || '{}');
  const { token } = session;
  if (!token) return configAxios;

  return {
    ...configAxios,
    headers: {
      ...configAxios.headers,
      Accept: 'application/json',
      Authorization: `bearer ${token}`,
    },
    validateStatus: (status: number) => status >= 200 && status <= 550,
  };
});

function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default App;
