import { Card, useTheme } from '@mui/material';
import { useGlobal } from 'hooks';
import UserAvatar from './UserAvatar';
import HorizontalStack from './util/HorizontalStack';

const Message = (props) => {
  const username = props.conservant.username;
  const message = props.message;
  const theme = useTheme();
  const { darkTheme } = useGlobal();

  let styles = {};
  if (message.direction === 'to') {
    styles = {
      justifyContent: 'flex-start',
    };
  } else if (message.direction === 'from') {
    styles = {
      messageColor: darkTheme ? '#001e3c' : theme.palette.grey['100'],
      justifyContent: 'flex-end',
    };
  }

  return (
    <HorizontalStack
      sx={{ paddingY: 1, width: '100%' }}
      spacing={2}
      justifyContent={styles.justifyContent}
      alignItems="flex-end"
    >
      {message.direction === 'to' && (
        <UserAvatar username={username} height={30} width={30} />
      )}

      <Card
        sx={{
          borderRadius: '25px',
          backgroundColor: styles.messageColor,
          borderWidth: '1px',
          paddingY: '12px',
          maxWidth: '70%',
          paddingX: 2,
        }}
      >
        {message.content}
      </Card>
    </HorizontalStack>
  );
};

export default Message;
