import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import SignUp from "./Components/signUp/signUp";
import Login from "./Components/Login/login";
import ExpenseDisplay from "./Components/ExpenseDisplay/ExpenseDisplay";



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/expense" element={<ExpenseDisplay/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;


