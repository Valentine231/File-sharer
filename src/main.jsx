import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Compontent/Home.jsx'
import Upload from './Compontent/Upload.jsx'
import File from './Compontent/File.jsx'  



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/upload',
    element: <Upload />
  },
  {
    path: '/file',
    element: <File />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
