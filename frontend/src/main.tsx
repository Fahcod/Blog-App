import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import BlogContextProvider from './context/BlogContext.tsx';
import DetailsPage from './pages/DetailsPage.tsx';
import CreatePage from './pages/CreatePage.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';


const router = createBrowserRouter([
{
  path:'/',
  element:<HomePage/>
},{
  path:'/blog/:blogId',
  element:<DetailsPage/>
},{
  path:'/create',
  element:<CreatePage/>
},{
  path:'/signup',
  element:<Signup/>
},{
  path:'/login',
  element:<Login/>
},{
  path:'/me',
  element:<Profile/>
}
]);

createRoot(document.getElementById('root')!).render(
 <Provider store={store}>
 <BlogContextProvider>
 <RouterProvider router={router}>
 </RouterProvider>
 </BlogContextProvider>
 </Provider>
)
