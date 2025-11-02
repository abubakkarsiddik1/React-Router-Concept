import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './components/Root/Root.jsx'
import Home from './components/Home/Home.jsx'
import Mobiles from './components/Mobiles/Mobiles.jsx'
import Leptops from './components/Laptops/Leptops.jsx'
import React from 'react'
import Users from './components/Users/Users.jsx'
import Users2 from './components/Users2/Users2.jsx'
import UserDetails from './components/UserDetails/UserDetails.jsx'
import Posts from './components/Posts/Posts.jsx'
import PostDetail from './components/PostDetail/PostDetail.jsx'

const usersPromse = fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home},
      { path: 'mobiles', Component: Mobiles},
      { path: 'leptops', Component: Leptops},
      { 
        path: 'users', 
        loader: () => fetch('https://jsonplaceholder.typicode.com/users'),
        Component: Users
      },
      { 
        path: 'users2', 
        element: <Suspense fallback={<span>Loading...</span>}>
          <Users2 usersPromse={usersPromse}></Users2>
        </Suspense>
      },
      {
        path: 'users/:userId',
       loader: ({params}) => fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`),
        Component: UserDetails
      },
      {
        path: 'posts',
        loader: () => fetch(`https://jsonplaceholder.typicode.com/posts`),
        Component: Posts
      },
      {
        // Dainamic path
        path: 'posts/:postsId',
        // path Dainamic korle loader: e {params} use korte parbo
        loader: ({params}) => fetch(`https://jsonplaceholder.typicode.com/posts/${params.postsId}`),
        Component: PostDetail
      }
    ]
  },
  {
    path: "about",
    element: <div>About here</div>
  },
  {
    path: "Blogs",
    element: <div>All My Blogs are Here</div>
  },
  {
    path: "app",
    Component: App
  },
  {
    path: "/app2",
    element: <App></App>
  },
      {
        path: '*',
        element: <h3>Not Found: 404 Status</h3> 
      }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterProvider router={router}></RouterProvider>
    
  </StrictMode>
)
