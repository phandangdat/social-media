import { Container } from '@mui/material';
import { Goback, PostEditor } from 'components';
import GridLayout from 'layout/GridLayout';
import Navbar from 'layout/Navbar';
import Sidebar from 'layout/Sidebar';

const CreatePostView = () => {
  return (
    <Container>
      <Navbar />
      <Goback />
      <GridLayout left={<PostEditor />} right={<Sidebar />} />
    </Container>
  );
};

export default CreatePostView;
