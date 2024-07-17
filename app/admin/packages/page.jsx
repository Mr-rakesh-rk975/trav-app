'use client';
import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, IconButton, Fab, CircularProgress, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';
import withAuth from '../../middleware/withAuth';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/packages');
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPackage = () => {
    router.push('/admin/packages/add-package');
  };

  const handleEditPackage = (id) => {
    router.push(`/admin/packages/update-package/${id}`);
  };

  const handlePreviewPackage = (id) => {
    router.push(`/admin/packages/preview/${id}`);
  };

  const handleDeletePackage = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        const response = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete package');
        }
        // Remove the deleted package from the state
        setPackages(packages.filter(pkg => pkg._id !== id));
      } catch (error) {
        setError('Failed to delete package, please try again.');
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Packages
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : packages.length > 0 ? (
        <List>
          {packages.map((pkg) => (
            <ListItem key={pkg._id} secondaryAction={
              <>
                <IconButton edge="end" aria-label="preview" onClick={() => handlePreviewPackage(pkg._id)}>
                  <VisibilityIcon />
                </IconButton>
                {"  "}
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditPackage(pkg._id)}>
                  <EditIcon />
                </IconButton>
                {"  "}
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePackage(pkg._id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }>
              <ListItemText primary={pkg.packagename} secondary={`${pkg.location} - $${pkg.price}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No packages found</Typography>
      )}
      <Fab color="primary" aria-label="add" onClick={handleAddPackage} style={{ position: 'fixed', bottom: 200, right: 200 }}>
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default withAuth(Packages,['admin']);
