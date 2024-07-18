// /app/admin/admins/[id]/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, TextField } from '@mui/material';

const AdminDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch admin details from API
      fetch(`/api/admins/${id}`)
        .then(res => res.json())
        .then(data => setAdmin(data.admin))
        .catch(error => console.error('Error fetching admin:', error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit updated admin details to API
    try {
      const response = await fetch(`/api/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(admin),
      });
      if (response.ok) {
        // Handle success
      } else {
        console.error('Failed to update admin');
      }
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  if (!admin) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Admin</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={admin.name}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          value={admin.email}
          onChange={handleChange}
        />
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default AdminDetail;
