// /app/api/packages/[continent]/[country]/route.js

// /app/api/packages/[continent]/[country]/route.js

import dbConnect from '../../../../lib/dbConnect';
import Continent from '../../../../models/Continent';
import Country from '../../../../models/Country';
import City from '../../../../models/City';

// GET: Fetch all cities within the specified country in a continent
export async function GET(request, { params }) {
  await dbConnect();
  const { continent, country } = params;

  try {
    // Find the continent by name
    const continentData = await Continent.findOne({ name: continent });
    if (!continentData) {
      return new Response(JSON.stringify({ message: 'Continent not found' }), { status: 404 });
    }

    // Find the country by name within the continent
    const countryData = await Country.findOne({ name: country, continent: continentData._id });
    if (!countryData) {
      return new Response(JSON.stringify({ message: 'Country not found' }), { status: 404 });
    }

    // Fetch all cities within the specified country
    const cities = await City.find({ country: countryData._id });
    return new Response(JSON.stringify(cities), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching cities', error: error.message }), { status: 500 });
  }
}


// POST: Create a new city within the specified country in the continent
export async function POST(request, { params }) {
    await dbConnect();
    const { continent, country } = params;
    const { name } = await request.json();
  
    if (!name) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }
  
    try {
      // Find the continent by name
      const continentData = await Continent.findOne({ name: continent });
      if (!continentData) {
        return new Response(JSON.stringify({ message: 'Continent not found' }), { status: 404 });
      }
  
      // Find the country by name within the continent
      const countryData = await Country.findOne({ name: country, continent: continentData._id });
      if (!countryData) {
        return new Response(JSON.stringify({ message: 'Country not found' }), { status: 404 });
      }
  
      // Create a new city within the country
      const newCity = new City({
        name,
        country: countryData._id,
        continent: continentData._id
      });
      await newCity.save();
  
      // Update the country with the new city
      await Country.findByIdAndUpdate(countryData._id, { $inc: { cityCount: 1 } });
  
      return new Response(JSON.stringify(newCity), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Error creating city', error: error.message }), { status: 500 });
    }
  }
  