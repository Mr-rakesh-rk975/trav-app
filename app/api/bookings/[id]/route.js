// app/api/bookings/[id]/route.js
import dbConnect from '../../../lib/dbConnect';
import Booking from '../../../models/Booking';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const booking = await Booking.findById(id).populate('user').populate('travelPackage');
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching booking', error });
    }
  } else if (req.method === 'PUT') {
    const { user, travelPackage, date, status } = req.body;
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(id, { user, travelPackage, date, status }, { new: true });
      if (!updatedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.status(200).json(updatedBooking);
    } catch (error) {
      res.status(500).json({ message: 'Error updating booking', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const booking = await Booking.findByIdAndDelete(id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.status(200).json({ message: 'Booking deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting booking', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
