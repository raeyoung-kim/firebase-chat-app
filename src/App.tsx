import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginPage, MainPage, RegisterPage } from 'src/pages';
import firebase from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'src/services/store/slice/user';

function App() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(getAuth(firebase), (user) => {
      if (user) {
        dispatch(setUser(user));
        navigate('/');
      } else {
        navigate('/login');
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
