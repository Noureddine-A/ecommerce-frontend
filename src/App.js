import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { action as authAction } from "./components/auth/AuthForm.tsx";
import { action as productAction } from "./components/admin/AddProduct.tsx";

import Root from "./components/Root.tsx";
import AuthForm from "./components/auth/AuthForm.tsx";
import Home from "./components/Home.tsx";
import AddProduct from "./components/admin/AddProduct.tsx";
import AdminRoot from "./components/admin/AdminRoot.tsx";

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
        children: [
          {
            index: true,
            path: "add-product",
            element: <AddProduct />,
            action: productAction,
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
