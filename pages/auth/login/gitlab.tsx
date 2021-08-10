import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
// import { AuthService } from '../../../services/API';

export interface Prop {
  code: string;
}
const fetcher = (url) => axios.get(url).then((res) => res.data);

const GitlabForm = (): JSX.Element => {
  const router = useRouter();
  const {
    code,
  }: Prop = router.query;
  if (code) {
    const { data: session = null } = useSWR(`/auth/login/gitlab?code=${code}`, fetcher);
    console.log('🚀 ~ file: gitlab.tsx ~ line 15 ~ code', code);
    console.log('🚀 ~ file: gitlab.tsx ~ line 15 ~ code', session);
  }
  // if (session?.token) {
  //   redirect /dashboard
  // }
  return (
    <div />
  );
};

export default GitlabForm;
