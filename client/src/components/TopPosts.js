import { Stack, Typography } from '@mui/material';
import { useGlobal } from 'hooks';
import { useEffect, useState } from 'react';
import 'react-icons/md';
import { MdLeaderboard } from 'react-icons/md';
import { getPosts } from '../api/posts';
import { isLoggedIn } from '../helpers/authHelper';
import Loading from './Loading';
import PostCard from './PostCard';
import HorizontalStack from './util/HorizontalStack';

const TopPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const user = isLoggedIn();
  const { translate } = useGlobal();

  const fetchPosts = async () => {
    const query = { sortBy: '-likeCount' };

    const data = await getPosts(user && user.token, query);

    const topPosts = [];

    if (data && data.data) {
      for (let i = 0; i < 3 && i < data.data.length; i++) {
        topPosts.push(data.data[i]);
      }
    }

    setPosts(topPosts);

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack spacing={2}>
      <HorizontalStack>
        <MdLeaderboard />
        <Typography>{translate('topPosts')}</Typography>
      </HorizontalStack>
      {!loading ? (
        posts &&
        posts.map((post) => (
          <PostCard preview="secondary" post={post} key={post._id} />
        ))
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default TopPosts;
