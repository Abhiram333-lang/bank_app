// import { Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import Deposit from "./pages/Deposit";
// import Withdraw from "./pages/Withdraw";
// import ProtectedLayout from "./layouts/ProtectedLayout";
// import History from "./pages/History";
// import Home1 from "./pages/home1";






// import BankDashboard from './pages/bank/BankHome';
// import BankLogin from './pages/bank/BankLogin';
// import Users from './pages/bank/Users';
// import BankNav from './components/BankNav';
// import BankView from './components/BankView';
// import BankHistory from './components/BankHistory';

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//       <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//       <Route path="/register" element={<Register />} />

//       {/* Protected Routes */}
//       <Route
//         element={
//           isLoggedIn ? (
//             <ProtectedLayout setIsLoggedIn={setIsLoggedIn} />
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       >
//         <Route path="/home" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/home1" element={<Home1 />} />
//         <Route path="/deposit" element={<Deposit />} />
//         <Route path="/withdraw" element={<Withdraw />} />
//         <Route path="/history" element={<History />} />
//       </Route>





//        <Route path="/bank" element={<BankLogin/>} />

//           <Route element={<BankNav/>}>
//           <Route path="/bank/bankhome" element={<BankHome/>} />
//           <Route path="/bank/users" element={<Users/>} />
//           <Route path="/bank/users/view/:id" element={<BankView/>} />
//           <Route path="/bank/users/history" element={<BankHistory/>} />
//           </Route>
//     </Routes>
//   );
// }

// import './App.css'
// import {Routes ,Route} from 'react-router-dom'

//   //user
// import Register from './pages/Register';
// import Dashboard from './pages/Home';
// import Login from './pages/Login';
// import Deposit from './pages/Deposit';
// import Withdraw from './pages/Withdraw';
// import History from './pages/History';
// import Profile from './pages/Profile';
// import Navbar from './components/Navbar';
// import Home1 from './pages/Home1';
// import EditProfile from './components/EditProfile';
// // import Notifications from './pages/user/Notifications';


//   //bank
// import BankHome from './pages/bank/BankHome';
// import BankLogin from './pages/bank/BankLogin';
// import Users from './pages/bank/Users';
// import BankNav from './components/BankNav';
// import BankView from './components/BankView';
// import BankHistory from './components/BankHistory';
// import { Home } from 'lucide-react';


// function App() {
//   return (
//     <div>
//       <Routes>

//           <Route path="/" element={<Login/>} />
//           <Route path="/register" element={<Register/>} />
          

//           <Route element={<Navbar/>}>
//           <Route path="/home" element={<Home/>} />
//           <Route path="/deposit" element={<Deposit/>} />
//           <Route path="/withdraw" element={<Withdraw/>} />
//           <Route path="/history" element={<History/>} />
//           <Route path="/profile" element={<Profile/>} />
//           <Route path="/edit-profile" element={<EditProfile/>} />
//           <Route path="/home1" element={<Home1/>}/>
//           {/* <Route path='/notifications' element={<Notifications/>}/> */}
//           </Route>


          
//           <Route path="/bank" element={<BankLogin/>} />

//           <Route element={<BankNav/>}>
//           <Route path="/bank/home" element={<BankHome/>} />
//           <Route path="/bank/users" element={<Users/>} />
//           <Route path="/bank/users/view/:id" element={<BankView/>} />
//           <Route path="/bank/users/history" element={<BankHistory/>} />
//           </Route>

//       </Routes>
//     </div>
//   );
// }

// export default App;

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// user
import Register from './pages/Register';
import Home from './pages/Home';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import History from './pages/History';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Home1 from './pages/Home1';
import EditProfile from './components/EditProfile';
import Notifications from './pages/Notifications';

// bank
import Dashboard from './pages/bank/Dashboard';
import Login from './pages/Login';   // your single login page
import Users from './pages/bank/Users';
import BankNav from './components/BankNav';
import BankView from './components/BankView';
import BankHistory from './components/BankHistory';

function App() {
  const [ setIsLoggedIn] = useState(false);

  return (
    <div>
      <Routes>

        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {/* User routes */}
<Route element={<Navbar setIsLoggedIn={setIsLoggedIn} />}>
  <Route path="/home" element={<Home />} />
  <Route path="/deposit" element={<Deposit />} />
  <Route path="/withdraw" element={<Withdraw />} />
  <Route path="/history" element={<History />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/edit-profile" element={<EditProfile />} />
  <Route path="/home1" element={<Home1 />} />
  <Route path='/notifications' element={<Notifications/>}/>
</Route>

        {/* Bank routes */}
        <Route element={<BankNav setIsLoggedIn={setIsLoggedIn} />}>
          <Route path="/bank/dashboard" element={<Dashboard />} />
          <Route path="/bank/users" element={<Users />} />
          <Route path="/bank/users/view/:id" element={<BankView />} />
          <Route path="/bank/users/history" element={<BankHistory />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;