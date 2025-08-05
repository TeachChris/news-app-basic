import React from 'react';

const NewsCard = ({ title, description, src, url }) => {
  const imageSrc = src || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR9Lh_buc23X3yplHs9RCh5sFsX7owiOifzw&s";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-[2px_-8px_8px_rgba(0,0,0,0.15),_-2px_8px_8px_rgba(0,0,0,0.15)] hover:scale-101 transition-all duration-500 ease-in-out">
      <img
        src={imageSrc}
        onError={(e) => { e.target.onerror = null; e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR9Lh_buc23X3yplHs9RCh5sFsX7owiOifzw&s"; }}
        alt="News article"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h5 className="text-lg font-bold mb-2 flex-grow">
          {title ? title.slice(0, 50) : "No Title Available"}...
        </h5>
        <p className="text-gray-700 text-sm mb-4">
          {description ? description.slice(0, 90) : "No description available for this article."}...
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-block bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;