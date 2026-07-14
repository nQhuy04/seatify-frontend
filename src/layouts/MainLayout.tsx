import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
 
      <header className="bg-slate-900 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-400">🎬 Seatify</h1>
          <nav>
            <ul className="flex space-x-6 font-semibold">
              <li className="hover:text-yellow-400 cursor-pointer">Lịch Chiếu</li>
              <li className="hover:text-yellow-400 cursor-pointer">Cụm Rạp</li>
              <li className="hover:text-yellow-400 cursor-pointer">Đăng nhập</li>
            </ul>
          </nav>
        </div>
      </header>

      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>


      <footer className="bg-slate-900 text-gray-400 py-6 text-center">
        <p>© 2026 Seatify. Nền tảng đặt vé xem phim đỉnh cao.</p>
      </footer>
    </div>
  );
};

export default MainLayout;