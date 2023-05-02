import { Button, Card, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useGlobal } from 'hooks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPosts, getUserLikedPosts } from '../api/posts';
import { isLoggedIn } from '../helpers/authHelper';
import CreatePost from './CreatePost';
import Loading from './Loading';
import PostCard from './PostCard';
import SortBySelect from './SortBySelect';
import HorizontalStack from './util/HorizontalStack';

const PostBrowser = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);
  const [sortBy, setSortBy] = useState('-createdAt');
  const [count, setCount] = useState(0);
  const user = isLoggedIn();
  const { translate } = useGlobal();
  const [search] = useSearchParams();
  const [effect, setEffect] = useState(false);

  const searchExists =
    search && search.get('search') && search.get('search').length > 0;

  const fetchPosts = async () => {
    setLoading(true);
    const newPage = page + 1;
    setPage(newPage);

    let query = {
      page: newPage,
      sortBy,
    };

    let data;

    if (props.contentType === 'posts') {
      if (props.profileUser)
        query.author = props.profileUser.username;
      if (searchExists) query.search = search.get('search');

      data = await getPosts(user && user.token, query);
    } else if (props.contentType === 'liked') {
      data = await getUserLikedPosts(
        props.profileUser._id,
        user && user.token,
        query,
      );
    }

    if (data.data.length < 10) {
      setEnd(true);
    }

    setLoading(false);
    if (!data.error) {
      setPosts([...posts, ...data.data]);
      setCount(data.count);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, effect]);

  useEffect(() => {
    setPosts([]);
    setPage(0);
    setEnd(false);
    setEffect(!effect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, props.userId]);

  const handleSortBy = (e) => {
    const newSortName = e.target.value;
    let newSortBy;

    Object.keys(sorts).forEach((sortName) => {
      if (sorts[sortName] === newSortName) newSortBy = sortName;
    });

    setPosts([]);
    setPage(0);
    setEnd(false);
    setSortBy(newSortBy);
  };

  const removePost = (removedPost) => {
    setPosts(posts.filter((post) => post._id !== removedPost._id));
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const contentTypeSorts = {
    posts: {
      '-createdAt': translate('latest'),
      '-likeCount': translate('likes'),
      '-commentCount': translate('comments'),
      createdAt: translate('earliest'),
    },
    liked: {
      '-createdAt': translate('latest'),
      createdAt: translate('earliest'),
    },
  };

  const sorts = contentTypeSorts[props.contentType];

  return (
    <>
      <Stack spacing={2}>
        <Card>
          <HorizontalStack justifyContent="space-between">
            {props.createPost && <CreatePost />}
            <SortBySelect
              onSortBy={handleSortBy}
              sortBy={sortBy}
              sorts={sorts}
            />
          </HorizontalStack>
        </Card>

        {searchExists && (
          <Box>
            <Typography variant="h5" gutterBottom>
              {translate('showingResultsFor')} "{search.get('search')}
              "
            </Typography>
            <Typography color="text.secondary" variant="span">
              {count} {translate('resultsFound')}
            </Typography>
          </Box>
        )}

        {posts.map((post, i) => (
          <PostCard
            preview="primary"
            key={post._id}
            post={post}
            removePost={removePost}
          />
        ))}

        {loading && <Loading />}
        {end ? (
          <Stack py={5} alignItems="center">
            <Typography
              variant="h5"
              color="text.secondary"
              gutterBottom
            >
              {posts.length > 0 ? (
                <>{translate('allPostsHaveBeenViewed')}</>
              ) : (
                <>{translate('noPostsAvailable')}</>
              )}
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={handleBackToTop}
            >
              {translate('backToTop')}
            </Button>
          </Stack>
        ) : (
          !loading &&
          posts &&
          posts.length > 0 && (
            <Stack pt={2} pb={6} alignItems="center" spacing={2}>
              <Button onClick={fetchPosts} variant="contained">
                Load more
              </Button>
              <Button
                variant="text"
                size="small"
                onClick={handleBackToTop}
              >
                {translate('backToTop')}
              </Button>
            </Stack>
          )
        )}
      </Stack>
    </>
  );
};

export default PostBrowser;
