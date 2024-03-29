import { useTheme } from '@emotion/react';
import {
  Button,
  Collapse,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Logo, UserAvatar } from 'components';
import HorizontalStack from 'components/util/HorizontalStack';
import { isLoggedIn, logoutUser } from 'helpers/authHelper';
import { useGlobal } from 'hooks';
import { useEffect, useState } from 'react';
import 'react-icons/ai';
import {
  AiFillHome,
  AiFillMessage,
  AiOutlineSearch,
} from 'react-icons/ai';
import {
  MdBrightnessMedium,
  MdExpandLess,
  MdExpandMore,
  MdLanguage,
  MdLogout,
  MdOutlineSearch,
  MdSettings,
} from 'react-icons/md';
import 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [searchIcon, setSearchIcon] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [width, setWindowWidth] = useState(0);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const {
    darkTheme,
    handleChangeTheme,
    english,
    handleChangeLocale,
    translate,
  } = useGlobal();
  const [openSubMenu, setOpenSubMenu] = useState(false);

  useEffect(() => {
    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () =>
      window.removeEventListener('resize', updateDimensions);
  }, []);

  const mobile = width < 650;
  const tablet = width < 1000;
  const navbarWidth = width < 600;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleLogout = async (e) => {
    logoutUser();
    navigate('/login');
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/search?' + new URLSearchParams({ search }));
  };

  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleSubMenu = () => {
    setOpenSubMenu(!openSubMenu);
  };

  return (
    <Stack mb={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 2,
          pb: 0,
        }}
        spacing={!mobile ? 2 : 0}
      >
        <HorizontalStack>
          <Link
            to="/"
            style={{
              display: 'flex',
              textDecoration: 'none',
            }}
          >
            <Logo sx={{ fontSize: '40px' }} />
            <Typography
              sx={{
                display: mobile ? 'none' : 'block',
                fontWeight: 'bold',
                color: darkTheme ? 'white' : '#3b88c3',
              }}
              variant={navbarWidth ? 'h6' : 'h4'}
              mr={1}
              color={theme.palette.primary.main}
            >
              ostIt
            </Typography>
          </Link>
        </HorizontalStack>

        {!navbarWidth && (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              size="small"
              label={translate('searchForPosts')}
              sx={{
                flexGrow: 1,
                maxWidth: tablet ? 300 : 600,
                width: 300,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineSearch />
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
              value={search}
            />
          </Box>
        )}

        <HorizontalStack>
          {mobile && (
            <IconButton onClick={handleSearchIcon}>
              <AiOutlineSearch />
            </IconButton>
          )}

          <IconButton component={Link} to={'/'}>
            <AiFillHome />
          </IconButton>
          {user ? (
            <>
              <IconButton component={Link} to={'/messenger'}>
                <AiFillMessage />
              </IconButton>
              <IconButton
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              >
                <UserAvatar
                  width={30}
                  height={30}
                  username={user.username}
                />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <List
                  sx={{
                    bgcolor: 'background.paper',
                    minWidth: '180px',
                  }}
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      to={`/users/${user.username}`}
                    >
                      <ListItemAvatar>
                        <UserAvatar
                          width={30}
                          height={30}
                          username={user.username}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={user.username} />
                    </ListItemButton>
                  </ListItem>
                  <ListItemButton onClick={handleToggleSubMenu}>
                    <ListItemIcon sx={{ fontSize: '25px' }}>
                      <MdSettings />
                    </ListItemIcon>
                    <ListItemText primary={translate('settings')} />
                    {openSubMenu ? (
                      <MdExpandLess />
                    ) : (
                      <MdExpandMore />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={openSubMenu}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={handleChangeTheme}
                      >
                        <ListItemIcon>
                          <MdBrightnessMedium />
                        </ListItemIcon>
                        <ListItemText
                          primary={darkTheme ? 'Light' : 'Dark'}
                        />
                      </ListItemButton>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={handleChangeLocale}
                      >
                        <ListItemIcon>
                          <MdLanguage />
                        </ListItemIcon>
                        <ListItemText
                          primary={english ? 'Vietnamese' : 'English'}
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                      <ListItemIcon sx={{ fontSize: '25px' }}>
                        <MdLogout />
                      </ListItemIcon>
                      <ListItemText primary={translate('logout')} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Popover>
            </>
          ) : (
            <>
              <Button
                variant="text"
                sx={{ minWidth: 80 }}
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
              <Button
                variant="text"
                sx={{ minWidth: 65 }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </>
          )}
        </HorizontalStack>
      </Stack>
      {navbarWidth && searchIcon && (
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            size="small"
            label={translate('searchForPosts')}
            fullWidth
            onChange={handleChange}
            value={search}
          />
        </Box>
      )}
    </Stack>
  );
};

export default Navbar;
