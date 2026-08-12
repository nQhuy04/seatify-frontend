// Thêm chữ 'type' trước ReactNode để làm vui lòng TypeScript
import { createContext, useContext, useState, type ReactNode } from "react";

// Định nghĩa khuôn
interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  phone: string;
  birthDay: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // CÁCH LÀM MỚI (Lazy Initialization):
  // Lục két sắt ngay tại lúc khởi tạo state, bỏ luôn useEffect. Giải quyết triệt để lỗi giật màn hình!
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      return JSON.parse(storedUser);
    }
    return null;
  });

  const login = (userData: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Đặt bùa tắt cảnh báo ESLint cho dòng dưới đây vì đây là chuẩn quốc tế
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth phải được bọc trong AuthProvider");
  return context;
};
