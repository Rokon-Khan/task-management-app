import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar></Navbar>
      {/* Hero */}
      <div className="min-h-[calc(100vh-300px)]">
        {/* Dynamic Contents */}
        <Outlet></Outlet>
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
