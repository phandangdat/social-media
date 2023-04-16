import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { useGlobal } from 'hooks';
import 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PostContentBox = (props) => {
  const { clickable, post, editing } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const { darkTheme } = useGlobal();

  return (
    <>
      {clickable && !editing ? (
        <Box
          sx={{
            padding: theme.spacing(2),
            width: '92%',
            '&:hover': {
              backgroundColor: darkTheme ? '#012548' : 'grey.50',
              cursor: 'pointer',
            },
          }}
          onClick={() => navigate('/posts/' + post._id)}
        >
          {props.children}
        </Box>
      ) : (
        <Box sx={{ padding: theme.spacing(2), width: '90%' }}>
          {props.children}
        </Box>
      )}
    </>
  );
};

export default PostContentBox;
