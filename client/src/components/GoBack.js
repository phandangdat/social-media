import { Typography } from '@mui/material';
import { useGlobal } from 'hooks';
import { Link } from 'react-router-dom';

const GoBack = () => {
  const { translate } = useGlobal();

  return (
    <Typography sx={{ mb: 2 }}>
      <Link to="/"> &lt;&lt; {translate('goBackToPosts')}</Link>
    </Typography>
  );
};

export default GoBack;
