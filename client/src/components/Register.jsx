// src/components/Register.jsx
import React, { useState, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { checkUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: Registration, 1: Confirmation
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    code: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await Auth.signUp({
        username: formData.email,
        password: formData.password,
        attributes: {
          email: formData.email,
        },
      });
      setStep(1);
    } catch (error) {
      console.error('Error registering', error);
      alert('Error registering: ' + error.message);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(formData.email, formData.code);
      await Auth.signIn(formData.email, formData.password);
      await checkUser();
      navigate('/');
    } catch (error) {
      console.error('Error confirming registration', error);
      alert('Error confirming registration: ' + error.message);
    }
  };

  return (
    <div className="register-container">
      {/* Your registration form */}
    </div>
  );
};

export default Register;
