import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { login } from 'api/users';
import { Copyright, ErrorAlert, Logo } from 'components';
import { loginUser } from 'helpers/authHelper';
import { useGlobal } from 'hooks';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginView = () => {
  const navigate = useNavigate();
  const { translate } = useGlobal();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(formData);
    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate('/');
    }
  };

  return (
    <Container maxWidth={'xs'} sx={{ mt: 6 }}>
      <Stack alignItems="center">
        <Link to="/" color="inherit" underline="none">
          <Logo sx={{ fontSize: '70px', mb: 2 }} />
        </Link>
        <Typography variant="h5" gutterBottom>
          {translate('login')}
        </Typography>
        <Typography color="text.secondary">
          {translate('dontHaveAnAccountYet')}{' '}
          <Link to="/signup">{translate('signUp')}</Link>
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label={translate('emailAddress')}
            fullWidth
            margin="normal"
            autoComplete="email"
            autoFocus
            required
            id="email"
            name="email"
            onChange={handleChange}
          />
          <TextField
            label={translate('password')}
            fullWidth
            required
            margin="normal"
            id="password  "
            name="password"
            onChange={handleChange}
            type="password"
          />

          <ErrorAlert error={serverError} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 2 }}
          >
            {translate('login')}
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginView;
