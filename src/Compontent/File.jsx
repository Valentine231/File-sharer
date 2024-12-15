import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileCard from './FileCard';
import Navbar from './Navbar';

const File = () => {
  const [search, setSearch] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!search.trim()) {
      setFiles([]); // Clear results when search is empty
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/search?q=${encodeURIComponent(search)}`);
        setFiles(response.data.docs);
      } catch (err) {
        console.error('Error fetching data:', err.message);
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="w-full flex justify-center mt-6">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a book..."
            className="w-3/4 md:w-1/2 p-3 border border-blue-600 rounded-lg bg-gray-800 text-white"
          />
        </div>

        {loading && <p className="mt-4">Loading...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {!loading && !error && files.length === 0 && search && (
          <p className="mt-4">No results found.</p>
        )}

        <div className="mt-8 w-full flex flex-col items-center">
          {files.map((file) => (
            <FileCard key={file.key} file={file} />
          ))}
        </div>
      </div>
    </>
  );
};

export default File;
