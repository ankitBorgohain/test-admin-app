import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { useAuth } from "../../store/auth";

const SignPage: React.FC = () => {
  //can be used as one object of multiple use states
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    
  });
 // let name = e.target.name;
    // let value = e.target.value;
 
    const API = import.meta.env.VITE_APP_URI_API;
  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
   

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Handle login logic here
    console.log("data", user);
    try {
      const response = await fetch(`${API}/api/auth/register`,{
        method: "POST",
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log(`Sign in page response data from backend. ${res_data.message}. ${res_data.extraDetails}.`); 
      
      if(response.ok){
  
        storeTokenInLS(res_data.token)
        setUser({name:"", email: "", password: "",});
        toast.success("Regestration successful");
        navigate('/')       
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails  : res_data.message );
      }
       
      // console.log(response);
      
    } catch (error) {
      console.log(error, "register failed");
      
    }
    
  };

  

  return (
    <>
      <section className="">
        <main >
          <div className=" w-fit section-regestration  ">
            <div className="grid lg:grid-cols-2  items-center">
              {/* //registration image */}
              <div className="hidden lg:inline-block regestration-image mx-auto">
                <img
                  className=" justify-center rounded-xl"
                  src="/images/register-image.png"
                  alt="a man trying to do registeration "
                  style={{ height: "500px", width: "500px", objectFit: "fill" }}
                />
                <h2 className="m-8  text-3xl">
                  " Don't worry your password is{" "}
                  <span className="text-blue-400">secure</span> with us "
                </h2>
              </div>
              <div className="flex flex-col justify-center items-center form-registration h-[501px] ">
              <h2 className="mt-10 mb-4 text-5xl ">SignUp </h2>
                <form
                  className="flex flex-col gap-4 p-10 pt-16 h-fit bg-[#7D97F4] rounded-xl"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="flex justify-between items-center">
                    <label htmlFor="fname" className="pr-4">
                      Username
                    </label>
                    <input
                      className="lg:min-w-96 min-w-60 p-2 rounded-md"
                      onChange={handleInput}
                      value={user.name}
                      type="text"
                      name="name"
                      minLength={3}
                      autoComplete="off"
                      required
                    />
                  </div>
                  {/* {errors.name && <div className="text-red-500">{errors.name}</div>} */}

                  <div className="flex justify-between items-center">
                    <label htmlFor="email" className="pr-4">
                      Email
                    </label>
                    <input
                      className="lg:min-w-96 min-w-60 p-2 rounded-md"
                      onChange={handleInput}
                      value={user.email}
                      placeholder="john@doe.com"
                      type="text"
                      name="email"
                      autoComplete="off"
                      required
                    />
                     
                  </div>
                  {/* Display errors */}
                    {/* {errors.email && <div className="text-red-500">{errors.email}</div>} */}

                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="pr-4">
                      Password
                    </label>
                    <input
                      className="lg:min-w-96 min-w-60  p-2 rounded-md"
                      onChange={handleInput}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={user.password}
                      autoComplete="off"
                      required
                    />
                    
                    <div className="absolute">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="rounded-full bg-transparent relative hover:border-transparent left-96 "
                      title={showPassword == false ? "Show Password" : "Hide"}
                      style={{scale:0.5}}
                    >
                      
                      {showPassword ? (
                        
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.95 10.95 0 0112 19c-5.523 0-10-3.582-10-8s4.477-8 10-8c2.042 0 3.94.56 5.543 1.522M15 12a3 3 0 11-6 0 3 3 0 016 0zm3.25 4.31c1.24-.765 2.3-1.81 3.03-3.06.31-.52.61-1.06.85-1.64M3 3l18 18"
                          />
                        </svg>
                        
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm1.93-2.41a10.03 10.03 0 011.96 1.41M21 12c0 5.523-4.477 8-10 8-2.28 0-4.387-.635-6.129-1.726M4.06 7.94C2.706 9.622 2 11.24 2 12c0 1.82 1.3 3.82 3.28 5.62"
                          />
                        </svg>
                      )}
                    </button>
                    </div>
                    

                  </div>
                  <div className="mx-auto">
                      
                    </div>

                  {/* {errors.password && <div className="text-red-500">{errors.password}</div>} */}
                  <div className="flex justify-end mt-12">
                    <div className="flex items-center mr-32">
                      <p className="justify-center text-blue-950">
                        Already registered ?{" "}
                        <NavLink to="/login">Click here</NavLink>
                      </p>
                    </div>

                    <button
                      className="w-1/3 bg-[#4244E6] text-black hover:text-white "
                      type="submit" 
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
export default SignPage;

