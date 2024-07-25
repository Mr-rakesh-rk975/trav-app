
// /app/models/Continent.js
import mongoose from 'mongoose';

const ContinentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  countryCount: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true,
});

export default mongoose.models.Continent || mongoose.model('Continent', ContinentSchema);
