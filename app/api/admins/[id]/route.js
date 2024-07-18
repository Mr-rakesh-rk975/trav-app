
// /app/pages/api/admins/[id]/route.js

import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import admins from '../../../middleware/admin.json';

const adminFilePath = path.join(process.cwd(), 'app', 'middleware', 'admin.json');

// Ensure the directory exists
if (!fs.existsSync(path.dirname(adminFilePath))) {
  fs.mkdirSync(path.dirname(adminFilePath), { recursive: true });
}

// Ensure the file exists
if (!fs.existsSync(adminFilePath)) {
  fs.writeFileSync(adminFilePath, JSON.stringify(admins, null, 2));
}

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf-8'));
    const admin = adminData.find(admin => admin.email === id);

    if (!admin) {
      return new Response(JSON.stringify({ message: 'Admin not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(admin), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching admin', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function PUT(req, { params }) {
  const requesterRole = req.headers.get('requester-role');
  if (requesterRole !== 'admin') {
    return new Response(JSON.stringify({ message: 'Unauthorized to update admin' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
  }

  const { id } = params;

  try {
    const updatedAdmin = await req.json();
    const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf-8'));
    const adminIndex = adminData.findIndex(admin => admin.email === id);

    if (adminIndex === -1) {
      return new Response(JSON.stringify({ message: 'Admin not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    adminData[adminIndex] = { ...adminData[adminIndex], ...updatedAdmin };

    fs.writeFileSync(adminFilePath, JSON.stringify(adminData, null, 2));

    return new Response(JSON.stringify({ message: 'Admin updated successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating admin', error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE(req, { params }) {
  const requesterRole = req.headers.get('requester-role');
  if (requesterRole !== 'admin') {
    return new Response(JSON.stringify({ message: 'Unauthorized to delete admin' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
  }

  const { id } = params;

  try {
    const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf-8'));
    const adminIndex = adminData.findIndex(admin => admin.email === id);

    if (adminIndex === -1) {
      return new Response(JSON.stringify({ message: 'Admin not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    adminData.splice(adminIndex, 1);

    fs.writeFileSync(adminFilePath, JSON.stringify(adminData, null, 2));

    return new Response(JSON.stringify({ message: 'Admin deleted successfully' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting admin', error }), {
       status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }
  
