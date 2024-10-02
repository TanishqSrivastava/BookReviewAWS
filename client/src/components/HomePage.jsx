// src/components/HomePage.js
import React, { useState } from 'react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Search Query:', searchQuery);
    
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Book Review Site</h1>

      
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for books..."
          className="w-80 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-900 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default HomePage;
