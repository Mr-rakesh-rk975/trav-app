'use client'
import React from 'react';
import { Container, Typography } from '@mui/material';
import withAuth from '../../middleware/withAuth';

const Coupons = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Coupons
      </Typography>
      {/* Add coupons content here */}
    </Container>
  );
};

export default withAuth(Coupons,['admin']);
