// models/Farmer.js
import mongoose, { Schema, model,} from "mongoose";

const Farmer1Schema = new Schema({
  fullName: String,
  nic: { type: String, unique: true },
  password: String,
  dob: String,
  gender: String,
  address: String,
  phone: String,
  email: String,
  province: String,
  district: String,
  village: String,
  isGovEmployee: Boolean,
  salaryAbove40k: Boolean,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
});

const Farmer = mongoose.models.Farmer || mongoose.model("Farmer",Farmer1Schema)

export default Farmer;
