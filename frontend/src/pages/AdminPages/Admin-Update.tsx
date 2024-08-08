import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import {API} from "../../Constants";


const AdminUpdate = ()=>{

      const [data, setData] = useState({
        name: "",
        email: "",
        
        
      });

      const [ isLoading, setIsLoading]= useState(false);
      const params = useParams();
      const {AuthorizationToken} = useAuth();
      
      
      

      const getSingleUserData = async () =>{
        try {
            const response = await fetch(`${API}/api/admin/users/${params.id}`, {
                method:"GET",
                headers: {
                    "Authorization" : AuthorizationToken,
                }
                
            }
        )
        const res_data = await response.json();
        console.log("Single user data found",res_data);
        setData(res_data.data);
        console.log(data);
     
            
        } catch (error) {
            console.log(error);
            
        }
        
      };

      const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
    
      };

      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            setIsLoading(!isLoading)
            const response = await fetch(`${API}/api/admin/users/update/${params.id}`, {
              method: "PATCH",
              headers: {
                'Content-Type': "application/json",
                'Authorization': AuthorizationToken,
              },
              body: JSON.stringify(data)
            }
        );
        if(response.ok){
            toast.success("User updated successfully")
        }else{
            toast.error("Not Updated")
        }
        
            
            
            
            setIsLoading(false)

        } catch (error) {
            console.log(error);
          }
      }
      useEffect(()=>{
        
        getSingleUserData();
      },[])
        
    return (
    <div className="flex flex-col justify-center items-center form-registration h-[501px] w-full ">
              <h2 className="mt-10 mb-4 text-3xl font-extrabold">Update User Details </h2>
                <form
                  className="flex flex-col gap-4 p-10 pt-16 h-fit bg-[#7D97F4] rounded-xl"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="flex  justify-between items-center">
                    <label htmlFor="fname" className="pr-4">
                      Username
                    </label>
                    <input
                      className="lg:min-w-96 min-w-60 p-2 rounded-md"
                      onChange={handleInput}
                      value={data.name}
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
                      value={data.email}
                      placeholder="john@doe.com"
                      type="text"
                      name="email"
                      autoComplete="off"
                      required
                    />
                     
                  </div>
                  {/* Display errors */}
                    {/* {errors.email && <div className="text-red-500">{errors.email}</div>} */}

                  
                  <div className="mx-auto">
                      
                    </div>

                  {/* {errors.password && <div className="text-red-500">{errors.password}</div>} */}
                  <div className="flex justify-end mt-12">
                    

                    <button
                      className="w-1/3 bg-[#4244E6] text-black hover:text-white "
                      type="submit" 
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
)};
export default AdminUpdate