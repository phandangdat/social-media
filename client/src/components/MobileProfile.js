import { useTheme } from '@emotion/react';
import {
  Button,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useGlobal } from 'hooks';
import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import { isLoggedIn } from '../helpers/authHelper';
import ContentUpdateEditor from './ContentUpdateEditor';
import UserAvatar from './UserAvatar';
import HorizontalStack from './util/HorizontalStack';

const MobileProfile = (props) => {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;
  const { translate } = useGlobal();

  useEffect(() => {
    if (props.profile) {
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <Card sx={{ display: { sm: 'block', md: 'none' }, mb: 2 }}>
      {user ? (
        <Stack spacing={2}>
          <HorizontalStack spacing={2} justifyContent="space-between">
            <HorizontalStack>
              <UserAvatar
                width={50}
                height={50}
                username={user.username}
              />
              <Typography variant="h6" textOverflow="ellipses">
                {user.username}
              </Typography>
            </HorizontalStack>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <HorizontalStack spacing={3}>
                <Stack alignItems="center">
                  <Typography>Likes</Typography>
                  <Typography color="text.secondary">
                    <b>{props.profile.posts.likeCount}</b>
                  </Typography>
                </Stack>
                <Stack alignItems="center">
                  <Typography color="text.secondary">
                    {translate('posts')}
                  </Typography>
                  <Typography color="text.secondary">
                    <b>{props.profile.posts.count}</b>
                  </Typography>
                </Stack>
              </HorizontalStack>
            </Box>
          </HorizontalStack>
          <Divider />
          <Box>
            {currentUser && user._id === currentUser.userId && (
              <IconButton
                onClick={props.handleEditing}
                sx={{ mr: 1 }}
              >
                {props.editing ? (
                  <MdCancel color={iconColor} />
                ) : (
                  <AiFillEdit color={iconColor} />
                )}
              </IconButton>
            )}
            {user.biography ? (
              <>
                <Typography textAlign="center" variant="p">
                  <b>Bio: </b>
                  {user.biography}
                </Typography>
              </>
            ) : (
              <Typography variant="p">
                <i>
                  {translate('noBioYet')}{' '}
                  {currentUser && user._id === currentUser.userId && (
                    <span>
                      - {translate('tapOnTheEditIconToAddYourBio')}
                    </span>
                  )}
                </i>
              </Typography>
            )}
            <HorizontalStack sx={{ mt: 2 }}>
              {currentUser && user._id !== currentUser.userId && (
                <Button
                  variant="outlined"
                  onClick={props.handleMessage}
                >
                  Message
                </Button>
              )}
              {currentUser && user._id !== currentUser.userId && (
                <Button
                  variant="outlined"
                  onClick={props.handleFollow}
                >
                  {props.follow
                    ? translate('unfollow')
                    : translate('follow')}
                </Button>
              )}
            </HorizontalStack>

            {props.editing && (
              <Box>
                <ContentUpdateEditor
                  handleSubmit={props.handleSubmit}
                  originalContent={user.biography}
                  validate={props.validate}
                />
              </Box>
            )}
          </Box>
        </Stack>
      ) : (
        <>Loading...</>
      )}
    </Card>
  );
};

export default MobileProfile;
