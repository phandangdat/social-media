import { Typography } from '@mui/material';
import { useGlobal } from 'hooks';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import HorizontalStack from './util/HorizontalStack';

const ContentDetails = ({ username, createdAt, edited, preview }) => {
  const { translate } = useGlobal();
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
            {edited && <>{translate('edited')}</>}
          </>
        )}
      </Typography>
    </HorizontalStack>
  );
};

export default ContentDetails;
