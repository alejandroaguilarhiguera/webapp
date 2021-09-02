import useSWR from 'swr';
import { AppProps } from 'next/app';
import axios from 'axios';
import '../styles/globals.css';
import { toast } from 'react-toastify';
import FooterModal from '../components/Footer';

import 'react-toastify/dist/ReactToastify.css';
import { Menu, TextBox, Navbar } from '../components';

import { AuthService } from '../services/API';
import { API_URL, NODE_ENV, SESSION_LOCAL_STORAGE } from '../config';

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
  const { data: session } = useSWR(
    SESSION_LOCAL_STORAGE,
    () => authService.getSession().then((data) => data),
  );
  return (

    <main>
      { NODE_ENV === 'development' && (
        <TextBox
          type="warning"
          label="Entorno de pruebas"
          description={JSON.stringify(session)}
        />
      )}
      <Navbar _id={session?.user?._id} displayName={session?.user?.role /* TODO: displayName */} />
      <div className="flex h-screen">
        <Menu user={session?.user} />
        <Component {...pageProps} />
      </div>
      <FooterModal />
    </main>
  );
}

export default App;
