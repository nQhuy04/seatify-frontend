import { Outlet } from "react-router-dom";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-200 font-sans transition-colors duration-300">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
