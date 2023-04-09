import { Container } from '@mui/material';
import { PostBrowser } from 'components';
import GridLayout from 'layout/GridLayout';
import Navbar from 'layout/Navbar';
import Sidebar from 'layout/Sidebar';

const ExploreView = () => {
  return (
    <Container>
      <Navbar />
      <GridLayout
        left={<PostBrowser createPost contentType="posts" />}
        right={<Sidebar />}
      />
    </Container>
  );
};

export default ExploreView;
