import React, { useState, useEffect } from 'react';
import { UserService } from '../../services/API';
import { User } from '../../types';

export function UserFunction(): JSX.Element {
  const [users, setUsers] = useState<User[]>([] as User[]);
  const userService = new UserService();

  useEffect(() => {
    userService.getAll().then((data) => {
      setUsers(data);
    });
  });

  return (
    <div>

      <h1>Users</h1>
      <ul>
        {
          users.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))
        }

      </ul>
    </div>
  );
}

export default UserFunction;
