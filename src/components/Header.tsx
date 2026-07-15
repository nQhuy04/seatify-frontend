import { Search, User, Ticket, Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    // bg-slate-900: Xanh đen than | shadow-md: Đổ bóng nhẹ phân cách với thân web
    <header className="sticky top-0 z-50 bg-slate-900 shadow-md text-slate-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <Clapperboard className="w-8 h-8 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-2xl font-black tracking-widest text-white">
            SEATIFY
          </span>
        </Link>

        {/* THANH TÌM KIẾM*/}
        <div className="hidden md:flex items-center bg-slate-800 rounded-full px-4 py-2 border border-slate-700 focus-within:border-amber-500 transition-colors w-1/3">
          <input
            type="text"
            placeholder="Tìm phim, rạp, diễn viên..."
            className="bg-transparent border-none outline-none w-full text-sm text-slate-200 placeholder-slate-500"
          />
          <Search className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors" />
        </div>

        {/* CỤM MENU & NÚT BẤM (Bên phải) */}
        <div className="flex items-center gap-6">
          {/* Menu chữ */}
          <nav className="hidden lg:flex gap-6 font-semibold text-sm">
            <Link
              to="/movies"
              className="hover:text-amber-500 transition-colors"
            >
              Lịch chiếu
            </Link>
            <Link
              to="/cinemas"
              className="hover:text-amber-500 transition-colors"
            >
              Cụm rạp
            </Link>
          </nav>

          {/* Nút Đăng nhập & Đặt vé */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 hover:text-white transition-colors text-sm font-medium">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Đăng nhập</span>
            </button>

            {/* Nút Đặt Vé*/}
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg hover:shadow-amber-500/25">
              <Ticket className="w-5 h-5" />
              <span className="hidden sm:inline">Đặt Vé</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
