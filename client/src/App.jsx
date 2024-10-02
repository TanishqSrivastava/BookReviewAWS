import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Book from './components/Book';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import './styles.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import MainPage from './MainPage';


export default function App() {
  return (
    <MainPage />
  );
}

;
