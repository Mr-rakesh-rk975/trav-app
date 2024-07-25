
// /app/models/Country.js
import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  continent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Continent',
    required: true
  },
  cityCount: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true,
});

export default mongoose.models.Country || mongoose.model('Country', CountrySchema);
