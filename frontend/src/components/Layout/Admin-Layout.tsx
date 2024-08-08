import React from "react";
import { Navigate, NavLink, Outlet} from "react-router-dom";

import { useAuth } from "../../store/auth";

const AdminLayout = () => {
 
  const {user, isLoading} = useAuth();

  if(isLoading)
    return <h1>Loading...</h1>

  let isAdmin = user.email == import.meta.env.VITE_ADMIN_MAIL;
 
  

  
  if(!isAdmin){
    
    return <>
    <Navigate to="/"></Navigate> 
    </>
  }

  return (
    <>
    <div className="flex gap-3">
      <header className="border-r p-2 h-[51rem]" >
        <div className="container ">
          <nav >
            <ul className="text-2xl  flex flex-col gap-4 p-10 w-fit mt-28 ">
              <li>
                <NavLink to="/admin/users" className="flex items-left text-blue-700 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    style={{ marginRight: "13px" }}
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts" className="flex items-center text-blue-700 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    style={{ marginRight: "13px" }}
                    fill="currentColor"
                    className="bi bi-card-list"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                  </svg>
                  contacts
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/services" className="flex items-center text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    style={{ marginRight: "13px" }}
                    fill="currentColor"
                    className="bi bi-chat-left-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  </svg>
                  services
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin" className="flex items-center text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    style={{ marginRight: "13px" }}
                    fill="currentColor"
                    className="bi bi-house-door-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                  </svg>
                  home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      
      </header>
      <Outlet />
      </div>
      
    </>
  );
};

export default AdminLayout;
