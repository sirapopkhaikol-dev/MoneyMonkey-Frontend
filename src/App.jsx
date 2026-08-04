import React from 'react';
import { Navbar } from './Navbar';
import './App.css';  
import { Route, Routes } from 'react-router-dom';
import { InflationPre, InflationCal, IncomeExpense, User, MonkeyMoney,Login,Register } from './Pages';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        
        <Route path="/" element={<MonkeyMoney />} />
        <Route path="/InflationCal" element={<InflationCal />} /> 
        <Route path="/InflationPre" element={<InflationPre />} />
        <Route path="/IncomeExpense" element={<IncomeExpense />} />
        <Route path="/User" element={<User />} /> 
        <Route path="/Home" element={<MonkeyMoney />} /> 
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register />} /> 
      </Routes>
    </div>    
  );
}

export default App;
