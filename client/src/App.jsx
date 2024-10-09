// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import BookDetail from './BookDetail';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
