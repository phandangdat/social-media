import { Container, Stack } from '@mui/material';
import { getPost } from 'api/posts';
import { Comments, ErrorAlert, Loading, PostCard } from 'components';
import GoBack from 'components/GoBack';
import { isLoggedIn } from 'helpers/authHelper';
import GridLayout from 'layout/GridLayout';
import Navbar from 'layout/Navbar';
import Sidebar from 'layout/Sidebar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostView = () => {
  const params = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const user = isLoggedIn();

  const fetchPost = async () => {
    setLoading(true);
    const data = await getPost(params.id, user && user.token);
    if (data.error) {
      setError(data.error);
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  return (
    <Container>
      <Navbar />
      <GoBack />
      <GridLayout
        left={
          loading ? (
            <Loading />
          ) : post ? (
            <Stack spacing={2}>
              <PostCard post={post} key={post._id} />

              <Comments />
            </Stack>
          ) : (
            error && <ErrorAlert error={error} />
          )
        }
        right={<Sidebar />}
      />
    </Container>
  );
};

export default PostView;
