// // /app/models/Package.js;

// import mongoose from 'mongoose';

// const PackageSchema = new mongoose.Schema({
//   packagename: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   imageGallery: [String],
// }, {
//   timestamps: true,
// });

// export default mongoose.models.Package || mongoose.model('Package', PackageSchema);










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
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  continent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Continent',
    required: true
  },
}, {
  timestamps: true,
});

export default mongoose.models.Package || mongoose.model('Package', PackageSchema);
