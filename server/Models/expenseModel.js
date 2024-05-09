const mongoose = require("mongoose");

const userExpenseSchema = new mongoose.Schema({
  expenseName: {
    type: String,
    required: true,
  },
  expenseValue: {
    type: Number,
    required: true,
  },
  checkboxValues:{
    type: {},
    required:true
  },
  createdAt: {
    type: {
      date: {
        type: String,
        required: true,
        default: function () {
          const currentDate = new Date();
          return currentDate.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          });
        },
      },
      time: {
        type: String,
        required: true,
        default: function () {
          const currentDate = new Date();
          const formattedTime = currentDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return `${formattedTime}`;
        },
      },
    },
    default: {},
  },
});

userExpenseSchema.pre("save", function (next) {
  console.log("UserExpense is ready to add");
  next();
});

userExpenseSchema.post("save", function () {
  console.log("UserExpense added Successfully");
});

const Expense = mongoose.model("Expense", userExpenseSchema);

module.exports = Expense;
