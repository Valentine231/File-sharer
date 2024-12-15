import React, { useState, useEffect } from 'react';
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
  const [uppy] = useState(() =>
    new Uppy({
      debug: true,
      autoProceed: false,
    })
      .use(Webcam)
      .use(FileInput)
      .use(XHRUpload, {
        endpoint: '/api/upload', // Server endpoint
        fieldName: 'file',
        headers: {
          authorization: 'Bearer YOUR_TOKEN', // Optional authorization
        },
      })
      .use(GoogleDrive, { companionUrl: 'https://companion.uppy.io' })
      .use(Dropbox, { companionUrl: 'https://companion.uppy.io' })
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    uppy.on('upload', () => {
      uppy.setMeta({
        title,
        description,
      });
    });

    uppy.on('complete', () => {
      alert('Upload complete!');
      setTitle('');
      setDescription('');
    });
  }, [uppy, title, description]);

  const handleUpload = (e) => {
    e.preventDefault();
    uppy.upload().then((result) => {
      if (result.successful.length > 0) {
        alert('Upload successful!');
      } else {
        alert('Upload failed.');
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 text-white">
        <Dashboard uppy={uppy} showProgressDetails height={300} width="100%" />
        <form
          onSubmit={handleUpload}
          className="w-full max-w-md mt-6 flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-400"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-3 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 rounded hover:bg-blue-600 transition duration-300 text-white"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default Upload;
