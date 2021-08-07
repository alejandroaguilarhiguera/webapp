/* eslint-disable no-underscore-dangle */
import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';
// import { UserService } from '../../services/API';
// import { User } from '../../types';

// const userService = new UserService();
const fetcher = (url) => axios.get(url).then((res) => res.data);

export function UserFunction(): JSX.Element {
  const { data: users = [], error } = useSWR('/users', fetcher);

  if (error) {
    return (
      <h1>
        Error
        {' '}
        {error}
      </h1>
    );
  }
  return (
    <div>

      <h1>Users</h1>
      <ul>
        {
          users.map((user) => (
            <li key={user._id}>
              <Link href={`/users/${user._id}`}>
                {user.email}
              </Link>

            </li>
          ))
        }

      </ul>
    </div>
  );
}

export default UserFunction;
