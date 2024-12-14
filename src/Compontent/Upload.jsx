import React, { useState, useEffect } from 'react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import XHRUpload from '@uppy/xhr-upload';
import { Dashboard } from '@uppy/react';
import FileInput from '@uppy/file-input';
import GoggleDrive from '@uppy/google-drive';
import Dropbox from '@uppy/dropbox';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import Navbar from './Navbar';

const Upload = () => {
  const [uppy] = useState(() =>
    new Uppy({
      debug: true,
      autoProceed: false, // Prevent auto-upload
    })
      .use(Webcam)
      .use(FileInput)
      .use(XHRUpload, {
        endpoint: 'https://your-server.com/upload', // Replace with your server endpoint
        fieldName: 'file', // Field name in the form data
        headers: {
          authorization: 'Bearer YOUR_TOKEN', // Optional, for authorization if needed
        },
      })
      .use(GoggleDrive, { 
        companionUrl: 'https://companion.uppy.io', // Replace with your Companion instance URL
      })
      .use(Dropbox, { 
        companionUrl: 'https://companion.uppy.io', // Replace with your Companion instance URL
      })
  );

  const [progress, setProgress] = useState(0);
  const [tile, setTile] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Listen for upload progress
    uppy.on('upload-progress', (file, progressData) => {
      const { percentage } = progressData;
      setProgress(percentage || 0); // Update progress state
    });

    uppy.on('upload', () => {
      uppy.setMeta({
        title: tile,
        description: description,
      });
    });

    uppy.on('complete', () => {
      alert('Upload complete!');
      setProgress(0); // Reset progress
    });

   
  }, [uppy,tile,description]);

  const handleUpload = (e) => {
    e.preventDefault();
    uppy.upload().then((result) => {
      if (result.successful.length > 0) {
        alert('Upload successful!');
      } else {
        alert('Upload failed');
      }
    });
  };

  return (
    <>
    <Navbar />

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Dashboard */}
      <Dashboard uppy={uppy} showProgressDetails={true} /> 

      {/* Form */}
      <form onSubmit={handleUpload}>
        <input type="text"
        placeholder='Title' 
        className='w-full  p-2  border-black rounded mt-4'
        value={tile} onChange={(e)=>setTile(e.target.value)} />
        <textarea name="" id="" 
        className='w-full  p-2  border-gray-300 rounded mt-4'
        placeholder='Description'
        value={description} onChange={(e)=>setDescription(e.target.value)} >description</textarea>
         <button
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        type='submit'
      >
        submit
      </button>
        </form>


    </div>
    </>
  );
};

export default Upload;





{/* 
      Progress Bar 
      <div className="w-full max-w-lg mt-4">
        <div className="h-4 w-full bg-gray-200 rounded">
          <div
            className="h-full bg-blue-500 rounded transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">
          {progress > 0 ? `Uploading: ${Math.round(progress)}%` : 'No uploads in progress'}
        </p>
      </div> */}

      {/* Custom Upload Button */}
      {/* <button
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleUpload}
      >
        Upload Files
      </button> */}



// import React, { useState } from 'react';
// import Uppy from '@uppy/core';
// import Webcam from '@uppy/webcam';
// import { Dashboard } from '@uppy/react';
// import ProgressBar from '@uppy/progress-bar';  // Add this import
// import FileInput from '@uppy/file-input'; // For using file input functionality

// import '@uppy/core/dist/style.min.css';
// import '@uppy/dashboard/dist/style.min.css';
// import '@uppy/webcam/dist/style.min.css';
// import '@uppy/progress-bar/dist/style.min.css'; // Add the CSS for ProgressBar

// const Upload = () => {
//   const [uppy] = useState(() => new Uppy().use(Webcam).use(ProgressBar).use(FileInput)); // Use FileInput plugin
  
//   const handleUpload = () => {
//     uppy.upload().then((result) => {
//       if (result.successful.length > 0) {
//         alert('Upload successful!');
//       } else {
//         alert('Upload failed');
//       }
//     });
//   };
//   return (
//     <div className=' flex items-center justify-center'>
//       <Dashboard uppy={uppy}  />
//       <div className="progress-bar-container mt-4 w-full max-w-lg"></div>
//       <button 
//          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       onClick={handleUpload}>Upload Files</button>
//     </div>
//   ) 
// };

// export default Upload;
