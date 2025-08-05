import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NewsBoard from './components/NewsBoard';

const App = () => {
  const [category, setCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <Navbar setCategory={setCategory} setSearchTerm={setSearchTerm} />
      <NewsBoard category={category} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
