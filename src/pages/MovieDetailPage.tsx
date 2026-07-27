import { useState, useEffect } from "react";
import { fetchClient } from "../utils/apiClient";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import {
  Play,
  Tags,
  Clock,
  Globe,
  MessageCircle,
  UserCheck,
  CalendarDays,
  MapPin,
} from "lucide-react";

// Định nghĩa khuôn dữ liệu nhận từ Backend
interface MovieDetailData {
  id: string;
  title: string;
  description: string | null;
  posterUrl: string | null;
  filmGenres: string | null;
  duration: number;
  ageRating: string;
  director: string | null;
  cast: string | null;
  country: string | null;
  language: string | null;
  releaseDate: string | null;
  createdAt: string;
}

// ==========================================
// 1. MOCK DATA (Dành riêng cho nửa dưới - Lịch chiếu)
// ==========================================
const MOCK_SHOWTIMES = [
  { date: "15/07", dayOfWeek: "Thứ Tư", isActive: true },
  { date: "16/07", dayOfWeek: "Thứ Năm", isActive: false },
  { date: "17/07", dayOfWeek: "Thứ Sáu", isActive: false },
];

const MOCK_CINEMAS = [
  {
    cinemaName: "Seatify Quốc Thanh (TP.HCM)",
    address: "271 Nguyễn Trãi, P. Nguyễn Cư Trinh, Q.1, TP.HCM",
    rooms: [
      { roomName: "Standard", times: ["18:00", "19:30", "21:15", "23:00"] },
      { roomName: "VIP", times: ["20:00", "22:30"] },
    ],
  },
  {
    cinemaName: "Seatify Landmark 81 (TP.HCM)",
    address: "Tầng B1, Vincom Center Landmark 81, 720A Điện Biên Phủ",
    rooms: [{ roomName: "IMAX", times: ["19:00", "22:00"] }],
  },
];

