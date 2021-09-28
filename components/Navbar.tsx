import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AuthService } from '../services/API';
import iconMenu from '../public/icon_menu.png';

const authService = new AuthService();

export const Navbar = (): JSX.Element => {
  const { NEXT_PUBLIC_APP_NAME } = process.env;
  const [name, setName] = useState<string>('');
  useEffect(() => {
    authService.getSession().then((session) => setName(session.user.displayName));
  }, []);
  return (
    <div className="bg-white flex p-6 shadow-sm">
      <label id="lblMenu" htmlFor="btnMenu">
        <Image src={iconMenu} />
      </label>

      <h6 className="flex-grow text-2xl font-bold">
        {NEXT_PUBLIC_APP_NAME}
      </h6>
      <p>{name}</p>
    </div>
  );
};

export default Navbar;
