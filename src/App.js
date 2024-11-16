import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { action as authAction } from "./components/auth/AuthForm";

import Root from "./components/Root";
import AuthForm from "./components/auth/AuthForm";
import Home from "./components/Home";
import AddProduct from "./components/admin/AddProduct";
import AdminRoot from "./components/admin/AdminRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: <AuthForm />,
        action: authAction,
      },
      {
        path: "/login",
        element: <AuthForm />,
        action: authAction,
      },
      {
        path: "/admin",
        element: <AdminRoot />,
        loader: adminLoader,
        children: [
          {
            index: true,
            path: "add-product",
            element: <AddProduct />,
            loader: productLoader,
            action: addProductAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
