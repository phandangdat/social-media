import { CircularProgress, Stack, Typography } from '@mui/material';
import { useGlobal } from 'hooks';

const Loading = ({ label }) => {
  const { translate } = useGlobal();

  return (
    <Stack alignItems="center">
      <CircularProgress size={50} sx={{ my: 1 }} />
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {label || translate('loading')}
      </Typography>
    </Stack>
  );
};

export default Loading;
