"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [admin, setAdmin] = useState(false); 
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Abhishek Kunwar",
    authorImg: "/author_img.png",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminLoggedIn");
    if (isAdmin) {
      setAdmin(true);
    }
  }, []);

  const adminLoginHandler = (e) => {
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    e.preventDefault();
    if (
      credentials.username === adminUsername &&
      credentials.password === adminPassword
    ) {
      setAdmin(true);
      localStorage.setItem("adminLoggedIn", "true"); // Store login state
      toast.success("Admin Login Successful");
    } else {
      toast.error("Invalid Admin Credentials");
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Abhishek Kunwar",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error("Error uploading blog post.");
      }
    } catch (error) {
      toast.error("Error submitting form.");
    }
  };

  return (
    <div className="p-5">
      {!admin ? (
        <form
          onSubmit={adminLoginHandler}
          className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="email"
            name="username"
            placeholder="Email"
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="w-full px-4 py-2 mb-4 border rounded-md"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="pt-5 px-5 sm:pt-12 sm:pl-16"
        >
          <p className="text-xl">Upload Thumbnail</p>
          <label htmlFor="image" className="cursor-pointer">
            <Image
              className="mt-4 rounded-lg border-4 border-green-600"
              src={
                image
                  ? URL.createObjectURL(image)
                  : assets.upload_area || "/default_upload.png"
              }
              width={120}
              height={50}
              alt="Upload Thumbnail"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
          <p className="text-xl mt-4">Blog Title</p>
          <input
            name="title"
            onChange={onChangeHandler}
            value={data.title}
            className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
            type="text"
            placeholder="Type here"
            required
          />
          <p className="text-xl mt-4">Blog Description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
            placeholder="Write content here"
            rows={6}
            required
          />
          <p className="text-xl mt-4">Blog Category</p>
          <select
            className="w-40 mt-4 px-4 py-3 border text-gray-500"
            name="category"
            onChange={onChangeHandler}
            value={data.category}
          >
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="Travel">Travel</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <br />
          <button
            className="mt-8 w-40 h-12 bg-green-600 text-white"
            type="submit"
          >
            Add Blog
          </button>
        </form>
      )}
    </div>
  );
};

export default Page;
