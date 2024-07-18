// app/utils/TravApis.js
export const TravApis = () => {
    const fetchTourPackages = async () => {
        try {
            let result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/packages`);
            if (!result.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await result.json(); // Directly return the JSON response
            return data;
        } catch (error) {
            console.log(error);
            return { data: [], error: 'Failed to fetch tour packages' }; // Simplified error handling
        }
    };

    return {
        fetchTourPackages
    };
};
