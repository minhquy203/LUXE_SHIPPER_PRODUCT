export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-medium">Tổng Quan Bảng Điều Khiển</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-accent">
          <i className="fas fa-bell"></i>
        </button>

        <div className="relative">
          <button className="flex items-center space-x-2 focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <i className="fas fa-user text-gray-500"></i>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
