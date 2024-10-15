import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home";
import Product from "../pages/Product";
import CartItems from "../pages/CartItems";
import mens from "../pages/categary/mens";
import Jewelery from "../pages/categary/Jewellery";
import Electronics from "../pages/categary/Electronics";
import Women from "../pages/categary/Women";
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
        path: "/category/mens",
        Component: mens
      },
      {
        path: "/category/jewelery",
        Component: Jewelery
      },
      {
        path: "/category/electronics",
        Component: Electronics
      },
      {
        path: "/category/women",
        Component: Women
      },
      {
        path:"/search/:productName",
        Component: SearchProduct
      }
    ],
  },
]);

export default router;
