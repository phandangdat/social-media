import { Container, Stack } from '@mui/material';
import {
  followUser,
  getFollowed,
  getUser,
  unfollowUser,
  updateUser,
} from 'api/users';
import {
  CommentBrowser,
  ErrorAlert,
  FindUsers,
  FollowerBrowser,
  Loading,
  MobileProfile,
  PostBrowser,
  Profile,
  ProfileTabs,
} from 'components';
import { isLoggedIn } from 'helpers/authHelper';
import Footer from 'layout/Footer';
import GridLayout from 'layout/GridLayout';
import Navbar from 'layout/Navbar';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState('posts');
  const user = isLoggedIn();
  const [error, setError] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  const [follow, setFlollow] = useState(false);

  const fetchUser = useCallback(async () => {
    const data = await getUser(params);
    if (data.error) {
      setError(data.error);
    } else {
      setProfile(data);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;

    await updateUser(user, { biography: content });

    setProfile({
      ...profile,
      user: { ...profile.user, biography: content },
    });
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleMessage = () => {
    navigate('/messenger', { state: { user: profile.user } });
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser, params]);

  const validate = (content) => {
    let error = '';

    if (content.length > 250) {
      error = 'Bio cannot be longer than 250 characters';
    }

    return error;
  };

  let tabs;
  if (profile) {
    tabs = {
      posts: (
        <PostBrowser
          profileUser={profile.user}
          contentType="posts"
          key="posts"
          userId={profile?.user?._id}
        />
      ),
      liked: (
        <PostBrowser
          profileUser={profile.user}
          contentType="liked"
          key="liked"
          userId={profile?.user?._id}
        />
      ),
      comments: <CommentBrowser profileUser={profile.user} />,
      following: (
        <FollowerBrowser
          userId={profile?.user?._id}
          contentType="following"
        />
      ),
      followers: (
        <FollowerBrowser
          userId={profile?.user?._id}
          contentType="follower"
        />
      ),
    };
  }

  const handleFollow = async () => {
    if (!follow) {
      const res = await followUser(user, profile.user._id);
      if (res.data) {
        setFlollow(true);
      }
    } else {
      const res = await unfollowUser(user, profile.user._id);
      if (res.data) {
        setFlollow(false);
      }
    }
  };

  const getUserFollowed = useCallback(async () => {
    const data = await getFollowed(profile?.user?._id, user);
    if (data.error) {
      console.log(data.error);
    } else {
      setFlollow(data.followed);
    }
  }, [profile?.user?._id, user]);

  useEffect(() => {
    if (profile?.user) {
      getUserFollowed();
    }
  }, [getUserFollowed, profile?.user]);

  return (
    <Container maxWidth="lg">
      <Navbar />

      <GridLayout
        left={
          <>
            <MobileProfile
              profile={profile}
              editing={editing}
              handleSubmit={handleSubmit}
              handleEditing={handleEditing}
              handleMessage={handleMessage}
              validate={validate}
              follow={follow}
              handleFollow={handleFollow}
            />
            <Stack spacing={2}>
              {profile ? (
                <>
                  <ProfileTabs tab={tab} setTab={setTab} />

                  {tabs[tab]}
                </>
              ) : (
                <Loading />
              )}
              {error && <ErrorAlert error={error} />}
            </Stack>
          </>
        }
        right={
          <Stack spacing={2}>
            <Profile
              profile={profile}
              editing={editing}
              handleSubmit={handleSubmit}
              handleEditing={handleEditing}
              handleMessage={handleMessage}
              validate={validate}
              follow={follow}
              handleFollow={handleFollow}
            />

            <FindUsers />
            <Footer />
          </Stack>
        }
      />
    </Container>
  );
};

export default ProfileView;
