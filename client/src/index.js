import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostList from 'pages/postPage/PostList';
import PostCreate from 'pages/postPage/PostCreate';
import PostRead from 'pages/postPage/PostRead';
import PostUpdate from 'pages/postPage/PostUpdate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <p>Not Found 😣</p>,
    children: [
      { index: true, element: <PostList /> },
      { path: '/posts/new', element: <PostCreate /> },
      { path: '/posts/:id', element: <PostRead /> },
      { path: '/posts/:id/edit', element: <PostUpdate /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
