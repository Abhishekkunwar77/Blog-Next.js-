import React, { useState } from "react";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { assets } from "@/Assets/assets";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [popupType, setPopupType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const togglePopup = (type) => {
    setPopupType(type);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_q9c2lsh",
        "template_kyv1o83",
        formData,
        "9kXyoF1tuuCiGZA7r"
      )
      .then(() => {
        toast.success("Message sent successfully!", { position: "top-right" });
        setPopupType(null);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() =>
        toast.error("Failed to send message. Try again.", {
          position: "top-center",
        })
      );
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-black  px-8 py-1 text-white">
      <div className="flex flex-col items-center sm:items-start">
        <Image src={assets.logo_white} alt="Logo" width={120} height={40} />
        <p className="text-sm mt-2">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm sm:text-lg my-4 sm:my-10 px-4">
        <button
          onClick={() => togglePopup("about")}
          className="hover:text-gray-400 transition cursor-pointer"
        >
          About
        </button>
        <a href="#" className="hover:text-gray-400 transition cursor-pointer">
          Privacy Policy
        </a>
        <button
          onClick={() => togglePopup("contact")}
          className="hover:text-gray-400 transition cursor-pointer"
        >
          Contact
        </button>
      </div>
      {/* Right Section - Social Icons */}
      <div className="flex gap-4 mt-4 sm:mt-0">
        <a href="https://www.facebook.com/nishu.kunwar.31" target="_blank">
          <FaFacebook size={28} className="hover:text-blue-500 transition" />
        </a>
        <a href="https://x.com/kunwar_abh29597" target="_blank">
          <FaTwitter size={28} className="hover:text-blue-400 transition" />
        </a>
        <a href="https://www.instagram.com/abhishek_kunwar23/" target="_blank">
          <FaInstagram size={28} className="hover:text-pink-500 transition" />
        </a>
        <a
          href="https://www.linkedin.com/in/abhishek-kunwar55/"
          target="_blank"
        >
          <FaLinkedin size={28} className="hover:text-blue-600 transition" />
        </a>
        <a href="https://github.com/Abhishekkunwar77" target="_blank">
          <FaGithub size={28} className="hover:text-gray-500 transition" />
        </a>
      </div>
      {popupType && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full border-3 border-cyan-500 relative">
            <FaTimes
              className="absolute top-3 right-3 text-2xl text-gray-600 cursor-pointer hover:text-red-500 transition"
              onClick={() => setPopupType(null)}
            />

            {popupType === "about" && (
              <div className="text-black">
                <h2 className="text-xl font-semibold mb-4 text-center text-green-600 ">
                  About Us
                </h2>
                <p>
                  Welcome to our blog—a space where ideas, knowledge, and
                  creativity come together! We share insightful content on
                  topics like technology, programming, personal growth, and
                  industry trends. Whether you're here to learn, stay updated,
                  or explore new perspectives, our goal is to make every post
                  engaging and valuable.
                </p>
              </div>
            )}

            {popupType === "contact" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-center text-black">
                  Contact Me
                </h2>
                <form onSubmit={sendEmail} className="flex flex-col gap-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="p-2 border rounded text-black"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="p-2 border rounded text-black"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className="p-2 border rounded text-black"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
