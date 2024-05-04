import { Outlet } from "react-router-dom";
// import component
import TopNavbarMO from "../components/TopNavbarMO";
// import SidenavCustom from "../pages/admin/sideNav";
// import TopNavbar from "../components/TopNavbar";
//mengatur route yang akan ditampilkan di navbar
const routes = [
  {
    path: "/user",
    name: "Home",
  },
  {
    path: "/user/order",
    name: "Order",
  },
  {
    path: "/user/history",
    name: "History",
  },

];
const AdminLayout = ({ children }) => {
  return (
    <div className="mt-4 pt-5">
      <TopNavbarMO routes={routes} />
      {children ? children : <Outlet />}
    </div>
  );
};
export default AdminLayout;
