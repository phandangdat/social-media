import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Copyright = () => {
  return (
    <Typography variant="subtitle1" color="text.secondary">
      Copyright © 2023 <Link to="/">PostIt</Link>
    </Typography>
  );
};

export default Copyright;
