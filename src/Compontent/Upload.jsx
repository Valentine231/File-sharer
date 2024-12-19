import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import XHRUpload from '@uppy/xhr-upload';
import { Dashboard } from '@uppy/react';
import FileInput from '@uppy/file-input';
import GoogleDrive from '@uppy/google-drive';
import Dropbox from '@uppy/dropbox';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import Navbar from './Navbar';

const Upload = () => {
  const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();


  const [uppy] = useState(() =>
    new Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 10485760, // 10 MB
        allowedFileTypes: ['image/*', 'video/*'],
        maxNumberOfFiles: 3,
      },
    })
      .use(Webcam)
      .use(FileInput)
      .use(XHRUpload, {
        endpoint: 'http://localhost:3000/api/upload', // Server endpoint
        fieldName: 'file',
        headers: {
          authorization: `Bearer ${localStorage.getItem('authToken')}`, // Optional authorization
        },
      })
      .use(GoogleDrive, { companionUrl: 'https://companion.uppy.io' })
      .use(Dropbox, { companionUrl: 'https://companion.uppy.io' })
  );



  useEffect(() => {
    uppy.on('upload', () => {
      uppy.setMeta({
        title,
        description,
      });
    });

    uppy.on('complete', (result) => {
      alert('Upload complete!');
      setTitle('');
      setDescription('');

      // Save uploaded files to localStorage
      const uploadedFiles = result.successful.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        // Add any other properties you want to store
      }));

      // Get existing files from localStorage
      const existingFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

      // Combine existing files with newly uploaded files
      const allFiles = [...existingFiles, ...uploadedFiles];

      // Save back to localStorage
      localStorage.setItem('uploadedFiles', JSON.stringify(allFiles));

      // Navigate to the file page
      navigate('/file');
    });
  }, [uppy, title, description, navigate]);

  const handleUpload = (e) => {
    e.preventDefault();
    uppy.upload().then((uploadResult) => {
      if (uploadResult.successful && uploadResult.successful.length > 0) {
        alert('Upload successful!');
      } else {
        alert('Upload failed.');
      }
    }).catch((err) => {
      console.error('Upload error:', err);
      alert('An error occurred during the upload.');
    });
  };
  

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 text-white">
        <div className="w-full max-w-4xl md:w-1/2">
          {/* Dashboard Component */}
          <Dashboard 
            uppy={uppy} 
            showProgressDetails 
            height={300} 
           
          />

          {/* Form Section */}
          <form
            onSubmit={handleUpload}
            className="w-full flex flex-col gap-6 p-4 bg-gray-800 shadow-lg rounded-md"
          >
            {/* Title Input */}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring focus:ring-blue-500"
            />

            {/* Description Input */}
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring focus:ring-blue-500"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700 transition duration-300 text-white text-center"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;
