// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import HomePage from './components/HomePage';
import MainPage from './MainPage';
import BookDetail from './BookDetail';

Amplify.configure(awsExports);

function App() {
  return (
    <Router>
      <Authenticator>
        {({ signOut, user }) => (
          <>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<MainPage />} />
              <Route path="/book/:id" element={<BookDetail />} />
            </Routes>
            <button onClick={signOut}>Sign Out</button>
          </>
        )}
      </Authenticator>
    </Router>
  );
}

export default App;
