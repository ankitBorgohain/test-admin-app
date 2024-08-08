import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import LoginPage from "../LoginPage/LoginPage";
import { toast } from "react-toastify";
import { API } from "../../../Constants";


type ContactDetails = {
  name: string;
  email: string;
  message: string;
};
  const defaultFormState = {
    name: "",
    email: "",
    message: "",
  }

const ContactPage = () => {
  
  const [contactDetails, setContactDetails] = useState<ContactDetails>(defaultFormState);

  const {user} = useAuth();
  

   

useEffect(()=>{
 if(user){
  setContactDetails({
    name : user.name,
    email: user.email,
    message: contactDetails.message,
  });
  console.log("contact forms fields upated");
}
}, [user])

  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContactDetails({
      ...contactDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    //sending the contact form data to backend 

    try {

      //data send to the server
      const response = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body:JSON.stringify(contactDetails)
      });

      //awaited response form server
      if(response.ok){
        setContactDetails(defaultFormState);
        const data = await response.json();
        console.log("data from response",data);
        toast.success("messessage sent")
      }
      
    } catch (error) {
      alert("Error: messessage not sent")
      console.log(error);
      
    }

 
    
    
  };

  return (
    <div className=" w-full items-center mb-20">
      <div className="grid lg:grid-cols-2">
        <div className="image-container h-fit hidden lg:block flex-col items-center justify-center">
          <img
            src="/images/contact-us.png"
            className="sm:h-22 lg:h-[690px]"
            style={{ height: "500px", width: "600px" }}
            alt="man with a big key"
          />
          <h2 className="m-8  text-3xl">
            " We priotize{" "}
            <span className="text-[#FE7062] uppercase font-extrabold">you</span>{" "}
            over anything "
          </h2>
        </div>
        <div className=" flex  flex-col items-center gap-6 justify-center m-5">
          <h2 className="w-fit text-5xl">
            <span className="bg-[#FE7062] text-[#1B262C] font-semibold px-2 rounded-md ">
              Contact
            </span>{" "}
            us
          </h2>
          <form
            className="  bg-[#7D97F4] rounded-md flex flex-col gap-3 p-5 py-14 h-fit"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="flex  justify-between items-center">
              <label htmlFor="email" className="pr-4">
                Username
              </label>
              <input
                className="lg:min-w-96 min-w-60 p-2 rounded-md"
                value={contactDetails.name}
                id="name"
                autoComplete="off"
                type="text"
                name="name"
                onChange={handleInput}
              />
            </div>
            

            <div className="flex justify-between items-center">
              <label htmlFor="email" className="pr-4">
                Email
              </label>
              <input
                className="lg:min-w-96 min-w-60 p-2 rounded-md"
                value={contactDetails.email}
                id="email"
                autoComplete="off"
                type="text"
                name="email"
                onChange={handleInput}
              />
            </div>
           

            <div className="flex justify-between items-center">
              <label htmlFor="password" className="pr-4">
                Message
              </label>
              <textarea
                className="lg:min-w-96 min-w-60  p-2 rounded-md"
                rows={4}
                id="message"
                onChange={handleInput}
                cols={30}
                value={contactDetails.message}
                name="message"
                autoComplete="off"
              />
            </div>
            
            <div className="flex justify-center mt-12">
              {/* <div className="flex items-center mr-32">
                <p className="justify-center text-blue-950">
                  Not Signed in ? <NavLink to="/signup">Click here</NavLink>
                </p>
              
              </div> */}

              <button
                className="w-4/4 bg-[#4244E6] text-black font-bold hover:text-white"
                type="submit"
              >
                Contact Now
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="h-[320px] flex justify-center  border">
      {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18494.40662293273!2d77.58665653250986!3d12.973766912119892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1673e7d0672f%3A0xc62ca5a6e943dfb8!2sCubbon%20Park!5e0!3m2!1sen!2sin!4v1721144857148!5m2!1sen!2sin"
        className=""
        style={{ paddingBottom:30, margin:5,width:"100%", height:"300px", zIndex:-1}}
        allowFullScreen
        loading="lazy"
        
      ></iframe>
       
      </div> */}
      <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15553.886508548429!2d77.68584161996839!3d12.94164485502589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13872c2d202d%3A0xf5642bdf21bdc17b!2sOracle%20Tech%20Hub!5e0!3m2!1sen!2sin!4v1721305813739!5m2!1sen!2sin" 
      width="90%"
      allowFullScreen={true}
      title="Our location"
      style={{margin:"auto" , marginBottom:30 , alignItems:"center " }}
      height="450" 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade">


      </iframe>
    </div>
  );
};

export default ContactPage;
