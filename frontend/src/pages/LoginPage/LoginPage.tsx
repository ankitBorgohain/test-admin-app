import React, { useState } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from 'react-toastify';
import { API } from "../../Constants";

const LoginPage: React.FC = () => {
  
  //can be used as one object of multiple use states
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });


  const URL = `${API}/api/auth/login`;

  //for the error in the front end form

  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS, setIsLoggedIn , isLoggedIn} = useAuth();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Handle login logic here


    // console.log(user);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      // console.log("login form response", response);
      
      const res_data = await response.json();

      if (response.ok) {
        
        // console.log("res data", res_data);
        storeTokenInLS(res_data.token);
        toast.success("Login successful");

        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails  : res_data.message);
        // alert(res_data.extraDetails ? res_data.extraDetails  : res_data.message );
        console.log("Invalid credentials : failed");
      }

      // console.log(response);

    } catch (error) {
      console.log(error, "Login failed");
    }
  };

  const divStyle: React.CSSProperties = {
    backgroundImage:
      "url('https://img.freepik.com/free-photo/realistic-phone-studio-social-media-concept_23-2151459542.jpg?t=st=1720115498~exp=1720119098~hmac=55eff35a935566097f335048f3c266f7a7cc64f904de5defdf37b7df22d1bc36&w=1380')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    opacity: 0.8,
    borderRadius: "40px",
  };

  // const formStyle: React.CSSProperties = {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     padding: '20px',
  //     backgroundColor: 'rgba(255, 255, 255, 0.8)',
  //     borderRadius: '10px'
  // };

  return (
    <div className=" w-full items-center ">
      <div className="grid lg:grid-cols-2 mb-20">
        <div className="image-container hidden lg:block h-fit  flex-col items-center justify-center">
          <img
            src="/images/login-image.png"
            className="sm:h-22 lg:h-[690px]"
            style={{ height: "500px" }}
            alt="man with a big key"
          />
          <h2 className="m-8  text-5xl">
            " Your{" "}
            <span className="text-[#FE7062] bg-blue-600 px-2 rounded-sm  font-extrabold">
              password
            </span>{" "}
            is safe with us "
          </h2>
        </div>
        <div className=" flex flex-col gap-4 items-center justify-start">
          <h2 className=" text-5xl ">Login </h2>
          <form
            className="bg-[#7D97F4] border rounded-md  flex flex-col gap-3 p-6 py-16 h-fit"
            onSubmit={handleLogin}
            
          >
            <div className="flex  justify-between items-center">
              <label htmlFor="email" className="pr-4">
                Email
              </label>
              <input
                className="lg:min-w-96 min-w-60 p-2 rounded-md"
                onChange={handleInput}
                value={user.email}
                type="text"
                name="email"
                required
              />
            </div>
            {errors.email && <div className="text-red-500">{errors.email}</div>}

            <div className="flex justify-between items-center">
              <label htmlFor="password" className="pr-4">
                Password
              </label>
              <input
                className="lg:min-w-96 min-w-60  p-2 rounded-md"
                onChange={handleInput}
                type="password"
                name="password"
                value={user.password}
                required
                
              />
            </div>

            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
            <div className="flex justify-end mt-12">
              <div className="flex items-center mr-32">
                <p className="justify-center text-blue-950">
                  Not registered yet ?{" "}
                  <NavLink to="/signup">Click here</NavLink>
                </p>
              </div>

              <button
                className="w-1/3 bg-[#4244E6] text-black hover:text-white"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
