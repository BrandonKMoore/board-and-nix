import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProductBrowsePage from '../components/ProductBrowsePage';
import LandingPage from '../components/LandingPage';
import ProductPage from '../components/ProductPage';
import AdminPage from '../components/AdminPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductBrowsePage />,
          },
          {
            path: ":productId",
            element: <ProductPage />
          },
        ]
      },
      {
        path: "admin",
        element: <AdminPage />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
