import React from "react";


import { useAuth } from "../../store/auth";

const ServicePage: React.FC = () => {
 

  const { services } = useAuth();

  return (
    <section>
      <div className="">
        <h2 className="text-center text-5xl lg:text-left lg:m-10 mb-2">Serivces</h2>
      </div>
      <div className="service-container mx-auto border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 md:gap-0 mb-28 ">
        {
       services.map((currElem, index) =>{
          const { service, price, description, provider } = currElem;
          return (
            <div
              className="card border rounded-xl w-[300px] items-center hover:shadow-slate-50 hover:shadow-lg"
              key={index}
            >
              <div className="flex ">
                <img
                  src="/images/design500x500.png"
                  alt="our services info"
                  width="400"
                  className="mx-auto my-2"
                />
              </div>
              <div className="card-details mx-1 px-4">
                <div className="grid grid-cols-2">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h2 className="text-2xl font-extrabold mt-2 text-[#fd786e]">{service}</h2>
                <p className="mb-2 ">{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicePage;
