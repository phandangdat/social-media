import { Container, Stack } from '@mui/material';
import { PostBrowser } from 'components';
import GridLayout from 'layout/GridLayout';
import Navbar from 'layout/Navbar';
import Sidebar from 'layout/Sidebar';

const SearchView = () => {
  return (
    <Container>
      <Navbar />
      <GridLayout
        left={
          <Stack spacing={2}>
            <PostBrowser createPost contentType="posts" />
          </Stack>
        }
        right={<Sidebar />}
      />
    </Container>
  );
};

export default SearchView;
