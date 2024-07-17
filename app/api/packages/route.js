// app/api/packages/route.js
import dbConnect from '../../lib/dbConnect';
import Package from '../../models/Package';

export async function GET(request) {
  await dbConnect();

  try {
    const packages = await Package.find({});
    return new Response(JSON.stringify(packages), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching packages', error: error.message }), { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  const { packagename, title, description, price, location, imageGallery } = await request.json();

  if (!packagename || !title || !description || !price || !location) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
  }

  try {
    const newPackage = await Package.create({ packagename, title, description, price, location, imageGallery });
    return new Response(JSON.stringify(newPackage), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating package', error: error.message }), { status: 500 });
  }
}