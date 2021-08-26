import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import useSWR from 'swr';
import { UserService } from '../../services/API';

const userService = new UserService();

export function UserFunction(): JSX.Element {
  const { data: users = [] } = useSWR(
    '/users',
    () => userService.getAll().then((data) => data),
  );

  return (

    <div className="bg-gray-100 w-1/2 rounded px-6">
      <div className="border-l-4 border-red-400 -ml-6 pl-6 flex items-center justify-between my-4">
        <div className="font-semibold text-gray-800">Usuarios</div>
        <div className="text-red-400">See all</div>
      </div>
      <hr className="-mx-6" />

      {
        users.map((user) => (
          <div>
            <div className="flex items-center justify-between my-4">
              <div className="w-16">
                <img className="w-12 h-12 rounded-full" src={user.avatar} />
                {/*
                FIXME: HAcer que funcione esto
                <Image
                  className="w-12 h-12 rounded-full"
                  src={user.avatar || ''}
                  loader={({ src }) => src}
                  alt="avatar"
                /> */}
              </div>
              <div className="flex-1 pl-2">
                <div className="text-gray-700 font-semibold">
                  <Link href={`/users/${user._id}`}>
                    {user.email}
                  </Link>
                </div>
                <div className="text-gray-600 font-thin">
                  {user.displayName}
                </div>
              </div>
              <div className="text-red-400">20 Posts</div>
            </div>
            <hr className="boder-b-0 my-4" />

          </div>
        ))
      }

      {/* <div className="flex items-center my-4">
        <div className="w-16">
          <img className="w-12 h-12 rounded-full" src="https://source.unsplash.com/50x50/?water" />
        </div>
        <div className="flex-1 pl-2">
          <div className="text-gray-700 font-semibold">
            Designer
          </div>
          <div className="text-gray-600 font-thin">
            Web House
          </div>
        </div>
        <div className="text-red-400">300 Posts</div>
      </div>
      <hr className="boder-b-0 my-4" /> */}
      {/* <div className="flex items-center my-4">
        <div className="w-16">
          <img className="w-12 h-12 rounded-full" src="https://source.unsplash.com/50x50/?logo" />
        </div>
        <div className="flex-1 pl-2">
          <div className="text-gray-700 font-semibold">
            Data Entry
          </div>
          <div className="text-gray-600 font-thin">
            Web House
          </div>
        </div>
        <div className="text-red-400">30 Posts</div>
      </div> */}
    </div>

  );
}

export default UserFunction;
