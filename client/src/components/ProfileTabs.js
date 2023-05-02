import { Card, Tab, Tabs } from '@mui/material';
import { useGlobal } from 'hooks';

const ProfileTabs = (props) => {
  const handleChange = (e, newValue) => {
    props.setTab(newValue);
  };
  const { translate } = useGlobal();

  return (
    <Card sx={{ padding: 0 }}>
      <Tabs
        value={props.tab}
        onChange={handleChange}
        variant="scrollable"
      >
        <Tab label={translate('posts')} value="posts" />
        <Tab label={translate('liked')} value="liked" />
        <Tab label={translate('commented')} value="comments" />
        <Tab label={translate('following')} value="following" />
        <Tab label={translate('followers')} value="followers" />
      </Tabs>
    </Card>
  );
};

export default ProfileTabs;
