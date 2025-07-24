"use client";
import MenuItem from "./MenuItem";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMe } from "@/api/account";
import Image from "next/image";
import Link from "next/link";

const MENU_ITEMS = [
  {
    label: "",
    items: [
      {
        name: "Đơn Hàng",
        href: "/",
        icon: "fas fa-receipt",
      },
      {
        name: "Thống Kê Đơn Hàng",
        href: "/orders-history",
        icon: "fas fa-receipt",
      },
    ],
  },
  {
    label: "Cài Đặt",
    items: [
      {
        name: "Cài Đặt",
        href: "/settings",
        icon: "fas fa-cog",
      },
    ],
  },
];

export default function Sidebar({ isToggledSidebar, setIsToggledSidebar }) {
  const pathname = usePathname();
  const { user } = useMe();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");      // Xoá user lưu trong localStorage
    router.push('/login');                      // Điều hướng về trang đăng nhập
  };

  return (
    <div
      id="sidebar"
      className={`${isToggledSidebar ? "sidebar-expanded" : "sidebar-collapsed"
        } sidebar bg-white shadow-md`}
    >
      <div className="flex flex-col h-full">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between flex-colapsed-center">
          <div className="text-xl font-bold font-playfair flex items-center menu-text"> {/* Thêm 'flex items-center' vào đây */}
            <Link href='/' className="text-2xl font-bold font-playfair flex items-center">
              <Image
                src="https://res.cloudinary.com/dohwmkapy/image/upload/v1753079396/logo_cho_thang_phuc_tbzvgq.svg"
                alt="LUXE Logo"
                width={60}
                height={30}
                className="title-decoration pb-1"
              />
            </Link>
            <span className="text-2xl uppercase ml-2">Shipper</span>
          </div>
          <button
            id="toggle-sidebar"
            className="text-gray-500 hover:text-accent"
            onClick={() => setIsToggledSidebar(!isToggledSidebar)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div className="px-6 py-5 border-b border-gray-100 flex items-center space-x-3 flex-col-colapsed">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src={user?.avatar != '' ? user?.avatar : "/avatar.jpg"} // hoặc thay bằng URL cụ thể
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div id="user-info">
            <p className="font-medium menu-text">{user?.ho_ten || "..."}</p>
            <p className="text-xs text-gray-500 menu-text">
              Shipper
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-4">
            {MENU_ITEMS.map(({ label, items }, groupIndex) => (
              <div className="space-y-1" key={label || `group-${groupIndex}`}>
                {label && (
                  <div className="px-3 py-3 menu-text">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {label}
                    </p>
                  </div>
                )}
                {items.map((item) => (
                  <MenuItem
                    key={item.name}
                    label={item.name}
                    isActive={pathname === item.href}
                    icon={item.icon}
                    url={item.href}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100">
          <a
            href="#"
            className="flex items-center text-gray-700 hover:text-accent"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt mr-3"></i>
            <span className="menu-text">Đăng xuất</span>
          </a>
        </div>
      </div>
    </div>
  );
}
