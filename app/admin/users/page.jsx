'use client';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton as MuiIconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import withAuth from '../../middleware/withAuth';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setSnackbarMessage('User deleted successfully');
      setSnackbarSeverity('success');
      fetchUsers();
    } catch (error) {
      setSnackbarMessage('Failed to delete user');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      setSnackbarMessage('User updated successfully');
      setSnackbarSeverity('success');
      setDialogOpen(false);
      fetchUsers();
    } catch (error) {
      setSnackbarMessage('Failed to update user');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  const handleDialogOpen = (user) => {
    setSelectedUser({ ...user });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedUser(null);
    setDialogOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : users.length > 0 ? (
        <List>
          {users.map((user) => (
            <ListItem
              key={user._id}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleDialogOpen(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No users found</Typography>
      )}

      {/* Update User Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                value={selectedUser.name || ''}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={selectedUser.email || ''}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={selectedUser.password || ''}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MuiIconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </MuiIconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="dense"
                name="role"
                label="Role"
                type="text"
                fullWidth
                value={selectedUser.role || ''}
                onChange={handleChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" startIcon={<CancelIcon />}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" startIcon={<SaveIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default withAuth(Users,['admin']);
