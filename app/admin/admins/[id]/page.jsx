// /app/admin/admins/[id]/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Container, 
  Typography, 
  Box, 
  Button 
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const AdminDetail = ({params}) => {
  const router = useRouter();
  const { id } = params;  // Get the id from the URL
  const [admin, setAdmin] = useState(null);
  const [currentAdminRole, setCurrentAdminRole] = useState('');

  useEffect(() => {
    // Fetch the current admin role from session storage
    const storedRole = sessionStorage.getItem('role');
    setCurrentAdminRole(storedRole);

    // Fetch admin details from API
    if (id) {
      fetch(`/api/admins/${id}`, {
        headers: {
          'requester-role': storedRole,
        },
      })
        .then(res => res.json())
        .then(data => setAdmin(data))
        .catch(error => console.error('Error fetching admin details:', error));
    }
  }, [id]);

  if (!currentAdminRole) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
        >
          Back
        </Button>
        {admin && (
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>
              Admin Details
            </Typography>
            <Typography variant="body1"><strong>Name:</strong> {admin.name}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {admin.email}</Typography>
            <Typography variant="body1"><strong>Password:</strong> {admin.password}</Typography>
            {/* Add other admin details as needed */}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AdminDetail;
