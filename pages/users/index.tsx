import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserService } from '../../services/API';
import { User } from '../../types';

export function UserFunction(): JSX.Element {
  const [users, setUsers] = useState<User[]>([] as User[]);
  const userService = new UserService();

  useEffect(() => {
    function test() {
      userService.getAll().then((data) => {
        setUsers(data);
      });
    }
    test();
  });

  return (
    <div>

      <h1>Users</h1>
      <ul>
        {
          users.map((user) => (
            <li key={user.id}>
              <Link href={`/users/${user.id}`}>
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
