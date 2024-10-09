// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { checkUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Auth.signIn(email, password);
      await checkUser();
      navigate('/');
    } catch (error) {
      console.error('Error signing in', error);
      alert('Error signing in: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Your login form */}
    </div>
  );
};

export default Login;
