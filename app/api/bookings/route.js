// app/api/bookings/route.js
import dbConnect from '../../lib/dbConnect';
import Booking from '../../models/Booking';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const bookings = await Booking.find({}).populate('user').populate('travelPackage');
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings', error });
    }
  } else if (req.method === 'POST') {
    const { user, travelPackage, date, status } = req.body;
    try {
      const newBooking = await Booking.create({ user, travelPackage, date, status });
      res.status(201).json(newBooking);
    } catch (error) {
      res.status(500).json({ message: 'Error creating booking', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
