import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Timer,
  CreditCard,
  MapPin,
  CalendarDays,
  Clock,
  Ticket,
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchClient } from "../utils/apiClient";

// --- ĐỊNH NGHĨA KHUÔN DỮ LIỆU ---
interface TicketSeatData {
  lockedUntil: string;
  seat: { row: string; number: number };
  showtime: {
    startTime: string;
    movie: { title: string; ageRating: string };
    room: { name: string; cinema: { name: string; location: string } };
  };
}

interface BookingData {
  id: string;
  guestName: string;
  guestPhone: string;
  totalPrice: number;
  status: string;
  ticketSeats: TicketSeatData[];
}

const CheckoutPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  // State quản lý Hóa đơn thật và Thời gian thật
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 1. GỌI API LẤY DATA HÓA ĐƠN & TÍNH THỜI GIAN CÒN LẠI
  useEffect(() => {
    const loadBooking = async () => {
      try {
        const response = await fetchClient(`/bookings/${bookingId}`);
        const data = response.data;

        // Lấy thời gian hết hạn từ cái ghế đầu tiên trong hóa đơn
        const lockedUntil = new Date(data.ticketSeats[0].lockedUntil).getTime();
        const now = new Date().getTime();

        // Tính số giây còn lại (Sử dụng getTime() để tránh bị lệch múi giờ)
        const secondsLeft = Math.floor((lockedUntil - now) / 1000);

        if (secondsLeft <= 0 || data.status !== "PENDING") {
          toast.error("Đơn hàng đã hết hạn hoặc đã được xử lý!");
          navigate("/");
          return;
        }

        setBooking(data);
        setTimeLeft(secondsLeft); // Khởi động đồng hồ bằng số giây THẬT
      } catch {
        toast.error("Không tìm thấy đơn hàng!");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (bookingId) loadBooking();
  }, [bookingId, navigate]);

  // 2. CHẠY ĐỒNG HỒ ĐẾM NGƯỢC
  useEffect(() => {
    if (!booking) return; // Chưa có data thì chưa đếm

    if (timeLeft <= 0) {
      toast.error("Hết thời gian giữ ghế! Đơn hàng đã bị hủy.");
      navigate("/");
      return;
    }

    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, booking, navigate]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (isLoading)
    return (
      <div className="min-h-[80vh] flex items-center justify-center text-amber-500 font-bold animate-pulse">
        ĐANG TẢI HÓA ĐƠN...
      </div>
    );
  if (!booking) return null;

  // Bóc tách dữ liệu từ API để dùng cho dễ
  const ticketSeats = booking.ticketSeats;
  const showtime = ticketSeats[0].showtime;
  const movie = showtime.movie;
  const room = showtime.room;
  const cinema = room.cinema;

  const seatNames = ticketSeats.map(
    (ts: TicketSeatData) => `${ts.seat.row}${ts.seat.number}`,
  );
  const startTime = new Date(showtime.startTime);

  return (
    <div className="py-12 min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* THANH TIẾN TRÌNH */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {/* ... (Đoạn Progress bar giữ nguyên) ... */}
          <div className="flex flex-col items-center gap-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Chọn Ghế
            </span>
          </div>
          <div className="w-16 h-[2px] bg-slate-800 mb-5"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              2
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Thanh Toán
            </span>
          </div>
          <div className="w-16 h-[2px] bg-slate-800 mb-5"></div>
          <div className="flex flex-col items-center gap-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">
              Nhận Vé
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CỘT TRÁI: Phương thức thanh toán */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-6 uppercase border-b-2 border-slate-800 pb-3 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-amber-500" /> Chọn phương
                thức thanh toán
              </h3>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border-2 border-amber-500 bg-amber-500/5 rounded-xl cursor-pointer transition-colors">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="w-5 h-5 accent-amber-500 cursor-pointer"
                    />
                    <span className="text-white font-bold text-lg">
                      Thanh toán qua VNPAY
                    </span>
                  </div>
                  <div className="bg-white px-2 py-1 rounded shadow-sm">
                    <span className="text-red-500 font-black italic tracking-tighter">
                      VN
                    </span>
                    <span className="text-blue-600 font-black italic tracking-tighter">
                      PAY
                    </span>
                  </div>
                </label>
              </div>

              <div className="mt-8 bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm text-slate-400 leading-relaxed">
                <p>
                  🔹 Khách hàng:{" "}
                  <span className="text-amber-500 font-bold">
                    {booking.guestName} ({booking.guestPhone})
                  </span>
                </p>
                <p>
                  🔹 Mã đơn:{" "}
                  <span className="font-mono text-white">{booking.id}</span>
                </p>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: VÉ ĐIỆN TỬ DÙNG DATA THẬT 100% */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden sticky top-24 border border-slate-800">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 border-b border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 text-sm font-bold uppercase">
                  Thời gian giữ ghế
                </span>
                <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20">
                  <Timer className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="text-red-500 font-black tracking-widest">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-black text-white uppercase leading-tight mb-2">
                  {movie.title}
                </h3>
                <span className="inline-block bg-red-600 text-white text-xs font-black px-2 py-1 rounded mb-6">
                  {movie.ageRating}
                </span>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <p className="text-white font-bold">{cinema.name}</p>
                      <p className="text-slate-400 mt-1">{cinema.location}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CalendarDays className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-white font-bold mt-0.5">
                      {startTime.toLocaleDateString("vi-VN")}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-white font-bold mt-0.5">
                      {startTime.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      - {room.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative h-4 flex items-center justify-between bg-slate-900">
                <div className="w-4 h-4 bg-slate-950 rounded-full -ml-2 border-r border-slate-800"></div>
                <div className="w-full border-t-2 border-dashed border-slate-700"></div>
                <div className="w-4 h-4 bg-slate-950 rounded-full -mr-2 border-l border-slate-800"></div>
              </div>

              <div className="p-6 bg-slate-900">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Số lượng ghế</span>
                    <span className="text-white font-bold">
                      {ticketSeats.length} Vé
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Vị trí ghế</span>
                    <span className="text-amber-500 font-bold text-lg">
                      {seatNames.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-slate-800 pt-4 mb-6">
                  <span className="text-slate-400 font-bold uppercase text-sm">
                    Tổng cộng
                  </span>
                  <span className="text-3xl font-black text-amber-500">
                    {booking.totalPrice.toLocaleString("vi-VN")}đ
                  </span>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold uppercase tracking-wider py-4 rounded-xl hover:from-amber-500 hover:to-amber-400 transition-all transform hover:-translate-y-1 shadow-lg cursor-pointer">
                  <Ticket className="w-5 h-5" /> THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
