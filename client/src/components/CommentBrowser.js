import { Button, Card, Stack, Typography } from '@mui/material';
import { useGlobal } from 'hooks';
import { useEffect, useState } from 'react';
import { getUserComments } from '../api/posts';
import Comment from './Comment';
import Loading from './Loading';
import SortBySelect from './SortBySelect';

const CommentBrowser = (props) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [, setEnd] = useState(false);
  const [sortBy, setSortBy] = useState('-createdAt');
  const { translate } = useGlobal();

  const fetchComments = async () => {
    setLoading(true);

    const newPage = page + 1;
    setPage(newPage);

    let comments = await getUserComments({
      id: props.profileUser._id,
      query: { sortBy },
    });

    setComments(comments);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const handleSortBy = (e) => {
    const newSortName = e.target.value;
    let newSortBy;

    Object.keys(sorts).forEach((sortName) => {
      if (sorts[sortName] === newSortName) newSortBy = sortName;
    });

    setComments([]);
    setPage(0);
    setEnd(false);
    setSortBy(newSortBy);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const sorts = {
    '-createdAt': translate('latest'),
    createdAt: translate('earliest'),
  };

  return (
    <Stack spacing={2}>
      <Card>
        <SortBySelect
          onSortBy={handleSortBy}
          sortBy={sortBy}
          sorts={sorts}
        />
      </Card>
      {loading ? (
        <Loading />
      ) : (
        <>
          {comments &&
            comments.map((comment) => (
              <Comment key={comment._id} comment={comment} profile />
            ))}

          <Stack py={5} alignItems="center">
            <Typography
              variant="h5"
              color="text.secondary"
              gutterBottom
            >
              {comments.length > 0 ? (
                <>{translate('allCommentsHaveBeenViewed')}</>
              ) : (
                <>{translate('noCommentsAvailable')}</>
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
        </>
      )}
    </Stack>
  );
};

export default CommentBrowser;
