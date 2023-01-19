import * as React from 'react';
import { styled, alpha, useThemeProps } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { HiHome } from 'react-icons/hi';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import { NavLink, useNavigate } from 'react-router-dom';
import { MenuList } from '@mui/material';
import { UserAccountContext } from '../../provider/UserProvider';

type Props = {
  setConnectedUser: React.Dispatch<React.SetStateAction<boolean>>
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const Navbar: React.FC<Props> = (props) => {
    const {logOut} = React.useContext(UserAccountContext)
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
      React.useState<null | HTMLElement>(null);
  
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const CloseAfterCLick = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    function logout () {
      handleMobileMenuClose();
      const loggedOut = logOut()
      if (loggedOut) {
          props.setConnectedUser(true);
          setTimeout(() => {
              navigate('/login')
              window.location.reload()
          }, 1000)
      }
      
      
      props.setConnectedUser(true);
      setTimeout(() => {
        navigate('/');
      }, 1000)
    };
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuList>
        <NavLink to="/" style={{ textDecoration: 'none', display: 'block', color: "inherit"}}>
        <MenuItem onClick={CloseAfterCLick}>
          <IconButton size="large" color="inherit">
            <Badge color="error">
              <HiHome />
            </Badge>
          </IconButton>
          <p>Accueil</p>
        </MenuItem>
        </NavLink>
        <NavLink to="/listMessage" style={{ textDecoration: 'none', display: 'block', color: "inherit"}}>
        <MenuItem onClick={CloseAfterCLick}>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge color="error">
              <SmsIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        </NavLink>
        <MenuItem onClick={CloseAfterCLick}>
          <IconButton
            size="large"
            color="inherit"
          >
            <Badge color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={CloseAfterCLick}>
          <IconButton
            size="large"
            color="inherit"
          >
            <Badge color="error">
              <PeopleIcon />
            </Badge>
          </IconButton>
          <p>Amis</p>
        </MenuItem>
        <MenuItem onClick={CloseAfterCLick}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={CloseAfterCLick}>
          <IconButton
            size="large"
            color="inherit"
          >
            <Badge color="error">
              <SettingsIcon />
            </Badge>
          </IconButton>
          <p>Settings</p>
        </MenuItem>
        <MenuItem onClick={logout}>
          <IconButton
            size="large"
            color="inherit"
          >
            <Badge color="error">
              <SettingsIcon />
            </Badge>
          </IconButton>
          <p>Déconnexion</p>
        </MenuItem>
      </MenuList>
      </Menu>
    );
  
    return (
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <AppBar position="static">
          <Toolbar>
          <NavLink to="/" style={{ textDecoration: 'none', display: 'block', color: "inherit"}}>         
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Y-Book
            </Typography>
            </NavLink>  
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavLink to="/listMessage" style={{ textDecoration: 'none', display: 'block', color: "inherit"}}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge color="error">
                  <SmsIcon />
                </Badge>
              </IconButton>
              </NavLink>
              <IconButton
                size="large"
                color="inherit"
              >
                <Badge color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
              >
                <Badge color="error">
                  <PeopleIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
              >
                <Badge color="error">
                  <AccountCircle />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
              >
                <Badge color="error">
                  <SettingsIcon />
                </Badge>
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
    );
  }

  export default Navbar;