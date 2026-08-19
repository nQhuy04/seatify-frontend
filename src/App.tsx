import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import BookingPage from "./pages/BookingPage";
import CheckoutPage from "./pages/CheckoutPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import MovieListPage from "./pages/MovieListPage";
import AdminShowtimePage from "./pages/Admin/AdminShowtimePage";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import AdminMoviesPage from "./pages/Admin/AdminMoviePage";
import AdminRoute from "./components/AdminRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <Toaster richColors position="top-right" duration={3000} />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="movies/:movieId" element={<MovieDetailPage />} />
            <Route path="booking/:showtimeId" element={<BookingPage />} />
            <Route path="checkout/:bookingId" element={<CheckoutPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="movies-status/:status" element={<MovieListPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="showtimes" element={<AdminShowtimePage />} />
              <Route path="movies" element={<AdminMoviesPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
