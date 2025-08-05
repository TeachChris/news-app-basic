import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';

const NewsBoard = ({ category, searchTerm }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!apiKey) throw new Error("API key is missing.");
        
        const baseUrl = 'https://newsapi.org/v2/';
        const endpoint = searchTerm ? 'everything' : 'top-headlines';
        const queryParam = searchTerm ? `q="${searchTerm}"` : `category=${category}`;
        
        const url = `${baseUrl}${endpoint}?${queryParam}&sortBy=publishedAt&pageSize=100&language=en&apiKey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
          throw new Error(errorData.message || `An error occurred: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.status === "error") throw new Error(data.message);
        
        setArticles(data.articles);
        console.log("Fetched articles:", data.articles);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, searchTerm]);

  const heading = searchTerm
    ? `Search Results for "${searchTerm}"`
    : category
    ? `Top ${category.charAt(0).toUpperCase() + category.slice(1)} News`
    : "Latest News";

  return (
    <div className="pt-20 px-4 md:px-8">
      <h2 className="text-center text-3xl font-bold mb-8">
        {heading.split(" ").map((word, i) =>
          word.toLowerCase() === "news" ? (
            <span key={i} className="bg-red-500 text-white px-2 rounded">{word}</span>
          ) : (
            <span key={i} className="mx-1">{word}</span>
          )
        )}
      </h2>
      {loading && <p className="text-center">Loading news...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.map((news, index) => (
            <NewsCard
              key={index}
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsBoard;
