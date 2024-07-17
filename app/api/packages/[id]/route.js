// app/api/packages/[id]/route.js
import dbConnect from '../../../lib/dbConnect';
import Package from '../../../models/Package';

export async function GET(request, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const packages = await Package.findById(id);
    if (!packages) {
      return new Response(JSON.stringify({ message: 'Package not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(packages), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching package', error: error.message }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params;
  const { packagename, title, description, price, location, imageGallery } = await request.json();

  if (!packagename || !title || !description || !price || !location) {
    return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
  }

  try {
    const updatedPackage = await Package.findByIdAndUpdate(id, { packagename, title, description, price, location, imageGallery }, { new: true });
    if (!updatedPackage) {
      return new Response(JSON.stringify({ message: 'Package not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(updatedPackage), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating package', error: error.message }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return new Response(JSON.stringify({ message: 'Package not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Package deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting package', error: error.message }), { status: 500 });
  }
}
