import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import QuickBooking from "../components/QuickBooking";
import TrailerModal from "../components/TrailerModal";
import HeroBanner from "../components/HeroBanner";
import { fetchClient } from "../utils/apiClient";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// 1. ĐỊNH NGHĨA KHUÔN DỮ LIỆU TỪ DATABASE
// Dựa vào schema.prisma, khai báo để TypeScript hỗ trợ gợi ý code
interface Movie {
  id: string;
  title: string;
  filmGenres: string | null;
  posterUrl: string | null;
  backdropUrl: string | null;
  trailerUrl: string | null;
  ageRating: string;
  status: "NOW_PLAYING" | "COMING_SOON" | "ARCHIVED";
  duration: number;
}

const HomePage = () => {
  // 2. KHỞI TẠO CÁC CÁI RỔ (STATE)
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái đang tải (Loading)

  // State quản lý Trailer
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [currentTrailerUrl, setCurrentTrailerUrl] = useState<string | null>(
    null,
  );

  // Hàm hứng link trailer từ MovieCard bắn lên
  const handlePlayTrailer = (url: string) => {
    setCurrentTrailerUrl(url);
    setIsTrailerOpen(true);
  };

  // 3. GỌI API ĐÚNG 1 LẦN KHI MỞ TRANG (useEffect)
  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Dùng cỗ máy vận chuyển fetchClient gọi BE
        const response = await fetchClient("/movies", { method: "GET" });

        // Cất data (mảng phim) vào rổ
        setMovies(response.data);
      } catch (error) {
        // Kiểm tra xem lỗi có chuẩn định dạng Error không
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Không thể tải danh sách phim!");
        }
      } finally {
        // Dù thành công hay lỗi thì cũng phải tắt vòng xoay loading
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []); // <-- Cái mảng rỗng [] ở đây cực kỳ quan trọng, nó bảo React chỉ chạy 1 lần duy nhất!

  // 4. BÓC TÁCH DỮ LIỆU VÀ GIỚI HẠN 4 PHIM HIỂN THỊ LÊN TRANG CHỦ
  const nowPlayingMovies = movies
    .filter((m) => m.status === "NOW_PLAYING")
    .slice(0, 4); // Chỉ lấy từ vị trí số 0 đến số 4

  const comingSoonMovies = movies
    .filter((m) => m.status === "COMING_SOON")
    .slice(0, 4); // Chỉ lấy 4 phim

  // 5. HIỂN THỊ MÀN HÌNH LOADING (UX)
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="text-amber-500 text-2xl font-black animate-pulse">
          ĐANG TẢI PHIM...
        </div>
      </div>
    );
  }

  // 6. RENDER GIAO DIỆN CHÍNH
  return (
    <div className="w-full">
      {/* HERO BANNER */}
      <HeroBanner movies={nowPlayingMovies} onPlayTrailer={handlePlayTrailer} />

      <QuickBooking />

      {/* KHU VỰC PHIM ĐANG CHIẾU */}
      <div className="mt-20 mb-10">
        <div className="flex items-center justify-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-wider text-white border-b-4 border-amber-500 pb-2">
            Phim Đang Chiếu
          </h2>
        </div>

        {nowPlayingMovies.length === 0 ? (
          <p className="text-center text-slate-500">
            Chưa có phim nào đang chiếu.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {nowPlayingMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                genre={movie.filmGenres || "Đang cập nhật"}
                posterUrl={movie.posterUrl || ""}
                ageRating={movie.ageRating}
                duration={movie.duration}
                trailerUrl={movie.trailerUrl || undefined}
                onPlayTrailer={handlePlayTrailer}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link
            to="/movies-status/now-playing"
            className="px-8 py-3 rounded-full font-bold border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Xem Thêm
          </Link>
        </div>
      </div>

      {/* KHU VỰC PHIM SẮP CHIẾU */}
      <div className="mt-20 mb-20">
        <div className="flex items-center justify-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-wider text-white border-b-4 border-amber-500 pb-2">
            Phim Sắp Chiếu
          </h2>
        </div>

        {comingSoonMovies.length === 0 ? (
          <p className="text-center text-slate-500">
            Chưa có phim nào sắp chiếu.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {comingSoonMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                genre={movie.filmGenres || "Đang cập nhật"}
                posterUrl={movie.posterUrl || ""}
                ageRating={movie.ageRating}
                duration={movie.duration}
                trailerUrl={movie.trailerUrl || undefined}
                onPlayTrailer={handlePlayTrailer}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link
            to="/movies-status/coming-soon"
            className="px-8 py-3 rounded-full font-bold border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Xem Thêm
          </Link>
        </div>
      </div>
      {/* GỌI MODAL TRAILER CỦA TRANG CHỦ */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        videoUrl={currentTrailerUrl}
      />
    </div>
  );
};

export default HomePage;
