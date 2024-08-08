import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/auth";

const HomePage: React.FC = () => {
 const  {user} = useAuth()
  return (
    <section>
      <main>
        <div className="w-full ">
          <div className="grid grid-cols-1 lg:grid-cols-2 mb-4">
            <div className=" image-container-home w-full mb-2">
              <img
                src="/images/Home-About.png"
                className="sm:h-2 lg:h-[690px] hidden lg:block"
                style={{ height: "600px"}}
              />
              <div className="text-center">
                <h1 className="font-extrabold ">
                  Easy <span className="text-blue-400 font-normal">&</span>{" "}
                  Efficient
                </h1>
              </div>
            </div>

            <div className="home-info flex flex-col gap-10 justify-evenly ">
              
              <div>
                <h2 className=" text-center text-3xl lg:text-5xl lg:mb-20"> Welcome, <span className="font-extrabold text-4xl text-[#FE7062]">{user.name}</span> to our website</h2>
              </div>

              <div className="">
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
                  accusamus adipisci dignissimos ratione. Consequatur pariatur
                  voluptatem cupiditate impedit unde provident voluptas dolore
                  ad? Porro minus animi, in tempore eaque debitis?
                </p>
              </div>

              <div className="flex justify-evenly ">
                <div className="bg-blue-100 rounded-3xl ">
                  <img
                    src="/images/aim.png"
                    className="sm:h-2 lg:h-[690px] "
                    style={{ height: "300px" }}
                    alt="man aims at a target"
                  />
                </div>
                <div className="bg-blue-100 rounded-3xl hidden lg:block ">
                  <img
                    src="/images/Question-image-transparent.png"
                    className="sm:h-22 lg:h-[690px]"
                    style={{ height: "300px" }}
                    alt="man in question"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                
                <div className="">
                  <NavLink to='/service'><button className="bg-[#4244E6] w-[150px] text-white  lg:w-80 lg:text-2xl">View Menu 🔧</button></NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default HomePage;
