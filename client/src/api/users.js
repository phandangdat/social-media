import { BASE_URL } from '../config';

const signup = async (user) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const login = async (user) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (params) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/' + params.id);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getRandomUsers = async (query) => {
  try {
    const res = await fetch(
      BASE_URL + 'api/users/random?' + new URLSearchParams(query),
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (user, data) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/' + user._id, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const followUser = async (user, id) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/follow/' + id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const unfollowUser = async (user, id) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/unfollow/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getFollowed = async (id, user) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/followed/' + id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getUserFollowing = async (id) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/following/' + id);

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getUserFollower = async (id) => {
  try {
    const res = await fetch(BASE_URL + 'api/users/followers/' + id);

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  signup,
  login,
  getUser,
  getRandomUsers,
  updateUser,
  followUser,
  unfollowUser,
  getFollowed,
  getUserFollowing,
  getUserFollower,
};
