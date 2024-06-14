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
import MOLayout from "../layouts/MOLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import Order from "../pages/transaksi/Order";
import Pembayaran from "../pages/transaksi/Pembayaran";
import History from "../pages/transaksi/HistoryPemesanan";
import Footer from "../components/footer";
import AdminShowUser from "../pages/admin/user/showDataUser";
import AdminCreateUser from "../pages/admin/user/createUserPage";
import AdminUpdateUser from "../pages/admin/user/updateUserPage";
import ShowDataResep from "../pages/admin/resep/showDataResep";
import UpdateDataResep from "../pages/admin/resep/updateDataResep";
import CreateDataResep from "../pages/admin/resep/createDataResep";
import ShowDataProduk from "../pages/admin/produk/showDataProdukPage";
import CreateProduk from "../pages/admin/produk/createProdukPage";
import UpdateProdukPage from "../pages/admin/produk/updateProdukPage";
import ShowDataHampers from "../pages/admin/hampers/showDataHampersPage";
import CreateHampers from "../pages/admin/hampers/createHampersPage";
import UpdateHampersPage from "../pages/admin/hampers/updateHampersPage";
import ShowDataPembelianBahanBaku from "../pages/mo/pembelianBahanBaku/showDataPembelianBahanBaku";
import CreatePembelianBahanBaku from "../pages/mo/pembelianBahanBaku/createPembelianBahanBakuPage";
import UpdatePembelianBahanBakuPage from "../pages/mo/pembelianBahanBaku/updatePembelianBahanBakuPage";
import ShowDataKaryawan from "../pages/mo/Karyawan/showDataKaryawan";
import CreateDataKaryawan from "../pages/mo/Karyawan/createDataKaryawan";
import UpdateDataKaryawan from "../pages/mo/Karyawan/updateDataKaryawan";

import ShowDataPemesanan from "../pages/admin/pengiriman/showDataPemesanan";

import ShowDataPesanan from "../pages/admin/pesanan/showDataPesanan";
import ShowDataDaftarPesanan from "../pages/admin/daftarPesanan/showDataDaftarPesanan";
import UpdateDataDaftarPesanan from "../pages/admin/daftarPesanan/updateDataDaftarPesanan";
import ShowTipPesanan from "../pages/admin/tip/showPesananTip";

import UpdateDataProsesPesanan from "../pages/admin/prosesPesanan/updateDataProsesPesanan";
import ShowDataProsesPesanan from "../pages/admin/prosesPesanan/showDataProsesPesanan";

import UpdateDataDiprosesPesanan from "../pages/admin/pesananYangDiproses/updateDataDiprosesPesanan";
import ShowDataDiprosesPesanan from "../pages/admin/pesananYangDiproses/showDataDiprosesPesanan";

import StatusOrder from "../pages/statusPesanan/showStatusPesanan";

import MoLaporan from "../pages/mo/laporan/laporanPerbulan";
import MoLaporanBahan from "../pages/mo/laporanBahanBaku/laporanBahanBaku";
import ProsesPesanan from "../pages/mo/prosesPesanan/ProsesPesanan";

import LaporanPenjualanProduk from "../pages/mo/laporan/LaporanPenjualanProduk";

import LaporanStokBahanBaku from "../pages/mo/laporan/LaporanStokBahanBaku";

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
            <Footer />
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
        path: "/user/order",
        element: <Order />,
      },
      {
       path: "/user/StatusPesanan",
        element: <StatusOrder />,
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
     {
        path: "/user/payment/:idPemesanan",
        element: <Pembayaran />,
      },
      {
        path: "/user/history",
        element: <History />,
      },
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
      {
        path: "/admin/showDataProduk",
        element: <ShowDataProduk />,
      },
      {
        path: "/admin/createProduk",
        element: <CreateProduk />,
      },
      {
        path: "/admin/updateProduk",
        element: <UpdateProdukPage />,
      },
      {
        path: "/admin/showDataHampers",
        element: <ShowDataHampers />,
      },
      {
        path: "/admin/createHampers",
        element: <CreateHampers />,
      },
      {
        path: "/admin/updateHampers",
        element: <UpdateHampersPage />,
      },
      // {
      //   path: "/admin/createLayanan",
      //   element: <CreateLayanan />,
      // },
      // {
      //   path: "/admin/showDataLayanan",
      //   element: <ShowDataLayanan />,
      // },
      // {
      //   path: "/admin/updateLayanan",
      //   element: <AdminUpdateLayanan />,
      // },
      {
        path: "/admin/showDataPemesanan",
        element: <ShowDataPemesanan />,
      },
      {
        path: "/admin/showDataPesanan",
        element: <ShowDataPesanan />,
      },
      {
        path: "/admin/showDataDaftarPesanan",
        element: <ShowDataDaftarPesanan />,
      },
      {
        path: "/admin/updateDataDaftarPesanan",
        element: <UpdateDataDaftarPesanan />,
      },
      {
        path: "/admin/showTipPesanan",
        element: <ShowTipPesanan />,
      },
      {
        path: "/admin/updateDataProsesPesanan",
        element: <UpdateDataProsesPesanan />,
      },
      {
        path: "/admin/showDataProsesPesanan",
        element: <ShowDataProsesPesanan />,
      },
      {
        path: "/admin/showDataDiprosesPesanan",
        element: <ShowDataDiprosesPesanan />,
      },
      {
        path: "/admin/updateDataDiprosesPesanan",
        element: <UpdateDataDiprosesPesanan />,
      },
    ],
  },
  {
    path: "/mo",
    element: (
      <ProtectedRoutes>
        <MOLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/mo",
        element: <AdminShowUser />,
      },
      {
        path: "/mo/showDataUser",
        element: <AdminShowUser />,
      },
      {
        path: "/mo/createDataUser",
        element: <AdminCreateUser />,
      },
      {
        path: "/mo/updateDataUser",
        element: <AdminUpdateUser />,
      },
      {
        path: "/mo/showDataPembelianBahanBaku",
        element: <ShowDataPembelianBahanBaku />,
      },
      {
        path: "/mo/createPembelianBahanBaku",
        element: <CreatePembelianBahanBaku />,
      },
      {
        path: "/mo/updatePembelianBahanBaku",
        element: <UpdatePembelianBahanBakuPage />,
      },
      {
        path: "/mo/showDataKaryawan",
        element: <ShowDataKaryawan />,
      },
      {
        path: "/mo/createDataKaryawan",
        element: <CreateDataKaryawan />,
      },
      {
        path: "/mo/updateDataKaryawan",
        element: <UpdateDataKaryawan />,
      },
      {
       path: "/mo/showLaporan",
        element: <MoLaporan />,
      },
      {
        path: "/mo/showLaporanBahanBaku",
        element: <MoLaporanBahan />,
      },
      {
        path: "/mo/prosesPesanan",
        element: <ProsesPesanan />,
      },
      {
        path: "/mo/laporanPenjualanProduk",
        element: <LaporanPenjualanProduk />,
      },
      {
        path: "/mo/laporanStokBahanBaku",
        element: <LaporanStokBahanBaku />,
      },
    ],
  },
  {
    path: "/owner",
    element: (
      <ProtectedRoutes>
        <OwnerLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/owner/laporanPenjualanProduk",
        element: <LaporanPenjualanProduk />,
      },
      {
        path: "/owner/laporanStokBahanBaku",
        element: <LaporanStokBahanBaku />,
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
