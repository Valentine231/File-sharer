import React from 'react';

const FileCard = ({ file }) => {
  const handleDownload = (fileType) => {
    // Assuming the API provides formats like PDF or ePub in the `formats` field
    const downloadLink = file.formats ? file.formats[fileType] : null;
    if (downloadLink) {
      // Create a temporary anchor tag to trigger the download
      const link = document.createElement('a');
      link.href = downloadLink;
      link.setAttribute('download', file.title); // Use the book's title as the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up
    } else {
      alert(`Download link not available for ${fileType}`);
    }
  };

  const handleDelete = () => {
    alert(`Deleted: ${file.title}`);
    // Logic to handle file deletion can go here
  };

  return (
    <div className=" border border-blue-800 p-5 bg-gray-900 text-white rounded-lg shadow-md w-full max-w-md mx-auto mb-4">
      <ul className="list-none">
        <li className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300">
          <strong className="text-lg text-blue-400">{file.title}</strong>
          <br />
          <span className="text-sm text-gray-300">
            Author(s): {file.author_name ? file.author_name.join(', ') : 'Unknown author'}
          </span>
        
        </li>
        <div className='flex flex-row gap-4 mt-2'>
        {file.formats && file.formats['application/pdf'] && (
            <button
              className='bg-green-500 rounded-lg p-2'
              onClick={() => handleDownload('application/pdf')}
            >
              Download PDF
            </button>
          )}

{file.formats && file.formats['application/epub+zip'] && (
            <button
              className='bg-blue-500 rounded-lg p-2'
              onClick={() => handleDownload('application/epub+zip')}
            >
              Download ePub
            </button>
          )}
          
        <button onClick={handleDelete} className='bg-red-500 rounded-lg p-2'>Delete</button>
        </div>
       
      </ul>
    </div>
  );
};

export default FileCard;

