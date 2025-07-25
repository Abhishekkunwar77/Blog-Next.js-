import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <ToastContainer autoClose={1500} theme="dark" />
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-green-600">
            <h3 className="font-medium">Admin Panel</h3>
            <Link
              className="flex items-center gap-2 font-medium  px-2 sm:py-3 sm:px-4 border border-green-700 "
              href="/"
              target='_blank'
              title='Switch to User Mode'
            >
              User Panel
            </Link>
            <Image src={assets.profile_icon} width={40} alt="" />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
