// src/MainPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { useLocation } from 'react-router-dom';

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const location = useLocation();

  
  useEffect(() => {
    if (location.state?.query) {
      setSearchQuery(location.state.query);
      
      performSearch(location.state.query);
    }
  }, [location.state]);

  
  const performSearch = async (query) => {
    if (!query) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/books?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setBooks([]);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchQuery) {
      alert('Please enter a search term!');
      return;
    }

    performSearch(searchQuery);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit} className="flex justify-center mt-6">
        <div className="flex items-center">
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
        </div>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mx-20 my-10">
        {books.length > 0 ? (
          books.slice(0, 17).map((book) => (
            <Card
              key={book.id}
              id={book.id}
              title={book.title || 'No Title Available'}
              authors={book.authors ? book.authors.join(', ') : 'Unknown Author'}
              image={
                book.thumbnail
                  ? book.thumbnail
                  : 'https://via.placeholder.com/128x192?text=No+Image'
              }
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No books found.
          </div>
        )}
      </div>
    </>
  );
}
