
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    
    const fetchBook = async () => {
      try { 
        const response = await fetch(`http://localhost:8000/api/book/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-10">Loading...</div>
      </>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    console.log('Review submitted:', reviewText, rating);
    
    setShowReviewPopup(false);
    setReviewText('');
    setRating(1);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 flex">
        <div className="w-1/3">
          <img
            src={book.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image'}
            alt={book.title}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-2/3 pl-10">
          <h1 className="text-4xl font-bold">{book.title || 'No Title Available'}</h1>
          <p className="text-2xl mt-4">
            By {book.authors ? book.authors.join(', ') : 'Unknown Author'}
          </p>
          <p className="text-lg mt-2">Published: {book.publishedDate || 'Unknown'}</p>
          <p className="text-base mt-6">{book.description || 'No description available.'}</p>

          
          <div className="flex justify-between mt-10">
            <button className="px-4 py-2 bg-gray-500 text-white rounded">Left Button</button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setShowReviewPopup(true)}
            >
              Write a Review
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded">Right Button</button>
          </div>
        </div>
      </div>

      
      {showReviewPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md relative w-1/2">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowReviewPopup(false)}
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="5"
                  placeholder="Write your review here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="mr-2">Rating:</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
