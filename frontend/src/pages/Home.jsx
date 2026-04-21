// import { Link } from "react-router-dom";


// const Home= () => {

//   const user = JSON.parse(localStorage.getItem("currentUser"));

//   if(!user){
//     return <div>Please login first</div>
//   }
//   return (
//     <div
//       className="relative h-[100vh] bg-cover bg-center"
//       style={{ backgroundImage: "url('/images/bank.png')" }}
//     >
//       {/* Dark overlay */}
//       {/* <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
//       <div className="absolute inset-0 top-0 w-full h-screen bg-gray-700/70"></div> */}
//       <div className="absolute inset-0 top-20 flex justify-around items-start px-4">
//         <h2 className="text-xl sm:text-2xl md:text-3xl text-white font-serif font-bold">
//           Horizon Bank
//         </h2>

//         <h2 className="hidden sm:block text-xl sm:text-2xl md:text-3xl text-white font-serif font-bold">
//           Horizon Bank
//         </h2>

//         <h2 className="hidden md:block text-xl sm:text-2xl md:text-3xl text-white font-serif font-bold">
//           Horizon Bank
//         </h2>
//       </div>

//       {/* Content on image */}
//       <div className=" w-full md:w-1/2 absolute inset-0 flex justify-center items-center px-4 sm:px-8">
//         <div className="bg-[#8fb9a8] py-10 rounded-3xl">
//           <div className=" p-8 rounded shadow w-96">
//             <h2 className="flex items-center justify-center mb-3">Account Number</h2>

//             <h2 className="flex items-center justify-center mb-5">XXXX XXXX XXXX</h2>
//             <h2 className="flex items-center justify-center mb-3">Account balance</h2>
//             <h2 className="flex items-center justify-center mb-3">$10000</h2>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center justify-between">
//                 <button className="text-blue-900 font-semibold hover:underline">
//               <Link to="/history">View History</Link>
//               </button>
//               </div>
//               <button className="text-blue-900 font-semibold hover:underline">
//               <Link to="/home1">More</Link>
//               </button>
//           </div>

//             </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;



import { Link } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    return <div>Please login first</div>;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bank.png')" }}
    >
      {/* Horizon Bank headings */}
      {/* Horizon Bank headings - pointer-events-none so it doesn't block clicks */}
<div className="absolute inset-0 top-20 flex justify-around items-start px-4 pointer-events-none">
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

      {/* Card */}
      <div className="w-full md:w-1/2 min-h-screen flex justify-center items-center px-4 sm:px-8">
        <div className="bg-[#8fb9a8] py-10 rounded-3xl">
          <div className="p-8 rounded shadow w-96">
            <h2 className="flex items-center justify-center mb-3 font-serif text-lg">
              Account Number
            </h2>
            <h2 className="flex items-center justify-center mb-5 font-bold text-xl">
              {user.accountNumber}
            </h2>
            <h2 className="flex items-center justify-center mb-3 font-serif text-lg">
              Account Balance
            </h2>
            <h2 className="flex items-center justify-center mb-6 font-bold text-2xl">
              {user.balance}
            </h2>
            <div className="flex items-center justify-between text-blue-500">
              <Link to="/history">View History</Link>
              <Link to="/home1">More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;