// /app/admin/admins/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, List, ListItem, ListItemText } from '@mui/material';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch admin data from API
    fetch('/api/admins')
      .then(res => res.json())
      .then(data => setAdmins(data.admins))
      .catch(error => console.error('Error fetching admins:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/admins/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Update state or fetch admins again
      } else {
        console.error('Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  return (
    <div>
      <h1>Admin List</h1>
      <Link href="/admin/admins/new" passHref>
        <Button>Add New Admin</Button>
      </Link>
      <List>
        {admins.map(admin => (
          <ListItem key={admin._id}>
            <ListItemText primary={admin.name} secondary={admin.email} />
            <Link href={`/admin/admins/${admin._id}`} passHref>
              <Button>Edit</Button>
            </Link>
            <Button onClick={() => handleDelete(admin._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AdminList;
