// /app/api/packages/route.js

import dbConnect from '../../lib/dbConnect';
import Continent from '../../models/Continent';

// GET: Fetch all continents
export async function GET() {
  await dbConnect();

  try {
    const continents = await Continent.find({});
    return new Response(JSON.stringify(continents), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching continents', error: error.message }), { status: 500 });
  }
}

// POST: Create a new continent
export async function POST(request) {
  await dbConnect();
  const { name } = await request.json();

  if (!name) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
  }

  try {
    const newContinent = new Continent({ name });
    await newContinent.save();
    return new Response(JSON.stringify(newContinent), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating continent', error: error.message }), { status: 500 });
  }
}
