import { useState, useEffect } from "react";
import { Film, Plus, X, Loader2 } from "lucide-react";
import { fetchClient } from "../../utils/apiClient";
import { toast } from "sonner";

// --- THÊM KHUÔN NÀY ĐỂ XÓA LỖI ANY ---
interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  duration: number;
  ageRating: string;
  status: string;
}

const AdminMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State: Chìa khóa làm mới dữ liệu
  const [refreshKey, setRefreshKey] = useState(0);

  // Khởi tạo state cho Form
  const [formData, setFormData] = useState({
    title: "",
    posterUrl: "",
    trailerUrl: "",
    duration: "",
    ageRating: "C13",
    status: "COMING_SOON",
    filmGenres: "",
    director: "",
    cast: "",
    country: "Việt Nam",
    language: "Tiếng Việt",
    releaseDate: "",
    description: "",
  });

  // Gọi API lấy danh sách phim
  // THUẬT TOÁN LOAD DATA CHUẨN REACT 19
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Bỏ dòng setIsLoading(true) đồng bộ đi để tránh lỗi Cascading Renders
        const res = await fetchClient("/movies");
        setMovies(res.data);
      } catch {
        toast.error("Lỗi khi tải danh sách phim!");
      } finally {
        setIsLoading(false); // Dữ liệu tải xong mới set thành false
      }
    };

    fetchMovies();
  }, [refreshKey]); // Hễ biến refreshKey thay đổi số, useEffect sẽ tự động chạy lại!

  // Xử lý Thêm Phim
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.duration || !formData.posterUrl) {
      return toast.error("Vui lòng nhập Tên phim, Thời lượng và Link Poster!");
    }

    try {
      setIsSubmitting(true);
      await fetchClient("/movies", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      toast.success("Đã thêm phim mới thành công!");
      setIsModalOpen(false); // Đóng modal
      setFormData({
        title: "",
        posterUrl: "",
        trailerUrl: "",
        duration: "",
        ageRating: "C13",
        status: "COMING_SOON",
        filmGenres: "",
        director: "",
        cast: "",
        country: "Việt Nam",
        language: "Tiếng Việt",
        releaseDate: "",
        description: "",
      });

      // Thay vì gọi hàm, ta cộng biến refreshKey lên 1.
      // useEffect ở trên thấy biến đổi sẽ tự động chạy lại kéo phim mới về!
      setRefreshKey((prev) => prev + 1); // Gọi lại API để làm mới cái bảng
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      {/* HEADER CỦA TRANG QUẢN LÝ */}
      <div className="flex items-center justify-between mb-8 border-b-2 border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Film className="w-8 h-8 text-amber-500" />
          <h1 className="text-3xl font-black text-white uppercase tracking-wider">
            Quản Lý Phim
          </h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-5 h-5" /> Thêm Phim Mới
        </button>
      </div>

      {/* BẢNG DANH SÁCH PHIM */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-10 text-center text-amber-500 font-bold animate-pulse">
            Đang tải dữ liệu...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-slate-800 text-slate-400 text-sm uppercase tracking-wider">
                  <th className="p-4 font-bold">Tên Phim</th>
                  <th className="p-4 font-bold">Thời Lượng</th>
                  <th className="p-4 font-bold">Phân Loại</th>
                  <th className="p-4 font-bold">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-300">
                {movies.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-4 font-bold text-white flex items-center gap-3">
                      <img
                        src={m.posterUrl}
                        alt="poster"
                        className="w-10 h-14 object-cover rounded"
                      />
                      {m.title}
                    </td>
                    <td className="p-4">{m.duration} phút</td>
                    <td className="p-4">
                      <span className="bg-red-500/10 text-red-500 px-2 py-1 rounded font-bold">
                        {m.ageRating}
                      </span>
                    </td>
                    <td className="p-4">
                      {m.status === "NOW_PLAYING" && (
                        <span className="text-green-500 font-bold">
                          Đang chiếu
                        </span>
                      )}
                      {m.status === "COMING_SOON" && (
                        <span className="text-amber-500 font-bold">
                          Sắp chiếu
                        </span>
                      )}
                      {m.status === "ARCHIVED" && (
                        <span className="text-slate-500 font-bold">Đã gỡ</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* MODAL THÊM PHIM MỚI */}
      {/* ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-4xl relative overflow-hidden transform transition-all flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-800">
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">
                Thêm Phim Mới
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 bg-slate-800/50 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Vùng cuộn của Form */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form
                id="movieForm"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Dòng 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">
                      Tên phim *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:border-amber-500 outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">
                      Thời lượng (Phút) *
                    </label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:border-amber-500 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Dòng 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">
                      Link Ảnh Poster *
                    </label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={formData.posterUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, posterUrl: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:border-amber-500 outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">
                      Link YouTube Trailer
                    </label>
                    <input
                      type="text"
                      placeholder="https://youtube.com/watch?v=..."
                      value={formData.trailerUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, trailerUrl: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* Dòng 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">
                      Phân loại tuổi
                    </label>
                    <select
                      value={formData.ageRating}
                      onChange={(e) =>
                        setFormData({ ...formData, ageRating: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:border-amber-500 outline-none"
                    >
                      <option value="K">K (Mọi lứa tuổi)</option>
                      <option value="C13">C13</option>
                      <option value="C16">C16</option>
                      <option value="C18">C18</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">
                      Trạng thái
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:border-amber-500 outline-none"
                    >
                      <option value="NOW_PLAYING">Đang chiếu</option>
                      <option value="COMING_SOON">Sắp chiếu</option>
                      <option value="ARCHIVED">Lưu trữ (Ẩn)</option>
                    </select>
                  </div>
                  <div className="space-y-2" style={{ colorScheme: "dark" }}>
                    <label className="text-sm font-bold text-slate-400">
                      Ngày ra mắt
                    </label>
                    <input
                      type="date"
                      value={formData.releaseDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          releaseDate: e.target.value,
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* Dòng 4 */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400">
                    Mô tả Nội dung phim
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 focus:border-amber-500 outline-none resize-none"
                  ></textarea>
                </div>
              </form>
            </div>

            {/* NÚT SUBMIT NẰM Ở CHÂN MODAL */}
            <div className="p-6 border-t border-slate-800 flex justify-end gap-4 bg-slate-900">
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="px-6 py-2.5 rounded-xl font-bold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                HỦY BỎ
              </button>
              <button
                form="movieForm"
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2.5 rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-lg cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}{" "}
                LƯU PHIM MỚI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMoviesPage;
