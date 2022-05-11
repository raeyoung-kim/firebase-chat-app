import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { LoginPage, MainPage } from 'src/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
