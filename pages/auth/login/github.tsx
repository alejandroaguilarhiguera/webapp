import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
// import { AuthService } from '../../../services/API';

export interface Prop {
  code: string;
}

const GithubForm = (): JSX.Element => {
  const router = useRouter();
  const {
    code,
  }: Prop = router.query;
  console.log('🚀 ~ file: github.tsx ~ line 15 ~ code', code);
  // if (session?.token) {
  //   redirect /dashboard
  // }
  return (
    <div />
  );
};

export default GithubForm;
