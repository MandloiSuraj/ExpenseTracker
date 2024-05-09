import React, { useState, useEffect } from "react";
import "./ExpenseDisplay.css";

function ExpenseDisplay() {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseValue, setExpenseValue] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const [users, setUsers] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState({});

  const [splitValue, setSplitValue] = useState(0);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/user");
      const userData = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      setUsers(userData.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:8000/expense");
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      setExpenses(data.Expenses);
      const totalAmount = data.Expenses.reduce(
        (acc, expense) => acc + expense.expenseValue,
        0
      );
      setTotalExpense(totalAmount);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expenseName,
          expenseValue,
          checkboxValues,
          
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create expense");
      }
      setSplitValue(expenseValue / 3);
      fetchExpenses();
      setExpenseName("");
      setExpenseValue("");
      
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };
  const handleCheckboxChange = (event) => {
    const { name, checked,value } = event.target;
    
    setCheckboxValues(prevState => ({
      ...prevState
    }));
  };

  

  useEffect(() => {
    fetchExpenses();
    fetchUsers();
  }, []);
  
  return (
    <div className="expense-container">
      <div className="expense-form">
        <h2>Create Expense</h2>
        <div>
          <label htmlFor="expenseName">Expense Name:</label>
          <input
            type="text"
            id="expenseName"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="expenseValue">Expense Value:</label>
          <input
            type="number"
            id="expenseValue"
            value={expenseValue}
            onChange={(e) => setExpenseValue(e.target.value)}
          />
        </div>
        <div>
          <h3>Select users for expense split:</h3>
          {users.map((elm, id) => (
            <div key={id}>
              <input
                type="checkbox"
                name="username"
                checked={checkboxValues[elm.username]}
                value={elm.username}
                onChange={handleCheckboxChange}
                
              />
              {elm.username}
            </div>
          ))}
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="expense-summary">
        <h2>Total Expense Value</h2>
        <p>${totalExpense.toFixed(2)}</p>
      </div>
      <div className="expense-list">
        <h2>All Expenses</h2>

        <table>
          <thead>
            <tr>
              <th>Expense Names</th>
              <th>Expense Values</th>
              <th>Date and Time</th>
              <th>usernames</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((elm, i) => (
              <tr key={i}>
                <td>{elm.expenseName}</td>
                <td>{elm.expenseValue}</td>
                <td>
                  {elm.createdAt.date} || {elm.createdAt.time}
                </td>
                {/* <td>{elm.checkboxValues} expense of {splitValue}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseDisplay;
