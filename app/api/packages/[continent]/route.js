// /app/api/packages/[continent]/route.js

import dbConnect from '../../../lib/dbConnect';
import Continent from '../../../models/Continent';
import Country from '../../../models/Country';

// GET: Fetch all countries within the specified continent
export async function GET(request, { params }) {
  await dbConnect();
  const { continent } = params;

  try {
    // Find the continent by name
    const continentData = await Continent.findOne({ name: continent });

    if (!continentData) {
      return new Response(JSON.stringify({ message: 'Continent not found' }), { status: 404 });
    }

    // Fetch all countries within the specified continent
    const countries = await Country.find({ continent: continentData._id });
    return new Response(JSON.stringify(countries), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching countries', error: error.message }), { status: 500 });
  }
}

// POST: Create a new country within the specified continent
export async function POST(request, { params }) {
  await dbConnect();
  const { continent } = params;
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

    // Create a new country within the continent
    const newCountry = new Country({
      name,
      continent: continentData._id,
    });
    await newCountry.save();

    // Optionally, update the continent with the new country
    await Continent.findOneAndUpdate(
      { name: continent },
      { $inc: { countryCount: 1 } },
      { new: true }
    );

    return new Response(JSON.stringify(newCountry), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating country', error: error.message }), { status: 500 });
  }
}
