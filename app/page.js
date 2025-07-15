'use client'
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import  Header from "@/Components/Header"
import Navbar from '@/Components/Navbar';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
   <>
   <ToastContainer autoClose={1500} theme="dark"/>
   <Navbar/>
<Header/>
<BlogList/>
<Footer/>
  </>
  )
}
