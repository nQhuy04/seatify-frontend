import { useState } from "react";
import {
  Search,
  User,
  Ticket,
  Clapperboard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // state quản lý Popup Đăng xuất
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Gọi biến user và hàm logout từ hệ thống ra
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State lưu từ khóa tìm kiếm
  const [keyword, setKeyword] = useState("");

  // Hàm thực thi khi bấm tìm kiếm
  const handleSearch = () => {
    if (keyword.trim() !== "") {
      // Nhảy sang trang search và truyền từ khóa lên URL
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
      setKeyword(""); // Tự động xóa chữ trên thanh tìm kiếm cho gọn
    }
  };

  // Hàm lắng nghe khi khách gõ bàn phím
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất thành công!");
    navigate("/"); // Đá về trang chủ
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 shadow-md text-slate-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <Clapperboard className="w-8 h-8 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-2xl font-black tracking-widest text-white">
            SEATIFY
          </span>
        </Link>

        {/* Thanh Tìm Kiếm */}
        <div className="hidden md:flex items-center bg-slate-800 rounded-full px-4 py-2 border border-slate-700 focus-within:border-amber-500 transition-colors w-1/3">
          <input
            type="text"
            placeholder="Tìm phim, rạp, diễn viên..."
            value={keyword} // Gắn state
            onChange={(e) => setKeyword(e.target.value)} // Cập nhật state khi gõ
            onKeyDown={handleKeyDown} // Bắt sự kiện phím Enter
            className="bg-transparent border-none outline-none w-full text-sm text-slate-200 placeholder-slate-500"
          />
          <Search
            onClick={handleSearch} // Bắt sự kiện Click chuột
            className="w-5 h-5 text-slate-400 hover:text-amber-500 cursor-pointer transition-colors"
          />
        </div>

        <div className="flex items-center gap-6">
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

          <div className="flex items-center gap-4">
            {/* LOGIC ĐIỀU HƯỚNG HIỂN THỊ TRẠNG THÁI ĐĂNG NHẬP */}
            {!user ? (
              // NẾU CHƯA ĐĂNG NHẬP -> Hiện nút Đăng Nhập
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 hover:text-white transition-colors text-sm font-medium cursor-pointer"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </button>
            ) : (
              // NẾU ĐÃ ĐĂNG NHẬP -> Hiện Menu Dropdown
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
                    {/* Hiển thị chữ cái đầu tiên của Tên */}
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-bold text-white max-w-[100px] truncate">
                    {user.fullName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>

                {/* KHỐI DROPDOWN MENU (Chỉ hiện khi hover chuột vào) */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right group-hover:translate-y-0 translate-y-2 z-50">
                  <div className="p-4 border-b border-slate-800">
                    <p className="text-white font-bold truncate">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-amber-500 rounded-xl transition-colors"
                    >
                      <User className="w-4 h-4" /> Thông tin tài khoản
                    </Link>

                    {/* Bổ sung nút quản trị nếu là Admin */}
                    {user.role === "ADMIN" && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-amber-500 hover:bg-amber-500 hover:text-slate-950 rounded-xl transition-colors mt-2 border border-amber-500/20"
                      >
                        <Clapperboard className="w-4 h-4" /> Bảng Điều Khiển
                      </Link>
                    )}
                  </div>
                  <div className="p-2 border-t border-slate-800">
                    <button
                      onClick={() => setIsLogoutModalOpen(true)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Nút Đặt Vé vẫn giữ nguyên */}
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg hover:shadow-amber-500/25 cursor-pointer">
              <Ticket className="w-5 h-5" />
              <span className="hidden sm:inline">Đặt Vé</span>
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* KHU VỰC MODAL XÁC NHẬN ĐĂNG XUẤT */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-sm relative overflow-hidden transform transition-all p-8 text-center">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogOut className="w-8 h-8 text-red-500" />
            </div>

            <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
              Đăng Xuất
            </h3>
            <p className="text-slate-400 mb-8 text-sm">
              Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này không?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-3 rounded-xl font-bold border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
              >
                HỦY
              </button>
              <button
                onClick={() => {
                  setIsLogoutModalOpen(false); // Đóng popup
                  handleLogout(); // Thực thi xóa token
                }}
                className="flex-1 py-3 rounded-xl font-bold bg-red-500 text-white shadow-lg hover:bg-red-600 transform transition-transform hover:-translate-y-1 cursor-pointer"
              >
                ĐĂNG XUẤT
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
