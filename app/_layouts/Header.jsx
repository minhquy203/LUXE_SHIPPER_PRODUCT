import Link from "next/link";
import Image from "next/image";
import { useMe } from "@/api/account"; // dùng đúng hook của bạn

export default function Header() {
  const { user } = useMe(); // ⚠️ Dòng này rất quan trọng

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-medium">Tổng Quan Bảng Điều Khiển</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-accent">
          <i className="fas fa-bell"></i>
        </button>

        <Link href="/profile" className="relative">
          <button className="flex items-center space-x-2 focus:outline-none">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 relative">
              <img
              src={user?.avatar} // hoặc thay bằng URL cụ thể
              alt="Avatar"
              className="w-full h-full object-cover"
            />
            </div>
          </button>
        </Link>
      </div>
    </header>
  );
}
