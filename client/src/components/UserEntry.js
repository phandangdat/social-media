import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import HorizontalStack from './util/HorizontalStack';

const UserEntry = ({ username }) => {
  return (
    <HorizontalStack justifyContent="space-between" key={username}>
      <HorizontalStack>
        <UserAvatar width={30} height={30} username={username} />
        <Typography>{username}</Typography>
      </HorizontalStack>
      <Link to={'/users/' + username}>View</Link>
    </HorizontalStack>
  );
};

export default UserEntry;
