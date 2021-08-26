import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { UserService } from '../../services/API';

const userService = new UserService();

const UserForm = (): JSX.Element => {
  const router = useRouter();
  const { _id } = router.query;

  const { data: user, error } = useSWR(
    _id,
    (id) => userService.show(id).then((payload) => payload),
  );

  if (error) {
    return (
      <div>
        <p>
          Ocurrió un error
          {error}
        </p>
      </div>
    );
  }

  return (

    <p>
      {user?.email}
    </p>
  );
};

export default UserForm;
