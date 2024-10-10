// src/components/HomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home', { state: { query: searchQuery } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Book Review Site</h1>
      <form onSubmit={handleSubmit} className="flex mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for books..."
          className="w-80 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default HomePage;
