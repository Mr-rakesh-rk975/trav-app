import React from 'react';
import { Container, Typography } from '@mui/material';

const AdminFooter = () => {
  return (
    <Container>
      <Typography variant="body2" color="textSecondary" align="center">
        © {new Date().getFullYear()} Your Travel App. All rights reserved.
      </Typography>
    </Container>
  );
};

export default AdminFooter;
