import { Link } from "react-router-dom";

import React, { useState, useEffect } from 'react';  
import axios from "axios";                            


const API = import.meta.env.VITE_API_URL;

const Dashboard = () => {

  const [usersCount , setUsersCount] = useState(0);

  useEffect(()=>{

    const fetchUsers = async () => {
      try{
        const token = localStorage.getItem("adminToken");

        const res = await axios.get(
          `${API}/api/admin/users`,
          {
            headers:{Authorization:`Bearer ${token}`}
          }
        );
        setUsersCount(res.data.totalUsers);
      }catch(error){
        console.log("Error fetching users",error);
      }
    };

    fetchUsers()

  },[]);

  return (
    <div
      className="relative h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bank.png')" }}
    >
      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      <div className="absolute inset-0 top-0 w-full h-screen bg-gray-700/70"></div> */}
      <div className="absolute inset-0 top-20 flex justify-around items-start px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-white font-serif font-bold">
          Horizon Bank
        </h2>

        <h2 className="hidden sm:block text-xl sm:text-2xl md:text-3xl text-white font-serif font-bold">
          Horizon Bank
        </h2>

        <h2 className="hidden md:block text-xl sm:text-2xl md:text-3xl text-white font-serif font-bold">
          Horizon Bank
        </h2>
      </div>
      <div className="absolute bg-cyan-900 w-52 h-52 top-28 left-28 rounded-2xl z-10 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-serif font-bold items-center">No. of Users</h2>
            <p className="text-3xl font-sans font-bold mt-2 ">{usersCount}</p>
        </div>

      {/* Content on image */}
      
    </div>
  );
}

export default Dashboard;

