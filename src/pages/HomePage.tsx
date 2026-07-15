import MovieCard from "../components/MovieCard";
import QuickBooking from "../components/QuickBooking";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MonitorPlay,
  Volume2,
  Armchair,
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_NOW_PLAYING = [
  {
    id: 1,
    title: "Lật Mặt 7: Một Điều Ước",
    genre: "Tâm lý, Gia đình",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGjjc9fe.jpg",
    ageRating: "K",
    duration: 138,
    country: "Việt Nam",
    language: "Tiếng Việt",
  },
  {
    id: 2,
    title: "Godzilla x Kong",
    genre: "Hành động, Viễn tưởng",
    posterUrl: "https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLvLuPE21pMEtY.jpg",
    ageRating: "C13",
    duration: 115,
    country: "Mỹ",
    language: "Phụ đề Tiếng Việt",
  },
  {
    id: 3,
    title: "Deadpool & Wolverine",
    genre: "Hành động, Hài",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    ageRating: "C18",
    duration: 120,
    country: "Mỹ",
    language: "Phụ đề Tiếng Việt",
  },
  {
    id: 4,
    title: "Dune: Hành Tinh Cát 2",
    genre: "Viễn tưởng",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8Ez05mglD2.jpg",
    ageRating: "C16",
    duration: 166,
    country: "Mỹ",
    language: "Phụ đề Tiếng Việt",
  },
];

const MOCK_COMING_SOON = [
  {
    id: 5,
    title: "Kẻ Trộm Mặt Trăng 4",
    genre: "Hoạt hình, Hài",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/3w84hCFJATpiCO5g8hpdWVPB0bF.jpg",
    ageRating: "K",
    duration: 95,
    country: "Mỹ",
    language: "Lồng tiếng Việt",
  },
  {
    id: 6,
    title: "Venom: The Last Dance",
    genre: "Hành động, Viễn tưởng",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
    ageRating: "C16",
    duration: 110,
    country: "Mỹ",
    language: "Phụ đề Tiếng Việt",
  },
  {
    id: 7,
    title: "Mufasa: The Lion King",
    genre: "Phiêu lưu, Gia đình",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/b0OaXGZkIkRblJzdBw0xH7aWJkO.jpg",
    ageRating: "K",
    duration: 118,
    country: "Mỹ",
    language: "Lồng tiếng Việt",
  },
  {
    id: 8,
    title: "Mickey 17",
    genre: "Khoa học viễn tưởng",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/2qWVveG5Fp7H4jQ3s4u409GusFq.jpg",
    ageRating: "C16",
    duration: 130,
    country: "Mỹ",
    language: "Phụ đề Tiếng Việt",
  },
];

const HomePage = () => {
  return (
    <div className="w-full">
      {/* 1. HERO BANNER */}
      <div className="relative w-full h-[300px] md:h-[500px] bg-slate-800 rounded-2xl overflow-hidden mt-4">
        <img
          src="https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
          alt="Banner"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </div>

      {/* 2. THANH ĐẶT VÉ NHANH */}
      <QuickBooking />

      {/* 3. KHU VỰC PHIM ĐANG CHIẾU */}
      <div className="mt-20 mb-10">
        <div className="flex items-center justify-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-wider text-white border-b-4 border-amber-500 pb-2">
            Phim Đang Chiếu
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {MOCK_NOW_PLAYING.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>

      {/* 4. KHU VỰC PHIM SẮP CHIẾU */}
      <div className="mt-20 mb-20">
        <div className="flex items-center justify-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-wider text-white border-b-4 border-amber-500 pb-2">
            Phim Sắp Chiếu
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {MOCK_COMING_SOON.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>

        {/* Nút xem thêm chung ở cuối */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 rounded-full font-bold border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900 transition-colors">
            Xem Tất Cả Phim
          </button>
        </div>
      </div>

      {/* 5. KHU VỰC TRẢI NGHIỆM ĐIỆN ẢNH*/}
      <div className="mt-24 mb-20 py-16 bg-slate-900/50 border-y border-slate-800 relative overflow-hidden">
        {/* Lớp màu nhấn chìm ở background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-wider text-white mb-4">
              Trải Nghiệm <span className="text-amber-500">Đỉnh Cao</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Nâng tầm cảm xúc với hệ thống rạp chiếu phim hiện đại bậc nhất,
              mang đến cho bạn những giây phút thăng hoa cùng nghệ thuật thứ 7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800 text-center group hover:border-amber-500/50 transition-colors">
              <MonitorPlay className="w-12 h-12 text-amber-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">
                Màn Hình IMAX Siêu Cực
              </h3>
              <p className="text-slate-400 text-sm">
                Trải nghiệm hình ảnh sắc nét, độ tương phản tuyệt đối với công
                nghệ chiếu laser tiên tiến nhất thế giới.
              </p>
            </div>
            <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800 text-center group hover:border-amber-500/50 transition-colors">
              <Volume2 className="w-12 h-12 text-amber-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">
                Âm Thanh Dolby Atmos
              </h3>
              <p className="text-slate-400 text-sm">
                Hệ thống âm thanh vòm 360 độ ôm trọn không gian, cho bạn cảm
                giác như đang sống trong từng thước phim.
              </p>
            </div>
            <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800 text-center group hover:border-amber-500/50 transition-colors">
              <Armchair className="w-12 h-12 text-amber-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-3">
                Ghế Ngồi First-Class
              </h3>
              <p className="text-slate-400 text-sm">
                Thư giãn tuyệt đối với ghế da cao cấp, có thể ngả 180 độ, tích
                hợp sạc không dây và chăn ấm cá nhân.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. KHU VỰC LIÊN HỆ VỚI CHÚNG TÔI */}
      <div className="mt-20 mb-20 container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-wider text-white border-b-4 border-amber-500 pb-2">
            Liên Hệ Với Chúng Tôi
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl">
          {/* Cột trái: Thông tin & Mạng xã hội */}
          <div className="space-y-8 flex flex-col justify-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Thông Tin Liên Hệ
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-full text-amber-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Email Hỗ Trợ</p>
                    <p className="text-white font-semibold text-lg">
                      cskh@seatify.com.vn
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-full text-amber-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">
                      Hotline (8:00 - 22:00)
                    </p>
                    <p className="text-white font-semibold text-lg">
                      1900 1234 56
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-full text-amber-500">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Trụ sở chính</p>
                    <p className="text-white font-semibold leading-relaxed">
                      Tầng 15, Tòa nhà Seatify Tower,
                      <br />
                      123 Nguyễn Huệ, Quận 1, TP.HCM
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <p className="text-slate-400 mb-4">Kết nối qua mạng xã hội:</p>
              <div className="flex gap-4">
                <button className="flex-1 py-3 bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/30 rounded-xl font-bold hover:bg-[#1877F2] hover:text-white transition-colors">
                  FACEBOOK
                </button>
                <button className="flex-1 py-3 bg-[#0068FF]/10 text-[#0068FF] border border-[#0068FF]/30 rounded-xl font-bold hover:bg-[#0068FF] hover:text-white transition-colors">
                  ZALO CHAT
                </button>
              </div>
            </div>
          </div>

          {/* Cột phải: Form nhập liệu */}
          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">
              Gửi Tin Nhắn Cho Chúng Tôi
            </h3>
            <form className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Họ và tên của bạn"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Địa chỉ Email"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Thông tin liên hệ hoặc phản ánh..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold py-3.5 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-amber-500/25"
              >
                <Send className="w-5 h-5" />
                GỬI NGAY
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
