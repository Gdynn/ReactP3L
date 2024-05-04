import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserLayout from "../layouts/UserLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import Profile from "../pages/ProfilePage";
import ProtectedRoutes from "./ProtectedRoutes";
import TopNavbar from "../components/TopNavbar";
import AdminLayout from "../layouts/AdminLayout";

import Footer from "../components/footer";

import AdminShowUser from "../pages/admin/user/showDataUser";
import AdminCreateUser from "../pages/admin/user/createUserPage";
import AdminUpdateUser from "../pages/admin/user/updateUserPage";

import ShowDataResep from "../pages/admin/resep/showDataResep";
import UpdateDataResep from "../pages/admin/resep/updateDataResep";
import CreateDataResep from "../pages/admin/resep/createDataResep";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },

  {
    children: [
      {
        path: "/",
        element: (
          <div className="">
            <TopNavbar />
            <DashboardPage />
            <Footer></Footer>
          </div>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      // {
      //   path: "/about",
      //   element: (
      //     <div className="">
      //       <TopNavbar />
      //       <About />
      //       <Footer></Footer>
      //     </div>
      //   ),
      // },
      // {
      //   path: "/ourteam",
      //   element: (
      //     <div className="">
      //       <TopNavbar />
      //       <OurTeam />
      //       <Footer></Footer>
      //     </div>
      //   ),
      // },
    ],
  },

  {
    path: "/user",
    element: (
      <ProtectedRoutes>
        <UserLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/user",
        element: <DashboardPage />,
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
      // {
      //   path: "/user/wallet",
      //   element: <Wallet />,
      // },
      // {
      //   path: "/user/payment",
      //   element: <Payment />,
      // },
      // {
      //   path: "/user/order",
      //   element: <Order />,
      // },
      // {
      //   path: "/user/history",
      //   element: <History />,
      // },
      // {
      //   path: "/user/test",
      //   element: <tampilImage/>
      // }
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoutes>
        <AdminLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/admin",
        element: <AdminShowUser />,
      },
      {
        path: "/admin/showDataUser",
        element: <AdminShowUser />,
      },
      {
        path: "/admin/showDataResep",
        element: <ShowDataResep />,
      },
      {
        path: "/admin/CreateDataResep",
        element: <CreateDataResep />,
      },
      {
        path: "/admin/UpdateDataResep",
        element: <UpdateDataResep />,
      },
    ],
  },
]);
const AppRouter = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RouterProvider router={router} />
    </>
  );
};
export default AppRouter;
