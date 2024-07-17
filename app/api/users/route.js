// app/api/users/route.js
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export async function GET(req) {
  await dbConnect();

  try {
    const users = await User.find({});
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching users', error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// export async function POST(req) {
//   await dbConnect();

//   const { name, email, password, role } = await req.json();
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return new Response(JSON.stringify({ message: 'User already exists' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword, role });
//     return new Response(JSON.stringify(user), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: 'Error creating user', error }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }
