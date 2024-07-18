'use client';
import React from 'react';
import { Container, Typography } from '@mui/material';
import withAuth from '../../middleware/withAuth';

const Settings = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      {/* Add settings content here */}
    </Container>
  );
};

export default withAuth(Settings,['admin']);
