
// // /app/pages/api/admins/route.js
// import fs from 'fs';
// import path from 'path';
// import { NextResponse } from 'next/server';
// import admins from '../../middleware/admin.json';

// const adminFilePath = path.join(process.cwd(), 'app', 'middleware', 'admin.json');

// // Ensure the directory exists
// if (!fs.existsSync(path.dirname(adminFilePath))) {
//   fs.mkdirSync(path.dirname(adminFilePath), { recursive: true });
// }

// // Ensure the file exists
// if (!fs.existsSync(adminFilePath)) {
//   fs.writeFileSync(adminFilePath, JSON.stringify(admins, null, 2));
// }

// export async function GET(req) {
//   try {
//     const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf-8'));
//     return new Response(JSON.stringify(adminData), { status: 200, headers: { 'Content-Type': 'application/json' } });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: 'Error fetching admins', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
//   }
// }

// export async function POST(req) {
//   const requesterRole = req.headers.get('requester-role');
//   if (requesterRole !== 'admin') {
//     return new Response(JSON.stringify({ message: 'Unauthorized to add admin' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
//   }

//   try {
//     const newAdmin = await req.json();
//     newAdmin.role = 'sub_admin'; // Set the role to 'sub_admin' for new admins

//     // Add newAdmin to admins array in admin.json
//     const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf-8'));
//     adminData.push(newAdmin);

//     // Save admins array back to admin.json
//     fs.writeFileSync(adminFilePath, JSON.stringify(adminData, null, 2));

//     return new Response(JSON.stringify({ message: 'Admin added successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: 'Error adding admin', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
//   }
// }








import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import admins from '../../middleware/admin.json';

const adminFilePath = path.join(process.cwd(), 'app', 'middleware', 'admin.json');

// Ensure the directory exists
if (!fs.existsSync(path.dirname(adminFilePath))) {
  fs.mkdirSync(path.dirname(adminFilePath), { recursive: true });
}

// Ensure the file exists
if (!fs.existsSync(adminFilePath)) {
  fs.writeFileSync(adminFilePath, JSON.stringify(admins, null, 2));
}

export async function GET(req) {
  try {
    const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf-8'));
    return new Response(JSON.stringify(adminData), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching admins', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST(req) {
  const requesterRole = req.headers.get('requester-role');
  if (requesterRole !== 'admin') {
    return new Response(JSON.stringify({ message: 'Unauthorized to add admin' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const newAdmin = await req.json();
    // Generate a unique id and token for the new admin
    newAdmin.id = Date.now().toString(); // Example unique id, you might want a more robust method


    newAdmin.role = 'sub_admin'; // Set the role to 'sub_admin' for new admins

    // Add newAdmin to admins array in admin.json
    const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf-8'));
    adminData.push(newAdmin);

    // Save admins array back to admin.json
    fs.writeFileSync(adminFilePath, JSON.stringify(adminData, null, 2));

    return new Response(JSON.stringify({ message: 'Admin added successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error adding admin', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
