// /app/admin/packages/add-package/page.jsx

'use client';
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Box, ImageList, ImageListItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import withAuth from '../../../middleware/withAuth';

const AddPackage = () => {
  const [packagename, setPackagename] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setImageUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const imageUrlArray = imageUrls; // No need to upload, just use the URLs generated from local files

      const response = await fetch('/api/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packagename,
          title,
          description,
          price,
          location,
          imageGallery: imageUrlArray,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add package');
      }

      router.push('/admin/packages');
    } catch (error) {
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Package
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Package Name"
          value={packagename}
          onChange={(e) => setPackagename(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
         <label htmlFor="package-image-gallary">Package Image Gallary</label>
         <br />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: '16px' }}
        />
        {imageUrls.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Uploaded Images</Typography>
            <ImageList className='flex gap-2'>
              {imageUrls.map((url, index) => (
                <ImageListItem key={index}>
                  <img src={url} alt={`Uploaded ${index}`} style={{maxWidth: '200px', width: '100%', minHeight: '200px' }} />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : null}
        <br />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Add Package
        </Button>
      </form>
    </Container>
  );
};

export default withAuth(AddPackage,['admin']);