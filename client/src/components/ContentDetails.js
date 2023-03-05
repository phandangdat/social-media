import { Typography } from '@mui/material';
import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import HorizontalStack from './util/HorizontalStack';

const ContentDetails = ({ username, createdAt, edited, preview }) => {
  return (
    <HorizontalStack sx={{}}>
      <UserAvatar width={30} height={30} username={username} />
      <Typography
        variant="subtitle2"
        color="text.secondary"
        gutterBottom
      >
        <Link
          color="inherit"
          underline="hover"
          onClick={(e) => {
            e.stopPropagation();
          }}
          to={'/users/' + username}
        >
          {username}
        </Link>
        {!preview && (
          <>
            {' '}
            · <Moment fromNow>{createdAt}</Moment>{' '}
            {edited && <>(Edited)</>}
          </>
        )}
      </Typography>
    </HorizontalStack>
  );
};

export default ContentDetails;
