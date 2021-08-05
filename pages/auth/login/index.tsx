import { useRouter } from 'next/router';
import { Login } from '../../../containers';

const LoginForm = (): JSX.Element => {
  const router = useRouter();
  const {
    // callback,
    username,
  } = router.query;
  return (
    <p>
      <Login username={username as string} />
    </p>
  );
};

export default LoginForm;
