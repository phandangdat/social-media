import {
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useGlobal } from 'hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';
import { isLoggedIn } from '../helpers/authHelper';
import ErrorAlert from './ErrorAlert';
import UserAvatar from './UserAvatar';
import HorizontalStack from './util/HorizontalStack';

const PostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { translate } = useGlobal();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const errors = validate();
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = await createPost(formData, isLoggedIn());
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate('/posts/' + data._id);
    }
  };

  const validate = () => {
    const errors = {};

    return errors;
  };

  return (
    <Card>
      <Stack spacing={1}>
        {user && (
          <HorizontalStack spacing={2}>
            <UserAvatar
              width={50}
              height={50}
              username={user.username}
            />
            <Typography variant="h5">
              {translate('whatWouldYouLikeToPostToday') + ' '}
              {user.username}?
            </Typography>
          </HorizontalStack>
        )}

        <Typography>
          <Link href="https://commonmark.org/help/" target="_blank">
            Markdown Help
          </Link>
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={translate('title')}
            required
            name="title"
            margin="normal"
            onChange={handleChange}
            error={errors.title !== undefined}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label={translate('content')}
            multiline
            rows={10}
            name="content"
            margin="normal"
            onChange={handleChange}
            error={errors.content !== undefined}
            helperText={errors.content}
            required
          />
          <ErrorAlert error={serverError} />
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
            }}
          >
            {loading ? (
              <>{translate('submittingPost')}</>
            ) : (
              <>{translate('submitPost')}</>
            )}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostEditor;
