import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FooterModal from '../../../components/Footer';
import { InputPhoneCode } from '../../../components';
import { AuthService } from '../../../services/API';
import { INTENTS_CODE_PHONE } from '../../../config';

const authService = new AuthService();
const sizeCodePhone = 6;

export interface Prop {
  verificationId?: string;
}

const ConfirmPhoneForm = (): JSX.Element => {
  const router = useRouter();
  const {
    verificationId,
  }: Prop = router.query;
  const [intents, setIntents] = useState(Number(INTENTS_CODE_PHONE));
  const [phoneCode, setPhoneCode] = useState('');

  useEffect(() => {
    if (phoneCode.length >= sizeCodePhone) {
      authService.confirmPhone(verificationId, phoneCode).then((session) => {
        if (session.token) {
          router.push('/dashboard');
        } else {
          setIntents(intents - 1);
          setPhoneCode('');
        }
      });
    }
    if (!intents) {
      router.push('/auth/login');
    }
  }, [verificationId, phoneCode, intents, router]);
  async function handleSubmit(event) {
    event.preventDefault();
  }

  return (

    <div className="container">
      <form onSubmit={handleSubmit}>
        <InputPhoneCode size={sizeCodePhone} value={phoneCode} onChange={setPhoneCode} />

      </form>
      <FooterModal />
    </div>
  );
};

export default ConfirmPhoneForm;
