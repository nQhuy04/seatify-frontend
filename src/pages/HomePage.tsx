const HomePage = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 border-l-4 border-yellow-400 pl-3">
        Phim Đang Chiếu
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="bg-white p-4 rounded-lg shadow-md h-64 flex items-center justify-center border-dashed border-2 border-gray-300">
          Khu vực Card Phim
        </div>
      </div>
    </div>
  );
};

export default HomePage;