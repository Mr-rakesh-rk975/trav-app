
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import admins from '../../../middleware/admin.json'; // Admins list with their roles

export async function POST(req) {
  await dbConnect();

  const { email, password } = await req.json();

  try {
    // Check if the user is an admin
    const admin = admins.find(admin => admin.email === email);

    if (admin) {
      if (admin.password === password) {
        const token = jwt.sign({ email: admin.email, role: admin.role }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });

        return new Response(JSON.stringify({ token, role: admin.role }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 400 });
      }
    }

    // Check if the user is a regular user
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 400 });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return new Response(JSON.stringify({ token, role: user.role }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error logging in', error }), { status: 500 });
  }
}
