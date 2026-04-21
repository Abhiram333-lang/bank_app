import { Link, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function BankNav({ setIsLoggedIn }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("adminToken");
    toast.success("LogOut Successful")
    navigate("/");
  }

  return (
    <>
    <nav className="bg-[#8fb9a8]  px-8 py-4 flex justify-between items-center text-xl font-bold">
      <img src="/images/bank.png" alt="" className="w-12 h-12 rounded-full"/>
      <div>
        <Link to="/bank/dashboard" className="hover:text-yellow-300">
          Home
        </Link>
      </div>
      
      <div className="flex gap-6 items-center">
        
        <Link to="/bank/users" className="hover:text-yellow-300">  {/* ✅ was /bank/user */}
  View User
</Link>
        
        
        <button
          onClick={handleLogout}
          className=" px-4 py-1 rounded "
        >
          [-&gt;
        </button>
      </div>
    </nav>
    <Outlet/>
    </>
  );
}
