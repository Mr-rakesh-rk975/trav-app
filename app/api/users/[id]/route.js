// app/api/users/[id]/route.js
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching user', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();

  const { id } = params;
  const { name, email, password, role } = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(id, { name, email, password:hashedPassword, role }, { new: true });
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating user', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify({ message: 'User deleted' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting user', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
