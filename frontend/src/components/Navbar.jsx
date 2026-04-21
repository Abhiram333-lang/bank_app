import { Bell, LogOut, Menu, User, X } from "lucide-react";
import { useState , useEffect } from "react";
import toast from "react-hot-toast";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(storedUser);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
      setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  const firstLetter = user?.name?.charAt(0)?.toUpperCase();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token")

    window.dispatchEvent(new Event("storage"));

    toast.success("LogOut Successful")
    navigate("/");
  };

  return (
    <>
    <nav className="bg-[#8fb9a8]  px-8 py-4 flex justify-between items-center text-xl font-bold">
              <Link to="/profile" className="flex items-center">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border border-white"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white text-red-500 flex items-center justify-center font-bold text-lg">
              {firstLetter ? firstLetter : <User />}
            </div>
          )}
        </Link>

      <div>
        <Link to="/home" className="hover:text-yellow-300">
          Home
        </Link>
      </div>
      
      <div className="flex gap-6 items-center">
        <Link to="/notifications">
            <Bell className="w-6 h-6" />
          </Link>
        <Link to="/deposit" className="hover:text-yellow-300">
          Deposit
        </Link>
        <Link to="/withdraw" className="hover:text-yellow-300">
          Withdraw
        </Link>
        
        <button
          onClick={handleLogout}
          className=" px-4 py-1 rounded "
        >
          [-&gt;
        </button>
        <button onClick={() => setOpen(!open)} className="sm:hidden">
            {open ? <X /> : <Menu />}
          </button>
      </div>
    </nav>
    {
        open && (
          <div className="fixed top-16 left-0 w-full bg-emerald-300 sm:hidden z-[998] shadow-lg">
            <div className="flex flex-col gap-4 p-4 font-semibold">
              <Link to="/deposit" onClick={()=>setOpen(false)}>
                Deposit
              </Link>

              <Link to="/withdraw" onClick={()=> setOpen(false)}>
                Withdrawal
              </Link>

              <button onClick={handleLogout}>
                <LogOut className="w-6 h-6 hover:text-red-700 hover:scale-95" />
              </button>


            </div>
          </div>
        )
      }
    <Outlet />
    </>
  );
}
export default Navbar;
