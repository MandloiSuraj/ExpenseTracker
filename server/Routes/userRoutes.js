const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");

router.use(express.json());

// endpoint to show all the user
router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({ message: "User data", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// endpoint to create the users
router.post("/", async (req, res) => {
  try {
    const { username, password,email } = req.body;
    const newUser = new User({
      username,
      password,
      email
    });
    await newUser.save();
    res.status(200).json({ message: "User added Successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// endpoint to update the user

router.put("/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const { username, password } = req.body;
    const updateUser = await User.findByIdAndUpdate(userID, req.body, {
      new: true,
    });

    res.status(200).json({ message: "User Updated", updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// endpoint to delete the user
router.delete("/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const deleteUser = await User.findByIdAndDelete(userID);
    res.status(200).json({ message: "User Deleted", deleteUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;