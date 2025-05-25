import mongoose from 'mongoose';

const { Schema } = mongoose;

const CropSchema = new Schema({
  farmer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  season: { type: String },
  plantedDate: { type: Date },
  harvested: { type: Boolean, default: false }
});

const Crop = mongoose.models.Crop || mongoose.model('Crop', CropSchema);
export default Crop;
