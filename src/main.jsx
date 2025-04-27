import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Feed from './Feed.jsx'
import Login from './Login.jsx'
import Logout from './Login.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);

