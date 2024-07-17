// app/api/coupons/[id]/route.js
import dbConnect from '../../../lib/dbConnect';
import Coupon from '../../../models/Coupon';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const coupon = await Coupon.findById(id);
      if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
      res.status(200).json(coupon);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching coupon', error });
    }
  } else if (req.method === 'PUT') {
    const { code, discount, expiryDate, enabled } = req.body;
    try {
      const updatedCoupon = await Coupon.findByIdAndUpdate(id, { code, discount, expiryDate, enabled }, { new: true });
      if (!updatedCoupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
      res.status(200).json(updatedCoupon);
    } catch (error) {
      res.status(500).json({ message: 'Error updating coupon', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const coupon = await Coupon.findByIdAndDelete(id);
      if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
      }
      res.status(200).json({ message: 'Coupon deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting coupon', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}