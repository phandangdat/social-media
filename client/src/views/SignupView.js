import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { signup } from 'api/users';
import { Copyright, ErrorAlert, Logo } from 'components';
import { loginUser } from 'helpers/authHelper';
import { useGlobal } from 'hooks';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contains, isEmail, isLength } from 'validator';

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState({});
  const { translate } = useGlobal();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0) return;

    const data = await signup(formData);

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate('/');
    }
  };

  const validate = () => {
    const errors = {};

    if (!isLength(formData.username, { min: 6, max: 30 })) {
      errors.username = 'Must be between 6 and 30 characters long';
    }

    if (contains(formData.username, ' ')) {
      errors.username = 'Must contain only valid characters';
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password = 'Must be at least 8 characters long';
    }

    if (!isEmail(formData.email)) {
      errors.email = 'Must be a valid email address';
    }

    setErrors(errors);

    return errors;
  };

  return (
    <Container maxWidth="xs" sx={{ mt: { xs: 2, md: 6 } }}>
      <Stack alignItems="center">
        <Link to="/" color="inherit" underline="none">
          <Logo sx={{ fontSize: '70px', mb: 2 }} />
        </Link>
        <Typography variant="h5" gutterBottom>
          {translate('signUp')}
        </Typography>
        <Typography color="text.secondary">
          {translate('alreadyHaveAnAccount')}{' '}
          <Link to="/login">{translate('login')}</Link>
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label={translate('userName')}
            fullWidth
            margin="normal"
            autoFocus
            required
            id="username"
            name="username"
            onChange={handleChange}
            error={errors.username !== undefined}
            helperText={errors.username}
          />
          <TextField
            label={translate('emailAddress')}
            fullWidth
            margin="normal"
            autoComplete="email"
            required
            id="email"
            name="email"
            onChange={handleChange}
            error={errors.email !== undefined}
            helperText={errors.email}
          />
          <TextField
            label={translate('password')}
            fullWidth
            required
            margin="normal"
            autoComplete="password"
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            error={errors.password !== undefined}
            helperText={errors.password}
          />
          <ErrorAlert error={serverError} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 2 }}
          >
            {translate('signUp')}
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Stack>
    </Container>
  );
};

export default SignupView;
