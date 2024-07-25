// /models/City.js
import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true,
  },
  continent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Continent',
    required: true,
  },
});

export default mongoose.models.City || mongoose.model('City', citySchema);
