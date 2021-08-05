import { useRouter } from 'next/router';

const Post = (): JSX.Element => {
  const router = useRouter();
  const { id, name } = router.query;

  return (
    <p>
      UserId:
      {' '}
      {id}
      {' '}
      {name}

    </p>
  );
};

export default Post;
