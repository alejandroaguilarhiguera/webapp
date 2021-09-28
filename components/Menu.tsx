import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { AuthService } from '../services/API';
import iconUser from '../public/icon_users.png';
import iconHome from '../public/icon_home.png';
import iconExit from '../public/icon_exit.png';

const authService = new AuthService();
export const Menu = (): JSX.Element => {
  async function onLogout() {
    await authService.logout();
  }

  const { data: session = {} } = useSWR(
    'session',
    () => authService.getSession().then((data) => data),
  );

  if (!session) return <div />;
  return (
    <>
      <input
        id="btnMenu"
        type="checkbox"
      />

      <div id="menu" className="p-6 border-r w-64 border-gray-200">
        <h6 className="font-bold mb-4">Acciones rápidas</h6>
        <ul>
          <li className="flex mb-8">
            <Link href="/dashboard">
              <a className="flex items-start">
                <div className="bg-white shadow-sm p-2 mr-3 rounded-lg">
                  <Image src={iconHome} />
                </div>
                <span className="self-center">Inicio</span>
              </a>
            </Link>
          </li>
          <li className="flex mb-8">
            <Link href="/users">
              <a className="flex items-start">
                <div className="bg-white shadow-sm p-2 mr-3 rounded-lg">
                  <Image src={iconUser} />
                </div>
                <span className="self-center">Usuarios</span>
              </a>
            </Link>
          </li>

          <li className="flex mb-8">
            <Link href="/auth/login">
              <a className="flex items-start" onClick={onLogout()}>
                <div className="bg-white shadow-sm p-2 mr-3 rounded-lg">
                  <Image src={iconExit} />
                </div>
                <span className="self-center">Salir</span>
              </a>
            </Link>
          </li>

        </ul>
      </div>
    </>

  );
};

export default Menu;
