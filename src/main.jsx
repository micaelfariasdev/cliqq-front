import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Feed from './Feed.jsx'
import Login from './Login.jsx'
import Logout from './Login.jsx'
import Perfil from './Perfil.jsx'
import PhotoDetail from './PhotoDetail.jsx'
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
  },
  {
    path: "/:username",
    element: <Perfil />,
  },
  {
    path: "/:username/photo/:photoId",
    element: <PhotoDetail />,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);

