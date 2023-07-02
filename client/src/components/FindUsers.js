import {
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useGlobal } from 'hooks';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { MdRefresh } from 'react-icons/md';
import { getRandomUsers } from '../api/users';
import Loading from './Loading';
import UserEntry from './UserEntry';
import HorizontalStack from './util/HorizontalStack';

const FindUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const { translate } = useGlobal();

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 5 });
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };

  return (
    <Card>
      <Stack spacing={2}>
        <HorizontalStack justifyContent="space-between">
          <HorizontalStack>
            <AiOutlineUser />
            <Typography>{translate('findOrther')}</Typography>
          </HorizontalStack>
          <IconButton
            sx={{ padding: 0 }}
            disabled={loading}
            onClick={handleClick}
          >
            <MdRefresh />
          </IconButton>
        </HorizontalStack>

        <Divider />

        {loading ? (
          <Loading />
        ) : (
          users &&
          users.map((user) => (
            <UserEntry username={user.username} key={user.username} />
          ))
        )}
      </Stack>
    </Card>
  );
};

export default FindUsers;
