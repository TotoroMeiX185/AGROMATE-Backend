// routes/farmerRoutes.js
import { Router } from "express";
const router = Router();
import Farmer1Schema from "../Models/Afarmer.js";

// Register a farmer (called by user registration form)
router.post("/register", async (req, res) => {
  try {
    const farmer = new Farmer1Schema(req.body);
    await farmer.save();
    res.status(201).json({ message: "Farmer registered, pending approval." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all pending farmers (admin view)
router.get("/pending", async (req, res) => {
  try {
    const pendingFarmers = await Farmer1Schema.find({ status: "pending" });
    res.json(pendingFarmers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pending farmers" });
  }
});

// Search farmer by NIC (can return any status)
router.get("/:nic", async (req, res) => {
  try {
    const farmer = await Farmer1Schema.findOne({ nic: req.params.nic });
    if (!farmer) return res.status(404).json({ error: "Not found" });
    res.json(farmer);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

// Approve or reject farmer by NIC
router.put("/:nic/:action", async (req, res) => {
  const { nic, action } = req.params;
  if (!["approve", "reject"].includes(action)) {
    return res.status(400).json({ error: "Invalid action" });
  }

  try {
    const farmer = await Farmer1Schema.findOneAndUpdate(
      { nic },
      { status: action === "approve" ? "approved" : "rejected" },
      { new: true }
    );

    if (!farmer) return res.status(404).json({ error: "Farmer not found" });

    res.json({ message: `Farmer ${nic} ${action}d`, farmer });
  } catch (err) {
    res.status(500).json({ error: "Failed to update farmer status" });
  }
});

export default router;
