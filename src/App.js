import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { action as authAction } from "./components/auth/AuthForm";
import { action as addCategoryAction } from "./components/admin/AddCategory";
import { action as addProductAction} from "./components/admin/AddProduct";

import { loader as adminLoader } from "./components/admin/AdminRoot";
import { loader as productLoader } from "./components/admin/AddProduct";

import Root from "./components/Root";
import AuthForm from "./components/auth/AuthForm";
import Home from "./components/Home";
import AddProduct from "./components/admin/AddProduct";
import AdminRoot from "./components/admin/AdminRoot";
import AddCategory from "./components/admin/AddCategory";

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
            path: "add-product",
            element: <AddProduct />,
            loader: productLoader,
            action: addProductAction,
          },
          {
            path: "add-category",
            element: <AddCategory />,
            action: addCategoryAction,
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
