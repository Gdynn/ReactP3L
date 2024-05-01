import { Outlet } from "react-router-dom";
// import component
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/footer";

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
const UserLayout = ({ children }) => {
  return (
    <div className="mt-4 pt-5">
      <TopNavbar routes={routes} />
      <div className="a" style={{ minHeight: "800px" }}>
        {children ? children : <Outlet />}
      </div>

      <Footer></Footer>
    </div>
  );
};
export default UserLayout;
