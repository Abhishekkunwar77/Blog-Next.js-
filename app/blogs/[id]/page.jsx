"use client";
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {use} from "react"
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,

} from "react-icons/fa";

const page = ({ params }) => {
  const [data, setdata] = useState(null);
  const resolvedParams= use(params);



  useEffect(() => {
    if (!resolvedParams) return;

    const fetchBlogdata = async () => {
      const response = await axios.get("/api/blog", {
        params: {
          id: resolvedParams.id,
        },
      });
      setdata(response.data);
    };

    fetchBlogdata();
  }, [resolvedParams]);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              alt=""
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-green-500 shadow-[-7px_7px_0px_#22c55e] text-green-700">
            Get Started
            <Image src={assets.arrow} alt="Arrow icon" width={20} height={20} />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={data.authorImg}
            width={60}
            height={60}
            alt=""
          />
          <p className="mt-1 pb-2 text-lg max-w[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white"
          src={data.image}
          width={1280}
          height={720}
          alt=""
        />

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <div className="my-24">
          <p className="text-black font font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex gap-2">
            <a href="https://www.facebook.com" target="_blank">
              <FaFacebook
                size={28}
                className="hover:text-blue-500 transition"
              />
            </a>
            <a href="https://x.com" target="_blank">
              <FaTwitter size={28} className="hover:text-blue-400 transition" />
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <FaInstagram
                size={28}
                className="hover:text-pink-500 transition"
              />
            </a>
            <a href="https://www.linkedin.com/" target="_blank">
              <FaLinkedin
                size={28}
                className="hover:text-blue-600 transition"
              />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;
