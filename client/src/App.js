import '@mui/material';
import { CssBaseline } from '@mui/material';
import { GlobalProvider } from 'context';
import 'react-icons';
import 'react-icons/bi';
import 'react-icons/bs';
import 'react-icons/md';
import 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { initiateSocketConnection } from './helpers/socketHelper';
import PrivateRoute from './layout/PrivateRoute';
import CreatePostView from './views/CreatePostView';
import ExploreView from './views/ExploreView';
import LoginView from './views/LoginView';
import MessengerView from './views/MessengerView';
import PostView from './views/PostView';
import ProfileView from './views/ProfileView';
import SearchView from './views/SearchView';
import SignupView from './views/SignupView';

function App() {
  initiateSocketConnection();

  return (
    <GlobalProvider>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<ExploreView />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route
            path="/posts/create"
            element={
              <PrivateRoute>
                <CreatePostView />
              </PrivateRoute>
            }
          />
          <Route
            path="/messenger"
            element={
              <PrivateRoute>
                <MessengerView />
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<SearchView />} />
          <Route path="/users/:id" element={<ProfileView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
