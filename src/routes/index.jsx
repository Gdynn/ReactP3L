import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserLayout from "../layouts/UserLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import Profile from "../pages/ProfilePage";
import ProtectedRoutes from "./ProtectedRoutes";
import Wallet from "../pages/WalletPage";
import TopNavbar from "../components/TopNavbar";
import Payment from "../pages/transaksiLaundry/PaymentPage";
import Order from "../pages/transaksiLaundry/OrderPage";
import History from "../pages/HistoryPage";
import OurTeam from "../pages/greeting/OurTeamPage";
import About from "../pages/greeting/AboutPage";
import AdminLayout from "../layouts/AdminLayout";

import Footer from "../components/footer";

import AdminShowUser from "../pages/admin/user/showDataUser";
import AdminCreateUser from "../pages/admin/user/createUserPage";
import AdminUpdateUser from "../pages/admin/user/updateUserPage";

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
      {
        path: "/about",
        element: (
          <div className="">
            <TopNavbar />
            <About />
            <Footer></Footer>
          </div>
        ),
      },
      {
        path: "/ourteam",
        element: (
          <div className="">
            <TopNavbar />
            <OurTeam />
            <Footer></Footer>
          </div>
        ),
      },
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
      {
        path: "/user/wallet",
        element: <Wallet />,
      },
      {
        path: "/user/payment",
        element: <Payment />,
      },
      {
        path: "/user/order",
        element: <Order />,
      },
      {
        path: "/user/history",
        element: <History />,
      },
      {
        path: "/user/test",
        element: <tampilImage/>
      }
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
