


import { Upload } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    address: "",
    phone: "",
    age: "",
    dob: "",
    aadhar: "",
    pan: "",
    password: "",
    confirmPassword: "",
    initialAmount: "",
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, profilePic: file }));
  }

  async function handleRegister() {
    // Validate all required fields including email
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.initialAmount
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (Number(formData.initialAmount) <= 0) {
      toast.error("Initial amount must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      // Build FormData — only send fields the backend expects
      const formDataToSend = new FormData();
      const allowedFields = [
        "name", "username", "email", "password",
        "address", "phone", "age", "dob", "aadhar", "pan",
      ];

      allowedFields.forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (formData.profilePic instanceof File) {
        formDataToSend.append("profilePic", formData.profilePic);
      }

      // Step 1: Register
      await axios.post(`${API}/api/users/register`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Step 2: Login to get token
      const loginRes = await axios.post(`${API}/api/users/login`, {
        identifier: formData.username,
        password: formData.password,
      });

      const token = loginRes.data.token;
      localStorage.setItem("token", token);

      // Step 3: Fetch profile
      const profileRes = await axios.get(`${API}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("currentUser", JSON.stringify(profileRes.data));

      // Step 4: Deposit initial amount
      await axios.post(
        `${API}/api/transactions/deposit`,
        { amount: Number(formData.initialAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Registration and Initial Deposit Successful!");
      navigate("/");

    } catch (error) {
      console.log("ERROR DETAIL:", error.response?.data);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen w-full flex gap-10'>
      <div className='hidden md:flex w-1/3 items-center justify-center bg-black/75'>
        <img
          src="/images/bank.png"
          alt="img"
          className="h-full w-full object-cover"
          style={{ objectPosition: "79% 45%" }}
        />
      </div>

      <div className='w-full md:w-2/3 items-center justify-center bg-white m-10'>
        <div className='bg-emerald-400 rounded-lg p-2 sm:p-4'>

          <h1 className='text-2xl font-serif font-bold pb-8 pt-6 text-center'>
            Register
          </h1>

          <div className='w-full grid grid-cols-1 sm:grid-cols-2'>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Name *</label>
              <input
                type="text"
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Username *</label>
              <input
                type="text"
                name='username'
                value={formData.username}
                onChange={handleChange}
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Address</label>
              <textarea
                name='address'
                value={formData.address}
                onChange={handleChange}
                className='w-3/4 bg-transparent border border-black focus:outline-none'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Email *</label>
              <input
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Phone Number</label>
              <input
                type="number"
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Aadhar Number</label>
              <input
                type="number"
                name='aadhar'
                value={formData.aadhar}
                onChange={handleChange}
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Age</label>
              <input
                type="number"
                name='age'
                value={formData.age}
                onChange={handleChange}
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Pancard Number</label>
              <input
                type="text"
                name='pan'
                value={formData.pan}
                onChange={handleChange}
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Initial Amount *</label>
              <input
                type="number"
                name='initialAmount'
                value={formData.initialAmount}
                onChange={handleChange}
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>DOB</label>
              <input
                type="date"
                name='dob'
                value={formData.dob}
                onChange={handleChange}
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Password *</label>
              <input
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-md mb-1'>Confirm Password *</label>
              <input
                type="password"
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                className='w-3/4 bg-transparent border-b border-black focus:outline-none'
              />
            </div>

            <div className='mt-6 mb-6'>
              <label className='flex gap-2 items-center justify-center cursor-pointer'>
                <Upload size={24} /> Upload Image
                <input
                  type="file"
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageUpload}
                />
              </label>
              {preview && (
                <div className='flex justify-center mt-2'>
                  <img
                    src={preview}
                    alt="preview"
                    className='w-20 h-20 rounded-full object-cover border'
                  />
                </div>
              )}
            </div>

          </div>

          <div className='flex justify-center items-center'>
            <button
              onClick={handleRegister}
              disabled={loading}
              className="font-semibold bg-gray-100 rounded-full px-20 py-2 hover:bg-blue-400 active:scale-95 transition mb-6 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          <p className='text-sm text-center mb-4'>
            Already have an account?{" "}
            <Link to="/" className='font-semibold hover:underline'>
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;