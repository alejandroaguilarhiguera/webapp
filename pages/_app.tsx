import { AppProps } from 'next/app';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import { AuthService } from '../services/API';
import { API_URL } from '../config';

toast.configure();
axios.defaults.baseURL = API_URL;

const authService = new AuthService();

axios.interceptors.request.use(async (configAxios) => {
  const session = await authService.getSession();
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

axios.interceptors.response.use((response) => {
  const { message } = response.data;
  const { status } = response;
  if (status === 200) toast.info(message);
  else if (status === 201) toast.success(message);
  else if ([401, 403].includes(status)) toast.error(message);
  else if ([422, 404, 409].includes(status)) toast.warning(message);
  else if (status >= 500) toast.error(message);
  else toast(message);
  return response;
}, (error) => {
  toast.error('Ocurrió un error en la petición');
  return Promise.reject(error);
});

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <main>
      <Navbar />
      <Component {...pageProps} />
    </main>
  );
}

export default App;
