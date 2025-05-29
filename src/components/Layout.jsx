import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Layout = ({ children }) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">도서 관리 시스템</Typography>
      </Toolbar>
    </AppBar>
    <Box p={2}>
      {children}
    </Box>
    <Box textAlign="center" mt={5} p={2} bgcolor="#f5f5f5">
      © 2025 My Book App
    </Box>
  </>
);

export default Layout;
