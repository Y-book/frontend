import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
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
import MoreIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import { NavLink, useNavigate } from 'react-router-dom';
import { MenuList } from '@mui/material';
import { UserAccountContext } from '../../provider/UserProvider';
import { NavbarProps } from '../../interfaces/Types';
import { blue } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';

  const Navbar: React.FC<NavbarProps> = (props) => {
    const {logOut} = React.useContext(UserAccountContext)
    const navigate = useNavigate();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
      React.useState<null | HTMLElement>(null);
  
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const CloseAfterCLick = () => {
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const goToFriendship = () => {
      handleMobileMenuClose();
      navigate('/friendship');
    }

    const goHome = () => {
      handleMobileMenuClose();
      navigate('/');
    }

    const openProfile = () => {
      handleMobileMenuClose();
      navigate('/profile');
    }

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
        <MenuItem onClick={goHome}>
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
        <NavLink to="/friendship" style={{ textDecoration: 'none', display: 'block', color: "inherit"}}>
        <MenuItem onClick={goToFriendship}>
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
        </NavLink>
        <MenuItem onClick={openProfile}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profil</p>
        </MenuItem>
        <MenuItem onClick={logout}>
          <IconButton
            size="large"
            color="inherit"
          >
            <Badge color="error">
              <LogoutIcon />
            </Badge>
          </IconButton>
          <p>Déconnexion</p>
        </MenuItem>
      </MenuList>
      </Menu>
    );
  
    return (
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <AppBar position="static" style={{backgroundColor: blue[100], color: 'black'}}>
          <Toolbar>
          <NavLink to="/" style={{ textDecoration: 'none', display: 'block', color: "inherit"}}>         
            <Typography
              variant="h6"
              noWrap
              component="div"
            >
              Y-Book
            </Typography>
            </NavLink>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavLink to="/listMessage" style={{ textDecoration: 'none', display: 'block', color: "inherit"}}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge color="error">
                  <SmsIcon />
                </Badge>
              </IconButton>
              </NavLink>
              <NavLink to="/friendship" style={{ textDecoration: 'none', display: 'block', color: "inherit"}}>
              <IconButton
                size="large"
                color="inherit"
              >
                <Badge color="error">
                  <PeopleIcon />
                </Badge>
              </IconButton>
              </NavLink>
              <NavLink to="/profile" style={{ textDecoration: 'none', display: 'block', color: "inherit"}}>
              <IconButton
                size="large"
                color="inherit"
              >
                <Badge color="error">
                  <AccountCircle />
                </Badge>
              </IconButton>
              </NavLink>
              <IconButton
                size="large"
                color="inherit"
                onClick={logout}
              >
                <Badge color="error">
                  <LogoutIcon />
                </Badge>
              </IconButton>
            </Box>
            {props.connectedUser &&
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
            }
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>
    );
  }

  export default Navbar;