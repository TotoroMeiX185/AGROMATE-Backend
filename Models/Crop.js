import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true,
  },
  cropName: {type:String, required: true},
  cropVariety: String,
  season: {type:String, required: true},
  sowingDate: Date,
  harvestDate: Date,
  typeOfFarming: String,
  irrigationMethod: String,
  fertilizerUsed: String,
  pesticidesUsed: String,
  landLocation: String, 
  totalLandUsed:{ type:Number, required: true},
}, {
  timestamps: true
});

export default mongoose.model('Crop', cropSchema);
