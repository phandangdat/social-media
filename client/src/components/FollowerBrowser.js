import styled from '@emotion/styled';
import { Box, Card, Grid, Typography } from '@mui/material';
import { getUserFollower, getUserFollowing } from 'api/users';
import { useGlobal } from 'hooks';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import HorizontalStack from './util/HorizontalStack';

const Item = styled('div')(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

const FollowerBrowser = (props) => {
  const { darkTheme } = useGlobal();
  const [userFollow, setUserFlollow] = useState();

  const usersFollowing = async () => {
    const res = await getUserFollowing(props?.userId);
    if (res.error) {
      console.log(res.error);
    } else {
      setUserFlollow(res.data);
    }
  };

  const usersFollower = async () => {
    const res = await getUserFollower(props?.userId);
    if (res.error) {
      console.log(res.error);
    } else {
      setUserFlollow(res.data);
    }
  };

  useEffect(() => {
    if (props?.userId) {
      if (props.contentType === 'following') {
        usersFollowing();
      } else {
        usersFollower();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.contentType, props?.userId]);

  return (
    <Card spacing={2}>
      <Box sx={{ flexGrow: 1 }}>
        {userFollow?.length > 0 ? (
          <Grid container spacing={2}>
            {userFollow?.map((user) => (
              <Grid item xl={4} lg={4} md={6} xs={6} key={user._id}>
                <Link to={`/users/${user.username}`}>
                  <Item>
                    <HorizontalStack>
                      <UserAvatar
                        width={50}
                        height={50}
                        username={user.username}
                      />
                      <Typography
                        sx={{
                          color: darkTheme ? 'white' : 'black',
                        }}
                      >
                        {user.username}
                      </Typography>
                    </HorizontalStack>
                  </Item>
                </Link>
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>Bạn chưa theo dõi người dùng khác</p>
        )}
      </Box>
    </Card>
  );
};

export default FollowerBrowser;
