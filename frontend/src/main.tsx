
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Login from './Player-Web/pages/LoginPages/Login'
// import Register from './Player-Web/pages/LoginPages/Register'
// import AppPage from './Player-Web/pages/LoginPages/AppPage'
// import TeamPage from './Player-Web/pages/TeamPage'
// import './index.css'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />
//   },
//   {
//     path: "/app",
//     element: <AppPage />
//   },
//   {
//     path: "/team",
//     element: <TeamPage />
//   }
// ]);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// )



import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Host-Web/pages/LoginPages/Login'
import Register from './Host-Web/pages/LoginPages/Register'
import AppPage from './Host-Web/pages/LoginPages/AppPage'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/app",
    element: <AppPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


