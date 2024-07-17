// /app/models/Package.js;

import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
  packagename: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imageGallery: [String],
}, {
  timestamps: true,
});

export default mongoose.models.Package || mongoose.model('Package', PackageSchema);
