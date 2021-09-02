import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuthService } from '../services/API';

const authService = new AuthService();

export interface Props {
  _id?: string;
  displayName?: string;
  avatar?: string;
}

export const Navbar = (props: Props): JSX.Element => {
  const { displayName, avatar } = props;
  const [showSettings, setShowSettings] = useState(false);
  // TODO: Tiene que funcionar
  async function onLogout() {
    await authService.logout();
  }
  return (
    <div className={`${displayName ? '' : 'hidden'} bg-white flex p-6 shadow-sm`}>
      <h6 className="flex-grow text-2xl font-bold">Resibor</h6>
      <div className="bg-white shadow-sm p-1 mr-3 rounded-lg">
        <Image src={avatar || '/profile-user.png'} alt="Vercel Logo" width={24} height={24} />
      </div>

      <span className="self-center">
        <button type="button" onClick={() => setShowSettings(!showSettings)}>

          {displayName}
        </button>
      </span>
      <div
        className={`${showSettings ? '' : 'hidden'} mt-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
      >
        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">
          Tu perfil
        </a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1">
          Settings
        </a>
        <Link href="/auth/login" passHref>
          <button
            type="button"
            onClick={onLogout}
          >

            <a
              className="block px-4 py-2 text-sm text-gray-700"
              id="user-menu-item-2"
            >
              Salir
            </a>
          </button>
        </Link>
      </div>

    </div>

  );
};

export default Navbar;
