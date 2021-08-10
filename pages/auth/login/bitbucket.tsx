import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
// import { AuthService } from '../../../services/API';

export interface Prop {
  access_token: string;
}

const BitbucketForm = (): JSX.Element => {
  const router = useRouter();
  const {
    access_token,
  }: Prop = router.query;
  // if (session?.token) {
  //   redirect /dashboard
  // }
  return (
    <div />
  );
};

export default BitbucketForm;
