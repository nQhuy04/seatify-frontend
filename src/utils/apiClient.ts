const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchClient = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Có lỗi xảy ra từ máy chủ!");
  }

  return await response.json();
};
