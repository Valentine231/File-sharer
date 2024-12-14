import React from 'react'
import Navbar from './Navbar'

const Home = () => {
  return (
    <>
    <div><Navbar /></div>
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <header className="w-full bg-blue-800 py-6 shadow-lg">
        <h1 className="text-center text-white text-3xl font-bold">FileShare</h1>
      </header>
      <main className="flex flex-col items-center text-center px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Seamless File Sharing, Anytime, Anywhere
        </h2>
        <p className="text-gray-600 mb-6">
          FileShare makes sharing your files quick, secure, and hassle-free. Whether it’s documents, images, or videos, send them across devices effortlessly.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Secure Transfers</h3>
            <p className="text-sm text-gray-600">
              Your files are encrypted to ensure safe and private sharing.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Cross-Platform</h3>
            <p className="text-sm text-gray-600">
              Share files between mobile, desktop, and web devices seamlessly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Fast Sharing</h3>
            <p className="text-sm text-gray-600">
              Transfer files quickly with no size restrictions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-blue-800 mb-2">User-Friendly</h3>
            <p className="text-sm text-gray-600">
              An intuitive interface that simplifies the sharing experience.
            </p>
          </div>
        </div>
      </main>
      </div>
      </>
  )
}

export default Home