// ==========================================
// 2. COMPONENT CHÍNH
// ==========================================
const MovieDetailPage = () => {
  const { movieId } = useParams();

  // State quản lý dữ liệu PHIM THẬT từ Database
  const [movie, setMovie] = useState<MovieDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State quản lý UI Lịch chiếu
  const [selectedDate, setSelectedDate] = useState("15/07");
  const isNoShowtime = false; // Đổi thành true nếu muốn test giao diện Trống

  // --- GỌI API LẤY DATA THẬT ---
  useEffect(() => {
    const loadMovieDetail = async () => {
      try {
        setIsLoading(true);
        const response = await fetchClient(`/movies/${movieId}`, {
          method: "GET",
        });
        setMovie(response.data);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) loadMovieDetail();
  }, [movieId]);

  // --- MÀN HÌNH LOADING ---
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="text-amber-500 text-2xl font-black animate-pulse">
          ĐANG TẢI THÔNG TIN PHIM...
        </div>
      </div>
    );
  }

  // --- MÀN HÌNH LỖI (Không tìm thấy phim) ---
  if (!movie) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-950 text-white gap-4">
        <h1 className="text-3xl font-bold text-red-500">404</h1>
        <p className="text-xl text-slate-400">Không tìm thấy bộ phim này!</p>
        <Link
          to="/"
          className="px-6 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400"
        >
          Về Trang Chủ
        </Link>
      </div>
    );
  }

  // ==========================================
  // 3. RENDER GIAO DIỆN CHÍNH
  // ==========================================
  return (
    <div className="-mt-8">
      {/* KHỐI 1: BACKGROUND ĐIỆN ẢNH (DÙNG DATA THẬT) */}
      <div className="relative w-full py-16 md:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Cột trái: Poster Phim */}
            <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700 relative">
                <img
                  src={movie.posterUrl || undefined}
                  alt={movie.title}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-sm font-black px-3 py-1 rounded shadow-md">
                  {movie.ageRating}
                </div>
              </div>
            </div>

            {/* Cột phải: Thông tin Phim */}
            <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-2">
                {movie.title}
              </h1>

              {/* Các thẻ Icon Thông tin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 mb-8 mt-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <Tags className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="font-semibold">{movie.filmGenres}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="font-semibold">{movie.duration} Phút</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Globe className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="font-semibold">{movie.country}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <MessageCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="font-semibold">{movie.language}</span>
                </div>
                <div className="flex items-start gap-3 text-slate-300 sm:col-span-2 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 mt-2">
                  <UserCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-amber-400 font-medium leading-relaxed">
                    Phân loại độ tuổi: Phim dành cho khán giả từ{" "}
                    {movie.ageRating.replace("C", "")} tuổi trở lên.
                  </span>
                </div>
              </div>

              {/* Chi tiết Nội dung */}
              <div className="space-y-4 mb-8 text-sm md:text-base">
                <p>
                  <span className="text-slate-500 font-semibold">
                    Đạo diễn:
                  </span>{" "}
                  <span className="text-white font-medium">
                    {movie.director}
                  </span>
                </p>
                <p>
                  <span className="text-slate-500 font-semibold">
                    Diễn viên:
                  </span>{" "}
                  <span className="text-white font-medium">{movie.cast}</span>
                </p>
                <p>
                  <span className="text-slate-500 font-semibold">
                    Khởi chiếu:
                  </span>{" "}
                  <span className="text-white font-medium">
                    {movie.releaseDate
                      ? new Date(movie.releaseDate).toLocaleDateString("vi-VN")
                      : "Đang cập nhật"}
                  </span>
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  NỘI DUNG PHIM
                </h3>
                <p className="text-slate-400 leading-relaxed text-justify">
                  {movie.description}
                </p>
              </div>

              <div>
                <button className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 border-2 border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500 shadow-lg cursor-pointer">
                  <Play className="w-5 h-5" /> Xem Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KHỐI 2: LỊCH CHIẾU PHIM (DÙNG MOCK DATA TẠM THỜI) */}
      <div className="container mx-auto px-4 py-12 mb-20">
        <div className="flex flex-col items-center justify-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-wider text-white mb-2">
            Lịch Chiếu
          </h2>
          <div className="w-24 h-1 bg-amber-500 rounded-full"></div>
        </div>

        {isNoShowtime ? (
          <div className="flex flex-col items-center justify-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800 border-dashed">
            <CalendarDays className="w-20 h-20 text-slate-600 mb-6" />
            <h3 className="text-2xl font-black text-amber-500 uppercase tracking-widest text-center">
              HIỆN CHƯA CÓ LỊCH CHIẾU
            </h3>
            <p className="text-slate-500 mt-4 text-center">
              Vui lòng quay lại sau hoặc theo dõi fanpage để cập nhật thông tin
              mới nhất.
            </p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* TABS CHỌN NGÀY */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {MOCK_SHOWTIMES.map((st, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(st.date)}
                  className={`flex flex-col items-center justify-center w-24 py-3 rounded-xl border transition-all ${
                    selectedDate === st.date
                      ? "bg-amber-500 border-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-105"
                      : "bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800 font-bold"
                  }`}
                >
                  <span className="text-sm">{st.date}</span>
                  <span className="text-xs font-medium mt-1">
                    {st.dayOfWeek}
                  </span>
                </button>
              ))}
            </div>

            {/* DANH SÁCH RẠP */}
            <div className="space-y-6">
              {MOCK_CINEMAS.map((cinema, cIndex) => (
                <div
                  key={cIndex}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl"
                >
                  <div className="flex items-start gap-3 mb-6 pb-6 border-b border-slate-800">
                    <MapPin className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {cinema.cinemaName}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        {cinema.address}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {cinema.rooms.map((room, rIndex) => (
                      <div key={rIndex}>
                        <p className="text-sm font-semibold text-slate-400 mb-3">
                          {room.roomName}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {room.times.map((time, tIndex) => (
                            <Link
                              to={`/booking/123`} // Link tĩnh chờ update API
                              key={tIndex}
                              className="px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-200 font-bold hover:border-amber-500 hover:text-amber-500 transition-colors"
                            >
                              {time}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
