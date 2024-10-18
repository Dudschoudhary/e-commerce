import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import Product from "../pages/Product";
import CartItems from "../pages/CartItems";
import mens from "../pages/categary/CategoryMenu";
import SearchProduct from "../pages/categary/SearchProduct";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: '/cart-items',
        Component: CartItems
      },
      {
        path: "/product/:productId",
        Component: Product,
      },
      {
        path: "/category/:categoryName",
        Component: mens
      },
      {
        path:"/search/:productName",
        Component: SearchProduct
      }
    ],
  },
]);

export default router;
