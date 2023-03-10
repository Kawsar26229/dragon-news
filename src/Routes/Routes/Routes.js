import { createBrowserRouter } from 'react-router-dom';
import Main from '../../layout/Main';
import Category from '../../Pages/Category/Category/Category';
import Home from '../../Pages/Home/Home';
import Login from '../../Pages/Login/Login/Login';
import Register from '../../Pages/Login/Register/Register';
import News from '../../Pages/News/News/News';
import Profile from '../../Pages/Others/Profile/Profile';
import TermsAndConditions from '../../Pages/Others/TermsAndConditions/TermsAndConditions';
import PrivateRouter from '../Private/PrivateRouter';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => {
          return fetch('http://localhost:5000/news');
        },
      },
      {
        path: '/category/:id',
        element: <Category></Category>,
        loader: ({ params }) => {
          return fetch(`http://localhost:5000/category/${params.id}`);
        },
      },
      {
        path: '/news/:id',
        element: (
          <PrivateRouter>
            <News></News>
          </PrivateRouter>
        ),
        loader: ({ params }) => {
          return fetch(`http://localhost:5000/news/${params.id}`);
        },
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/terms',
        element: <TermsAndConditions></TermsAndConditions>
      }, 
      {
        path: '/profile',
        element: <PrivateRouter>
            <Profile></Profile>
        </PrivateRouter>
      }
    ],
  },
]);
