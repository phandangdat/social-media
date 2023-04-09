import { Card } from '@mui/material';
import { Box } from '@mui/system';
import { Copyright } from 'components';

const Footer = () => {
  return (
    <Box pb={3}>
      <Card>
        <Copyright />
      </Card>
    </Box>
  );
};

export default Footer;
