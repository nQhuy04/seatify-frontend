import { useState } from "react";
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

// --- DỮ LIỆU GIẢ (MOCK DATA) ---
const MOCK_MOVIE_DETAIL = {
  id: "1",
  title: "LẬT MẶT 7: MỘT ĐIỀU ƯỚC",
  originalTitle: "Face Off 7: One Wish",
  posterUrl:
    "https://www.3388films.com/wp-content/uploads/2024/05/Face-Off-7-Official-Poster_20240601_Main_smallerer.jpg",
  backdropUrl:
    "https://image.tmdb.org/t/p/original/tuyNszE1A7OkaI63y1YtS8iXfK1.jpg",
  genre: "Tâm lý, Tình cảm, Gia đình",
  duration: 138,
  country: "Việt Nam",
  language: "Phụ đề Tiếng Anh",
  ageRating: "K",
  ageDescription:
    "Phim được phổ biến đến người xem dưới 13 tuổi với điều kiện xem cùng cha, mẹ hoặc người giám hộ",
  director: "Lý Hải",
  cast: "Thanh Hiền, Trương Minh Cường, Đinh Y Nhung, Quách Ngọc Tuyên, Trâm Anh",
  releaseDate: "26/04/2026",
  description:
    "Câu chuyện kể về bà Hai, một người mẹ đơn thân tự mình nuôi 5 người con khôn lớn. Khi bà Hai gặp tai nạn, những người con đã trưởng thành, mỗi người một phương, phải đối mặt với trách nhiệm chăm sóc mẹ...",

  // Mảng lịch chiếu giả lập
  showtimes: [
    { date: "15/07", dayOfWeek: "Thứ Tư", isActive: true },
    { date: "16/07", dayOfWeek: "Thứ Năm", isActive: false },
    { date: "17/07", dayOfWeek: "Thứ Sáu", isActive: false },
  ],

  cinemas: [
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
      address:
        "Tầng B1, Vincom Center Landmark 81, 720A Điện Biên Phủ, Bình Thạnh",
      rooms: [{ roomName: "IMAX", times: ["19:00", "22:00"] }],
    },
  ],
};

const MovieDetailPage = () => {
  const { movieId } = useParams();

  // Test trước vì bị lỗi Eslint
  console.log("ID của phim đang xem là:", movieId);

  const [selectedDate, setSelectedDate] = useState("15/07");

  const movie = MOCK_MOVIE_DETAIL;

  const isNoShowtime = false;

  return (
    <div className="-mt-8">
      {" "}
      {/* KHỐI 1: BACKGROUND ĐIỆN ẢNH (CINEMATIC HERO) */}
      <div className="relative w-full py-16 md:py-24">
        {/* Lớp ảnh nền bị làm mờ */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 blur-xl"
          style={{ backgroundImage: `url(${movie.backdropUrl})` }}
        ></div>
        {/* Lớp Gradient phủ đen dần từ trên xuống dưới */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950"></div>

        {/* Nội dung Khối 1 */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Cột trái: Poster Phim */}
            <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700 relative">
                <img
                  src={movie.posterUrl}
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
              <p className="text-xl text-slate-400 font-medium italic mb-8">
                {movie.originalTitle}
              </p>

              {/* Các thẻ Icon Thông tin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-300">
                  <Tags className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="font-semibold">{movie.genre}</span>
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
                <div className="flex items-start gap-3 text-slate-300 sm:col-span-2 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                  <UserCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-amber-400 font-medium leading-relaxed">
                    {movie.ageDescription}
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
                    {movie.releaseDate}
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

              {/* Nút Xem Trailer */}
              <div>
                <button className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 border-2 border-slate-600 text-white hover:bg-slate-800 hover:border-slate-500 shadow-lg">
                  <Play className="w-5 h-5" /> Xem Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* KHỐI 2: LỊCH CHIẾU PHIM */}
      <div className="container mx-auto px-4 py-12 mb-20">
        <div className="flex flex-col items-center justify-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-wider text-white mb-2">
            Lịch Chiếu
          </h2>
          <div className="w-24 h-1 bg-amber-500 rounded-full"></div>
        </div>

        {/* LOGIC HIỂN THỊ: CHƯA CÓ LỊCH CHIẾU */}
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
          /* LOGIC HIỂN THỊ: CÓ LỊCH CHIẾU */
          <div className="max-w-5xl mx-auto">
            {/* TABS CHỌN NGÀY */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {movie.showtimes.map((st, index) => (
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

            {/* DANH SÁCH RẠP & SUẤT CHIẾU */}
            <div className="space-y-6">
              {movie.cinemas.map((cinema, cIndex) => (
                <div
                  key={cIndex}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl"
                >
                  {/* Tên rạp */}
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

                  {/* Các phòng và giờ chiếu */}
                  <div className="space-y-6">
                    {cinema.rooms.map((room, rIndex) => (
                      <div key={rIndex}>
                        <p className="text-sm font-semibold text-slate-400 mb-3">
                          {room.roomName}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {room.times.map((time, tIndex) => (
                            <Link
                              to={`/booking/123`} // Tạm thời hardcode ID suất chiếu là 123
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
