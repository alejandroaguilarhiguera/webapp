import { AppProps } from 'next/app';
import axios from 'axios';
import { API_URL } from '../config';

axios.defaults.baseURL = API_URL;

function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default App;
