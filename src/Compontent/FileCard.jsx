import React from 'react';

const FileCard = ({ file }) => {

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
        <button className='bg-green-500 rounded-lg p-2'>Download</button>
        <button className='bg-red-500 rounded-lg p-2'>Delete</button>
        </div>
       
      </ul>
    </div>
  );
};

export default FileCard;

