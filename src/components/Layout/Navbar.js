import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import ChecklistIcon from '@mui/icons-material/Checklist';

const Navbar = () => {
  const { user, logout, currentView, setCurrentView } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <ChecklistIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>
        
        {!user ? (
          <Box>
            <Button 
              color="inherit" 
              onClick={() => setCurrentView('login')}
              variant={currentView === 'login' ? 'outlined' : 'text'}
              sx={{ mr: 1 }}
            >
              Login
            </Button>
            <Button 
              color="inherit" 
              onClick={() => setCurrentView('register')}
              variant={currentView === 'register' ? 'outlined' : 'text'}
            >
              Register
            </Button>
          </Box>
        ) : (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;