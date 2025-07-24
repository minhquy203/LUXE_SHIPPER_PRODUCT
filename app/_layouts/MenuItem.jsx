import Link from "next/link";

export default function MenuItem({ label, icon, isActive = false, url = "#" }) {
  return (
    <Link
      href={url}
      className={`flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 ${
        isActive && "active-menu"
      }`}
    >
      <i
        className={`${icon} w-6 text-center mr-3 ${isActive && "text-accent"}`}
      ></i>
      <span className="menu-text">{label}</span>
    </Link>
  );
}
