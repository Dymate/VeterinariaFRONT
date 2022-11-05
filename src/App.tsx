import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFound } from './views/NotFound/NotFound';
import { AuthLayout, DashboardLayout, RootLayout } from './Layouts';
import { Dashboard, Login, Register, Profile } from './Components';
import { PetResume } from './Components/PetResume';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          {
            path: '/',
            element: <Dashboard />
          },
          {
            path: '/profile',
            element: <Profile />
          },
          {
            path: '/pet/:id',
            element: <PetResume />
          }
        ]
      },
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <Login />
          },
          {
            path: '/registro',
            element: <Register />
          }
        ]
      }
    ]
  }
]);

export const App: React.FC = () => <RouterProvider router={router} />;
