'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography } from '@mui/material';
import withAuth from '../../middleware/withAuth';

const Dashboard = () => {
 
  return (
    <>
      
      <Container>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        {/* Add dashboard content here */}
      </Container>
    </>
  );
};

export default withAuth(Dashboard,['admin']);
