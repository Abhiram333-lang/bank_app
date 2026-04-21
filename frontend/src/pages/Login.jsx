


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const DUMMY_USERS = [
//   { username: "bankadmin", password: "bank123", redirect: "/bank/dashboard" },
//   { username: "user", password: "user123", redirect: "/home" },
// ];

// export default function Login({ setIsLoggedIn }) {
//   const navigate = useNavigate();
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = () => {
//     const matched = DUMMY_USERS.find(
//       (u) => u.username === identifier && u.password === password
//     );

//     if (matched) {
//       setIsLoggedIn(true);
//       navigate(matched.redirect);
//     } else {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="hidden md:flex w-1/2 bg-cover bg-center">
//         <img src="/images/bank.png" alt="" />
//       </div>
//       <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
//         <div className="bg-[#8fb9a8] flex w-full md:w-1/2 justify-center items-center py-10 rounded-3xl">
//           <div className="p-8 rounded shadow w-96">
//             <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
//             <br /><br />

//             <div className="w-full mb-12">
//               <label className="block text-xl font-serif mb-2">Username</label>
//               <input
//                 type="text"
//                 value={identifier}
//                 onChange={(e) => { setIdentifier(e.target.value); setError(""); }}
//                 required
//                 className="w-3/4 bg-transparent border-b border-black focus:outline-none focus:border-gray-700"
//               />
//             </div>

//             <div className="w-full mb-4">
//               <label className="block text-xl font-serif mb-2">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => { setPassword(e.target.value); setError(""); }}
//                 required
//                 className="w-3/4 bg-transparent border-b border-black focus:outline-none focus:border-gray-700"
//               />
//             </div>

//             {error && (
//               <p className="text-red-600 text-sm text-center mb-4">{error}</p>
//             )}

//             <div className="flex justify-center items-center mt-10">
//               <button
//                 className="bg-gray-200 px-7 py-3 rounded-2xl text-xl font-serif shadow-md hover:bg-gray-300 transition"
//                 onClick={handleLogin}
//               >
//                 Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import { Shuffle } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

const ADMIN_USERS = [
  { username: "bankadmin", password: "bank123", redirect: "/bank/dashboard" },
];

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!identifier || !password) {
      toast.error("Please enter email/username and password");
      return;
    }

    // Check admin dummy data first
    const adminMatch = ADMIN_USERS.find(
      (u) => u.username === identifier && u.password === password
    );

    if (adminMatch) {
      if (setIsLoggedIn) setIsLoggedIn(true);
      toast.success("Admin Login Successful");
      navigate(adminMatch.redirect);
      return;
    }

    // Regular user — use API
    try {
      const response = await axios.post(`${API}/api/users/login`, {
        identifier,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (setIsLoggedIn) setIsLoggedIn(true);
      toast.success("Login Successful");
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden sm:flex md:w-1/3 items-center justify-center bg-black">
        <img
          src="/images/bank.png"
          alt="img"
          className="h-full w-full object-cover"
          style={{ objectPosition: "79% 45%" }}
        />
      </div>

      <div className="w-full md:w-2/3 flex items-center justify-center bg-white px-4">
        <div className="bg-emerald-400 rounded-lg p-6 sm:p-8 w-full max-w-[400px] relative">
          <h1 className="text-2xl font-serif font-bold mb-10 pt-2 text-center">
            Login
          </h1>

          <div className="mb-4">
            <label className="block text-md mb-1">Email or Username</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-3/4 bg-transparent border-b border-black focus:outline-none focus:border-gray-700"
            />
          </div>

          <div className="mb-10">
            <label className="block text-md mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-3/4 bg-transparent border-b border-black focus:outline-none focus:border-gray-700"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className="font-semibold bg-gray-100 rounded-full px-10 py-2 hover:bg-blue-400 active:scale-90 transition-transform mb-4"
            >
              Login
            </button>
          </div>

          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold hover:underline">
              Register
            </Link>
          </p>

          {/* <div className="flex justify-end">
            <button className="bg-white p-1 rounded-xl absolute bottom-3 right-3 hover:text-rose-700 active:scale-90 transition-transform">
              <Link to="/bank">
                <Shuffle />
              </Link>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;