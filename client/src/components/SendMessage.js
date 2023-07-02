import { Button, Stack, TextField } from '@mui/material';
import { useGlobal } from 'hooks';
import { useState } from 'react';
import HorizontalStack from './util/HorizontalStack';

const SendMessage = (props) => {
  const [content, setContent] = useState('');
  const { translate } = useGlobal();

  const handleSendMessage = () => {
    props.onSendMessage(content);
    setContent('');
  };

  return (
    <Stack
      sx={{
        m: 2,
        height: '40px',
      }}
      justifyContent="center"
    >
      <HorizontalStack>
        <TextField
          onChange={(e) => setContent(e.target.value)}
          label={translate('sendAMessage')}
          fullWidth
          value={content}
          autoComplete="off"
          size="small"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && content.length > 0) {
              handleSendMessage();
            }
          }}
        />

        <Button
          onClick={handleSendMessage}
          disabled={content.length === 0}
        >
          {translate('send')}
        </Button>
      </HorizontalStack>
    </Stack>
  );
};

export default SendMessage;
