import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingSpinner from 'components/LoadingSpinner';
import PostList from 'pages/postPage/PostList';
import NotFound from 'pages/NotFound';

const PostCreate = lazy(() => import('pages/postPage/PostCreate'));
const PostRead = lazy(() => import('pages/postPage/PostRead'));
const PostUpdate = lazy(() => import('pages/postPage/PostUpdate'));
const Search = lazy(() => import('pages/search/Search'));
const Tags = lazy(() => import('pages/search/Tags'));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <PostList /> },
      { path: '/posts/new', element: <PostCreate /> },
      { path: '/posts/:id', element: <PostRead /> },
      { path: '/posts/:id/edit', element: <PostUpdate /> },
      { path: '/search', element: <Search /> },
      { path: '/tags/:tag', element: <Tags /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>,
);
