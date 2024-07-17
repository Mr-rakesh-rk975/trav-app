'use client'
import React from 'react';
import { Container, Typography } from '@mui/material';
import withAuth from '../../middleware/withAuth';

const Bookings = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bookings
      </Typography>
      {/* Add bookings content here */}
    </Container>
  );
};

export default withAuth(Bookings,['admin']);
