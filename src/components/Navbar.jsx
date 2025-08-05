import React, { useState } from 'react';

const Navbar = ({ setCategory, setSearchTerm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleCategoryClick = (category) => {
    setCategory(category);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchTerm(searchInput.trim());
      setCategory("");
      setIsOpen(false);
    }
  };

  const categories = [
    { name: 'Technology', value: 'technology' },
    { name: 'Business', value: 'business' },
    { name: 'Health', value: 'health' },
    { name: 'Science', value: 'science' },
    { name: 'Sports', value: 'sports' },
    { name: 'Entertainment', value: 'entertainment' },
  ];

  return (
    <>
      <div className='fixed top-0 left-0 w-full bg-gray-100 shadow-md z-20'>
        <nav className='px-4 py-2 flex justify-between items-center'>
          <h2 className="text-xl font-bold cursor-pointer" onClick={() => handleCategoryClick('general')}>
            News
          </h2>
          <div className="hidden md:flex items-center space-x-6">
            <ul className='flex space-x-4'>
              {categories.map((cat) => (
                <li key={cat.value} className="cursor-pointer hover:text-gray-500" onClick={() => handleCategoryClick(cat.value)}>
                  {cat.name}
                </li>
              ))}
            </ul>
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search..."
                className="border px-2 py-1 rounded"
              />
              <button type="submit" className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go
              </button>
            </form>
          </div>

          <div className='md:hidden cursor-pointer'>
            <button onClick={toggleSidebar}>
              <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`fixed inset-0 bg-white/30 bg-opacity-50 z-30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-4 py-2 flex justify-end">
          <button onClick={toggleSidebar}>
            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSearch} className="px-4 mb-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
            className="w-full border px-2 py-1 rounded"
          />
          <button type="submit" className="w-full mt-2 bg-blue-500 text-white py-1 rounded hover:bg-blue-600">
            Search
          </button>
        </form>
        <ul className='flex flex-col items-start p-4 space-y-4'>
          {categories.map((cat) => (
            <li key={cat.value} className="cursor-pointer hover:text-gray-500 w-full" onClick={() => handleCategoryClick(cat.value)}>
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
