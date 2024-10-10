// src/components/Register.jsx
import React, { useState, useContext } from 'react';
import { signUp, confirmAccount, signIn } from '../Auth';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
  });
  const [step, setStep] = useState(1); // Step 1: Sign Up, Step 2: Confirm
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password, confirmPassword } = formState;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await signUp(email, password);
      setStep(2);
    } catch (err) {
      console.error('Error signing up:', err);
      setError(err.message || 'Error signing up');
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError('');

    const { email, confirmationCode } = formState;

    try {
      await confirmAccount(email, confirmationCode);
      const result = await signIn(email, formState.password);
      setUser(result);
      navigate('/home');
    } catch (err) {
      console.error('Error confirming account:', err);
      setError(err.message || 'Error confirming account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Confirm Account</h2>
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleConfirm}>
              <div className="mb-4">
                <label
                  htmlFor="confirmationCode"
                  className="block text-gray-700 mb-2"
                >
                  Confirmation Code
                </label>
                <input
                  type="text"
                  name="confirmationCode"
                  id="confirmationCode"
                  value={formState.confirmationCode}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the code sent to your email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Confirm
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Didn't receive a code?{' '}
              <button
                onClick={() => setStep(1)}
                className="text-blue-500 hover:underline"
              >
                Resend Code
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
