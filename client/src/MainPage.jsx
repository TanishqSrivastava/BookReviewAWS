import { React } from 'react';
import {useState} from 'react';

import Navbar from './components/Navbar';
import Card from './components/Card';

export default function MainPage(){
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        console.log('Search Query:', searchQuery);
    
     };

    return (
        <>
        <Navbar />
        <form onSubmit={handleSubmit} className="flex justify-center mt-6">
        <div className="flex items-center">
        <div>
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
        </div>
        </div>
      </form>
      <div className="grid grid-cols-4 mx-20 my-10 gap-2">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

      </div>
        </>
    )
}
