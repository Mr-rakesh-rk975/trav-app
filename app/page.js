// app/users/home/page.jsx
'use client'; // Ensure this component is client-side rendered

import React, { useEffect, useState } from 'react';
import { TravApis } from './utils/TravApis';
import withAuth from './middleware/withAuth';


const Home = () => {
    const [tourPackages, setTourPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { fetchTourPackages } = TravApis();
                const result = await fetchTourPackages(); // Fetch all tour packages
                setTourPackages(result.data || result); // Use result.data if the response contains it
            } catch (err) {
                setError('Failed to fetch tour packages');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>Hello user, welcome</h1>
            <div className="tour-packages">
                {tourPackages.length > 0 ? (
                    tourPackages.map(pkg => (
                        <div key={pkg._id} className="tour-package">
                            <h2><strong>Package:</strong>{" "} {pkg.title}</h2>
                            <p><strong>title:</strong> {" "}{pkg.description}</p>
                            <p><strong>Price:</strong> {" "} {pkg.price}</p>
                            <p><strong>Location:</strong> {" "}{pkg.location}</p>


                            <div className="image-gallery">
                                {pkg.imageGallery.map((url, index) => (
                                    <img key={index} src={url} alt={`Package image ${index + 1}`} />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tour packages available</p>
                )}
            </div>
        </>
    );
};

export default withAuth(Home, ['user']);
