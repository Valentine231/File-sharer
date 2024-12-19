import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import FileCard from './FileCard'

const File = () => {
  const [files, setFiles] = useState([]); // State to hold uploaded files

  useEffect(() => {
    // Load uploaded files from localStorage
    const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    setFiles(uploadedFiles);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-2xl mb-4">Uploaded Files</h1>
        
        {files.length === 0 ? (
          <p className="mt-4">No files uploaded yet.</p>
        ) : (
          <FileCard files={files}  />
        )}
      </div>
    </>
  );
};

export default File;



// import React, { useEffect, useState } from 'react';
// import Navbar from './Navbar';

// const File = () => {
//   const [search, setSearch] = useState(localStorage.getItem('searchTerm') || ''); // Load the last search term from localStorage

//   useEffect(() => {
//     // Save the search term to localStorage whenever it changes
//     localStorage.setItem('searchTerm', search);
//   }, [search]);

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
//         <div className="w-full flex justify-center mt-6">
//           <input
//             type="search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search for a file..."
//             className="w-3/4 md:w-1/2 p-3 border border-blue-600 rounded-lg bg-gray-800 text-white"
//           />
//         </div>

//         {!search.trim() && <p className="mt-4">Please enter a search term to begin.</p>}
//         {search.trim() && (
//           <p className="mt-4">
//             You searched for "<span className="font-bold">{search}</span>", but there are no results to display.
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default File;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import FileCard from './FileCard';
// import Navbar from './Navbar';

// const File = () => {
//   const [search, setSearch] = useState('');
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!search.trim()) {
//       setFiles([]); // Clear results when search is empty
//       return;
//     }

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`/api/search?q=${encodeURIComponent(search)}`);
//         const data = response.data;
//         if(Array.isArray(data)){
//           setFiles(data);
//         }else if(data.docs){
//           setFiles(data.docs);
//         }else{
//           setFiles([]);
//         }
//         console.log(response.data);
//         console.log(files);
//       } catch (err) {
//         setError('Failed to fetch data. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [search]);

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
//         <div className="w-full flex justify-center mt-6">
//           <input
//             type="search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search for a book..."
//             className="w-3/4 md:w-1/2 p-3 border border-blue-600 rounded-lg bg-gray-800 text-white"
//           />
//         </div>

//         {!search.trim() && <p className="mt-4">Please enter a search term to begin.</p>}
//         {loading && <p className="mt-4">Loading...</p>}
//         {error && <p className="mt-4 text-red-500">{error}</p>}
//         {files.length === 0 && search.trim() && !loading && (
//           <p className="mt-4">No results found.</p>
//         )}

//         <div className="mt-8 w-full flex flex-col items-center">
//         {Array.isArray(files) &&
//             files.map((file) => <FileCard key={file.id} file={file} />)}
//         </div>
//       </div>
//     </>
//   );
// };

// export default File;
