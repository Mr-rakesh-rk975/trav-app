import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export async function POST(req) {
  await dbConnect();

  const { name, email, password } = await req.json();

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return new Response(JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating user', error }), { status: 500 });
  }
}
