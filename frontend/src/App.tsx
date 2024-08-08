



import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
 
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import SignPage from "./pages/SignPage/SignPage";
import Navbar from "./components/Navbar/Navbar";
import ContactPage from "./pages/ContactPage/ContactPage"
import ErrorPage from "./pages/ErrorPage"
import Footer from "./components/Footer/Footer";
import { Logout } from "./pages/Logout";
import ServicePage from "./pages/ServicePage/ServicePage";
import AdminLayout from "./components/Layout/Admin-Layout";
import AdminMessages from "./pages/AdminPages/Admin-Messages";
import AdminUsers from "./pages/AdminPages/Admin-Users";
import AdminHome from "./pages/AdminPages/Admin-Home";
import AdminUpdate from "./pages/AdminPages/Admin-Update";
import AdminServices from "./pages/AdminPages/Admin-Services";



function App() {

  return (
    <>
      <div className="w-full  ">
        
        <Router>
        <Navbar />
          
          <Routes>
            <Route path="/"  element={<HomePage />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/service" element={<ServicePage />} />
            {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<ErrorPage />} />

            <Route path="/admin" element={<AdminLayout/>}>
              <Route path="" element={<AdminHome/>}/>
              <Route path="users" element={<AdminUsers/>}  />
              <Route path="users/:id/edit" element={<AdminUpdate/>}  />
              <Route path="contacts" element={<AdminMessages/>}  />
              <Route path="services" element={<AdminServices/>}  />
              
            </Route>
          </Routes>
          
          <Footer/>
        </Router>
      </div>
    </>
  );
}

export default App;
