import { Stack } from '@mui/material';
import { FindUsers, TopPosts } from 'components';
import Footer from './Footer';

const Sidebar = () => {
  return (
    <Stack spacing={2}>
      <TopPosts />
      <FindUsers />
      <Footer />
    </Stack>
  );
};

export default Sidebar;
