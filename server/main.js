const express = require("express");
const app = express();
const db = require("./Database/db");
const userRoutes = require("./Routes/userRoutes");
const expenseRoutes=require('./Routes/expenseRoutes');
const port = process.env.PORT;
const cors = require('cors');
app.use(cors());


app.use("/user", userRoutes);
app.use("/expense",expenseRoutes);

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
