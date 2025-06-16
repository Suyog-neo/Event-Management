// src/components/Navbar.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, role, user } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const userActions = [
    { label: 'View Events', path: '/user/events' },
    { label: 'My Bookings', path: '/user/bookings' },
  ];

  const adminActions = [
    { label: 'Create Event', path: '/admin/create-event' },
    { label: 'Manage Events', path: '/admin/manage-events' },
    { label: 'View Bookings', path: '/admin/bookings' },
  ];

  const actions = role === 'admin' ? adminActions : userActions;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {actions.map((action) => (
          <ListItem button key={action.label} onClick={() => navigate(action.path)}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={action.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#ffffff',
          gap: 2,
          mt: 1,
          width: '100%',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', sm: 'none' }, color: '#ffffff' }}
          >
            <MenuIcon />
          </IconButton>

          <img
            src="/public/virtual-event.png"
            alt="Eventsy Logo"
            style={{ width: 32, height: 32 }}
          />

          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: '#ffffff', textAlign: 'center' }}
          >
            EventSy
          </Typography>
        </Box>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          {drawerContent}
        </Drawer>

        {isAuthenticated && (
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {actions.map((action) => (
              <Button
                key={action.label}
                onClick={() => navigate(action.path)}
                sx={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {action.label}
              </Button>
            ))}

            <Tooltip title="Logout">
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon sx={{ color: '#ffffff' }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Other Options</MenuItem>
      </Menu>
    </AppBar>
  );
}
