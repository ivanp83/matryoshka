import ReactDOM from "react-dom/client";
import "./index.css";
// import tranport from "./lib";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { About } from "./pages/about/About";
import Cart from "./pages/cart/Cart";
import ErrorPage from "./pages/error/ErrorPage";
import Root from "./components/Root";
import { AppProvider } from "../src/context/app.context";
import { Product, productLoader } from "./pages/product/Product";
import ErrorBoundary from "./components/ErrorBoundary";
import RequireAuth from "./components/hoc/RequireAuth";
import { Products } from "./pages/admin/products/Products";
import { Gallery, galleryLoader } from "./pages/gallery/Gallery";
import { Categories, categoriesLoader } from "./pages/categories/Categories";
import CategoriesMenu from "./pages/admin/nav/AdminSubNav";
import ProductsMenu from "./pages/admin/nav/AdminSubNav";
import AdminNav from "./pages/admin/nav/AdminNav";
import CreateCategory from "./pages/admin/categories/CreateCategory";
import {
  UpdateProduct,
  updateProductLoader,
} from "./pages/admin/products/UpdateProduct";
import {
  UpdateCategory,
  updateCategoryLoader,
} from "./pages/admin/categories/UpdateCategory";
import {
  CreateProduct,
  createProductLoader,
} from "./pages/admin/products/CreateProduct";
import { AdminCategories } from "./pages/admin/categories/Categories";
import { useEffect } from "react";

const dataNavCategories = [
  {
    title: "Создать",
    to: "/admin/create-category",
  },
  {
    title: "Редактировать",
    to: "/admin/available-categories",
  },
];
const dataNavProducts = [
  {
    title: "Создать",
    to: "/admin/create-product",
  },
  {
    title: "Редактировать",
    to: "/admin/available-products",
  },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Categories />} loader={categoriesLoader} />
      <Route path="products/:id" element={<Gallery />} loader={galleryLoader} />
      <Route path="product/:id" element={<Product />} loader={productLoader} />
      <Route path="about" element={<About />} />
      <Route path="cart" element={<Cart />} />
      <Route
        path="admin"
        element={
          <RequireAuth>
            <AdminNav />
          </RequireAuth>
        }
      />

      <Route
        path="admin/categories"
        element={
          <RequireAuth>
            <CategoriesMenu data={dataNavCategories} />
          </RequireAuth>
        }
      />

      <Route
        path="admin/available-categories"
        element={
          <RequireAuth>
            <AdminCategories />
          </RequireAuth>
        }
      />

      <Route
        path="admin/update-category/:id"
        element={
          <RequireAuth>
            <UpdateCategory />
          </RequireAuth>
        }
        loader={updateCategoryLoader}
      />

      <Route
        path="admin/products"
        element={
          <RequireAuth>
            <ProductsMenu data={dataNavProducts} />
          </RequireAuth>
        }
      />

      <Route
        path="admin/create-category"
        element={
          <RequireAuth>
            <CreateCategory />
          </RequireAuth>
        }
      />

      <Route
        path="admin/create-product"
        element={
          <RequireAuth>
            <CreateProduct />
          </RequireAuth>
        }
        loader={createProductLoader}
      />

      <Route
        path="admin/available-products"
        element={
          <RequireAuth>
            <Products />
          </RequireAuth>
        }
      />

      <Route
        path="admin/update-product/:id"
        element={
          <RequireAuth>
            <UpdateProduct />
          </RequireAuth>
        }
        loader={updateProductLoader}
      />

      <Route
        path="admin/products"
        element={
          <RequireAuth>
            <Products />
          </RequireAuth>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ErrorBoundary>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </ErrorBoundary>
);
