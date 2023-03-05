import {
  Container
} from '@mui/material';
import React from 'react';
import GridLayout from '../GridLayout';
import Navbar from '../Navbar';
import PostBrowser from '../PostBrowser';
import Sidebar from '../Sidebar';

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
