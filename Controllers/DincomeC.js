// controllers/farmerController.js

import Income from "../Models/Dincome.js";

export const getIncome = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const incomeEntries = await Income.find({ farmer: farmerId });

    const totalIncome = incomeEntries.reduce((sum, item) => sum + item.amount, 0);

    res.json({ totalIncome });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching income" });
  }
};
