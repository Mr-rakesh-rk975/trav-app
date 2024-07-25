'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';

const AddAdmin = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentAdminRole, setCurrentAdminRole] = useState('');

  useEffect(() => {
    // Fetch the current admin role from session storage
    const storedRole = sessionStorage.getItem('role');
    setCurrentAdminRole(storedRole);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentAdminRole !== 'admin') {
      setError('You are not authorized to add a new admin.');
      return;
    }

    try {
      const response = await fetch('/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'requester-role': currentAdminRole,
        },
        body: JSON.stringify({ name, email, password}),
      });

      if (response.ok) {
        setSuccess('Admin added successfully!');
        setError('');
        setName('');
        setEmail('');
        setPassword('');
        router.push('/admin/admins')
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add admin.');
        setSuccess('');
      }
    } catch (error) {
      setError('An error occurred while adding the admin.');
      setSuccess('');
    }
  };

  if (!currentAdminRole) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Admin
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            type="email"
          />
          
          <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          type="password"
        />
          <Button type="submit" variant="contained" color="primary">
            Add Admin
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddAdmin;
