// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import App from './App.jsx';
import awsconfig from './awsconfig';
import './index.css';
import '@aws-amplify/ui-react/styles.css';

// Configure Amplify with your AWS configurations
Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      
        <App signOut={signOut} user={user} />
      
    
  </React.StrictMode>
);
