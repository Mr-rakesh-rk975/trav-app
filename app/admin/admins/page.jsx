//  /app/admin/admins/page.jsx


'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
  Modal,
  Box,
  TextField
} from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [currentAdminRole, setCurrentAdminRole] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [adminDetails, setAdminDetails] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const storedRole = sessionStorage.getItem('role');
    const authToken = sessionStorage.getItem('token'); // Token of the logged-in user
    setCurrentAdminRole(storedRole);

    fetch('/api/admins', {
      headers: {
        'requester-role': storedRole,
        'Authorization': `Bearer ${authToken}`, // Include token in the request headers
      },
    })
      .then(res => res.json())
      .then(data => {
        // Filter data based on role and token
        if (storedRole === 'admin') {
          // Main admin sees all sub_admins
          setAdmins(data.filter(admin => admin.role === 'sub_admin'));
        } else if (storedRole === 'sub_admin') {
          // Sub admin sees all admins and other sub_admins except themselves
          setAdmins(data.filter(admin => admin.token !== authToken)); // Exclude self
        }
      })
      .catch(error => console.error('Error fetching admins:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/admins/${id}`, {
        method: 'DELETE',
        headers: {
          'requester-role': currentAdminRole,
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Include token in the request headers
        },
      });
      if (response.ok) {
        setAdmins(admins.filter(admin => admin.id !== id));
      } else {
        console.error('Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleOpenModal = (admin) => {
    setSelectedAdmin(admin);
    setAdminDetails({ name: admin.name, email: admin.email, password: admin.password });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAdmin(null);
  };

  const handleUpdateAdmin = async () => {
    try {
      const response = await fetch(`/api/admins/${selectedAdmin.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'requester-role': currentAdminRole,
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Include token in the request headers
        },
        body: JSON.stringify(adminDetails),
      });
      if (response.ok) {
        setAdmins(admins.map(admin => admin.id === selectedAdmin.id ? { ...admin, ...adminDetails } : admin));
        handleCloseModal();
      } else {
        console.error('Failed to update admin');
      }
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  if (!currentAdminRole) {
    return <Container><div>Loading...</div></Container>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin List
      </Typography>
      {currentAdminRole === 'admin' && (
        <Link href="/admin/admins/new" passHref>
          <Button variant="contained">Add New Admin</Button>
        </Link>
      )}
      <List>
        {admins.map(admin => (
          <ListItem key={admin.id}>
            <ListItemText
              primary={admin.name}
              secondary={
                <React.Fragment>
                  <Typography variant="body2" color="textPrimary">
                    {admin.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Role: {admin.role}
                  </Typography>
                </React.Fragment>
              }
            />

            {currentAdminRole === 'admin' && (
              <>
                <Link href={`/admin/admins/${admin.id}`} passHref>
                  <IconButton>
                    <Visibility />
                  </IconButton>
                </Link>
                <IconButton onClick={() => handleOpenModal(admin)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(admin.id)}>
                  <Delete />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Update Admin
          </Typography>
          <TextField
            label="Name"
            value={adminDetails.name}
            onChange={(e) => setAdminDetails({ ...adminDetails, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={adminDetails.email}
            onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            type="password"
            label="Password"
            value={adminDetails.password}
            onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
            fullWidth
            margin="normal"
          />

          <Button onClick={handleUpdateAdmin} variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminList;
