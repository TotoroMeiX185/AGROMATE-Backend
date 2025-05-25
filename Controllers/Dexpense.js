import Expense from "../Models/Dexpense.js";

export const getExpenses = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const expenseEntries = await Expense.find({ farmer: farmerId });

    const totalExpenses = expenseEntries.reduce((sum, item) => sum + item.amount, 0);

    res.json({ totalExpenses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching expenses" });
  }
};
