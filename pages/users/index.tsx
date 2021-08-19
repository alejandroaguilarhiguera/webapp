import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function UserFunction(): JSX.Element {
  const { data: users = [] } = useSWR('/users', fetcher);
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
