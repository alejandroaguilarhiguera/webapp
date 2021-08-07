import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
// import { UserService } from '../../services/API';
// import { User } from '../../types';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const UserForm = (): JSX.Element => {
  const router = useRouter();
  const { _id } = router.query;

  const { data: user, error } = useSWR(`/users/${_id}`, fetcher);

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
