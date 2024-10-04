// components/Card.jsx
import React from 'react';
import Tilt from 'react-parallax-tilt';
import { useNavigate } from 'react-router-dom';

export default function Card({ id, title, authors, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <Tilt glareEnable={false} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000}>
      <div
        onClick={handleClick}
        className="bg-white shadow-md rounded-md overflow-hidden w-36 mx-auto cursor-pointer"
      >
        <div className="w-32 h-48 mx-auto">
          <img src={image} alt={title} className="w-full h-full object-contain" />
        </div>
        <div className="p-2 text-center">
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-xs text-gray-600 mt-1">{authors}</p>
        </div>
      </div>
    </Tilt>
  );
}
