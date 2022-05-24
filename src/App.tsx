import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginPage, MainPage, RegisterPage } from 'src/pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
