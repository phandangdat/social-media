import { Button } from '@mui/material';
import { useGlobal } from 'hooks';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const { translate } = useGlobal();

  return (
    <Button
      variant="outlined"
      size="medium"
      onClick={() => navigate('/posts/create')}
      sx={{
        gap: '0.2rem',
        whiteSpace: 'nowrap',
      }}
    >
      <AiOutlinePlus style={{ flexShrink: 0 }} />
      <span>{translate('newPost')}</span>
    </Button>
  );
};

export default CreatePost;
