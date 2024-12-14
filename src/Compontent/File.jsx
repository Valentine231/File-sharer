import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileCard from './FileCard';
import Navbar from './Navbar'

const File = () => {
  const [search, setSearch] = useState('');
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search === '') {
      setFile([]); // Clear results if the search input is empty
      return;
    }

    const fetchData = async () => {
      setLoading(true); // Show loading indicator
      setError(null); // Clear previous errors
      try {
        const response = await axios.get(
          `http://localhost:5000/api/search?q=${search}`
        );
        setFile(response.data.docs);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchData();
  }, [search]);

  return (
    <>
    <Navbar />

    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="w-full flex justify-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a book..."
          className="w-1/2 p-2 border border-blue-600 rounded-lg bg-gray-800 text-white"
        />
      </div>

      {loading && <p className="mt-4">Loading...</p>} {/* Show loading message */}
      {error && <p className="mt-4 text-red-500">{error}</p>} {/* Show error message */}
      {!loading && !error && file.length === 0 && search && <p className="mt-4">No results found</p>} {/* No results */}
      
      <div className="mt-8 w-full flex flex-col items-center">
        {file.map((file) => (
          <FileCard key={file.key} file={file} />
        ))}
      </div>
    </div>
    </>
  );
};

export default File;
