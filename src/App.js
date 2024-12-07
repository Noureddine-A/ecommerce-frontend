import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { action as authAction } from "./components/auth/AuthForm.tsx";
import { action as productAction } from "./components/admin/AddProduct.tsx";

import { loader as latestCollectionLoader } from "./components/Home.tsx";
import { loader as collectionLoader } from "./components/product/collection/Collections.tsx";

import Root from "./components/Root.tsx";
import AuthForm from "./components/auth/AuthForm.tsx";
import Home from "./components/Home.tsx";
import AddProduct from "./components/admin/AddProduct.tsx";
import AdminRoot from "./components/admin/AdminRoot.tsx";
import ProductDetail from "./components/product/ProductDetail.tsx";
import Collections from "./components/product/collection/Collections.tsx";
import Cart from "./components/cart/Cart.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: latestCollectionLoader,
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
        path: "/collection",
        element: <Collections />,
        loader: collectionLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
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
      {
        path: "/product/:productId",
        element: <ProductDetail />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
