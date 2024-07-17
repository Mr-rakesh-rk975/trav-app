'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, CircularProgress, Alert, Paper, Box, Divider, Grid, ImageList, ImageListItem } from '@mui/material';
import withAuth from '@/app/middleware/withAuth';

const PreviewPackage = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPackage();
  }, [id]);

  const fetchPackage = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/packages/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch package');
      }
      const data = await response.json();
      setPackageData(data);
    } catch (error) {
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Package Preview
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : packageData ? (
        <Grid container spacing={4} style={{ marginTop: '20px' }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h5" gutterBottom>
                {packageData.packagename}
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="subtitle1">
                  <strong>Location:</strong> {packageData.location}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Price:</strong> ${packageData.price}
                </Typography>
                <Divider />
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                  {packageData.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <ImageList variant="masonry" cols={2} gap={8}>
              {packageData.imageGallery.map((image) => (
                <ImageListItem key={image}>
                  <img
                    src={`${image}?w=248&fit=crop&auto=format`}
                    srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt="Package Image"
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1">Package not found</Typography>
      )}
    </Container>
  );
};

export default withAuth(PreviewPackage,['admin']);
