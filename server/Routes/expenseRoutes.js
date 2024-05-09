const Expense = require("../Models/expenseModel");
const express = require("express");
const { route } = require("./userRoutes");
const router = express.Router();
router.use(express.json());

// endpoint to show the Expense
router.get("/", async (req, res) => {
  try {
    const Expenses = await Expense.find();
    res.status(200).json({ message: "Expense data", Expenses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// endpoint to create the expense
router.post("/", async (req, res) => {
  try {
    const { expenseName, expenseValue,checkboxValues } = req.body;
    const ExpenseData = new Expense({
      expenseName,
      expenseValue,
      checkboxValues
    });
    await ExpenseData.save();
    res
      .status(200)
      .json({ message: "Expense added Successfully", ExpenseData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// endpoint to update the expense
router.put("/:id", async (req, res) => {
  try {
    const expenseID = req.params.id;
    const { expenseName, expenseValue } = req.body;
    const updateExpense = await Expense.findByIdAndUpdate(expenseID, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Expense Updated", updateExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// endpoint to delete the expense
router.delete("/:id", async (req, res) => {
  try {
    const expenseID = req.params.id;
    const deleteExpense = await Expense.findByIdAndDelete(expenseID);
    res.status(200).json({ message: "Expense Deleted", deleteExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
