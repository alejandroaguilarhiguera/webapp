import { useRouter } from 'next/router';

const Post = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <p>
      UserId:
      {' '}
      {id}
    </p>
  );
};

export default Post;
