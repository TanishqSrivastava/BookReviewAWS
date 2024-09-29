import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Book from './components/Book';
import './styles.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    // Fetch book data from Google Books API
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data.items) {
        // Extract titles of the first two books
        const results = data.items.slice(0, 2).map((item) => item.volumeInfo.title);
        setSearchResults(results);
      } else {
        setSearchResults(['No results found', '']);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults(['Error fetching data', '']);
    }
  };

  return (
    <div className="container">
      <h1>📚 Book Review Site</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          {/* OrbitControls allow the user to rotate the scene */}
          <OrbitControls enableZoom={false} />
          {/* Ambient and Point Lights */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {/* 3D Book */}
          <Book searchResults={searchResults} />
        </Canvas>
      </div>
    </div>
  );
};

export default App;
