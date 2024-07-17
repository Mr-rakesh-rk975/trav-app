// app/api/coupons/route.js
import dbConnect from '../../lib/dbConnect';
import Coupon from '../../models/Coupon';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const coupons = await Coupon.find({});
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching coupons', error });
    }
  } else if (req.method === 'POST') {
    const { code, discount, expiryDate, enabled } = req.body;
    try {
      const newCoupon = await Coupon.create({ code, discount, expiryDate, enabled });
      res.status(201).json(newCoupon);
    } catch (error) {
      res.status(500).json({ message: 'Error creating coupon', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


