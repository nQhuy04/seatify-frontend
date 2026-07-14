import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tất cả các trang nằm trong Route này sẽ dùng chung MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* path="/" tương ứng với Outlet, nghĩa là trang mặc định hiển thị */}
          <Route index element={<HomePage />} />
          
          {/* Bất kỳ URL nào gõ sai sẽ nhảy vào trang 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;