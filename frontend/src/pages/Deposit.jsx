
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL;

export default function Deposit() {

  const [amount , setAmount] = useState("")

  const user = JSON.parse(localStorage.getItem("currentUser"));

  async function onSubmit(){

    if(!amount || amount <= 0){
      toast.error("Please enter a valid amount")
      return;
    }

    try{
      const token = localStorage.getItem("token");

      const response = await axios.post(`${API}/api/transactions/deposit`,{
        amount:Number(amount)
      },{
        headers:{Authorization:`Bearer ${token}`}
      });

      const updatedUser = {
        ...user,
        balance: response.data.balance,
      };

      localStorage.setItem("currentUser",JSON.stringify(updatedUser));
      toast.success("Amount deposited successfully");
      setAmount("");

    }catch(error){
      toast.error(error.response?.data?.message || "Deposit failed");
    }


  }
  return(
    <div
      className="relative h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bank.png')" }}
    >
      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      <div className="absolute inset-0 top-0 w-full h-screen bg-gray-700/70"></div> */}
      
      {/* Content on image */}
      <div className=" w-full md:w-1/2 absolute inset-0 flex justify-center items-center px-4 sm:px-8">
        <div className="bg-[#8fb9a8] py-10 rounded-3xl">
          <div className=" p-8 rounded shadow w-96">
            <h4 className="text-lg sm:text-xl font-serif font-semibold mb-4 text-center">
              Deposit
            </h4>
            <h2 className="font-semibold mb-3">Account Number</h2>
            <h2 className=" mb-5">XXXX XXXX XXXX</h2>
            <p className="tracking-widest text-base sm:text-lg font-mono my-4 opacity-75 text-left">
              {user.accountNumber}
            </p>

            <h2 className="font-semibold mb-3">Branch </h2>
            <h2 className=" mb-3">BranchName</h2>
            <p className="tracking-widest text-base sm:text-lg font-mono my-4  opacity-75 text-left">
              {user.branch}
            </p>
            <h2 className="font-semibold mb-3">Amount</h2>
            <h2 className=" mb-3">$10000</h2>
            <input 
            type="number"
            value={amount}
            onChange={(e)=> setAmount(e.target.value)}
            placeholder='Enter Amount'
            className="bg-transparent text-base  outline-none placeholder-gray-700/75  sm:text-lg font-mono p-2  text-left" 
            />

            
            <div className="flex items-center justify-center" onClick={onSubmit} >
              <button className=" bg-white px-6 py-2 rounded-2xl">Deposit</button>
            </div>
            
            </div>

        </div>
      </div>
    </div>
  );
}
