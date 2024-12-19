import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const FileCard = ({ files }) => {
  const [search, setSearch] = useState('');

  // Filter files based on search input
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (filename, fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', filename); // Set the download attribute with the filename
    document.body.appendChild(link);
    link.click(); // Trigger the click to start the download
    document.body.removeChild(link); // Clean up the DOM
  };

  const handleDelete = (filename) => {
    if (window.confirm(`Are you sure you want to delete "${filename}"?`)) {
      // Notify parent to delete the file (if using external state management)
      alert(`${filename} has been deleted.`);
    }
  };

  return (
    <div className="p-5 bg-gray-900 text-white rounded-lg shadow-md w-full max-w-md mx-auto">
      {/* Search Bar */}
      <div className="flex items-center border border-gray-700 rounded-lg p-2 bg-gray-800 mb-4">
        <FaSearch size={20} color="gray" className="mr-2" />
        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none w-full text-white"
        />
      </div>

      {/* File List */}
      <ul>
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file, index) => (
            <li key={index} className="p-2 border-b border-gray-700">
              <div className="flex items-center">
                {file.type.startsWith('image/') && (
                  <img
                    src={URL.createObjectURL(new Blob([file]))}
                    alt={file.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                )}
                <div>
                  <div className="font-bold">{file.name}</div>
                  <div className="text-sm text-gray-400">{file.size} bytes</div>
                  <div className="flex mt-2 space-x-2">
                    <button
                      onClick={() =>
                        handleDownload(file.name, URL.createObjectURL(new Blob([file])))
                      }
                      className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(file.name)}
                      className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-400 text-center py-4">No files found.</li>
        )}
      </ul>
    </div>
  );
};

export default FileCard;
