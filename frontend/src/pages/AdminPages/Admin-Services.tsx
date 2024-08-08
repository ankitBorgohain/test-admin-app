import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { API } from "../../Constants";

const AdminServices = () => {
  
  const { AuthorizationToken } = useAuth();
  const [data, setData] = useState([]);
  
  
  const getServicesData = async () => {
    try {
        
      const response = await fetch(`${API}/api/admin/services`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
//   const deleteMessage = async (id:string) =>{

//     try {
//         setIsLoading(!isLoading)
//         const response = await fetch(`${API}/api/admin/message/delete/${id}` ,{
//             method: "DELETE",
//             headers: {
//             Authorization: AuthorizationToken,
//             }, 
//         });
        
//         if(response.ok){
//             const data = await response.json();
//             console.log("User deleted > after deletion data", data);
            
//         }
//         setIsLoading(false)


//     } catch (error) {
//         console.log(error);
        
//     }
//   }
  useEffect(() => {
    getServicesData();
  }, []);
  return (
    <>
      <div className="flex flex-col ">
        <h1>Admin Services panel</h1>
       <div className=" grid grid-cols-4 gap-5 m-8  ">
        {data.map((currData, index) => {
          const { _id, service, description, price, provider } = currData;
          
          
          
          return (
        
              <div key={index} className=" flex flex-col wrap justify-between mb-0.5 border h-50 p-4 hover:shadow-lg hover:shadow-slate-500 contact-card">
                
                <div>
                    
                <p className="text-2xl uppercase font-bold text-red-400 ">{service}</p>
                <p className="hover:text-blue-400 mb-5">{description}</p>
                <p  className="mb-2 italic ">{price}</p>
                <p  className="mb-2 text-2xl italic ">{provider}</p>
                </div>
                <div className="flex justify-end items-baseline m-2">
                <button className="hover:bg-red-500" onClick={()=>deleteServices(_id) }>Delete</button>
                    </div>
                
              </div>
           
          );
        })}
        </div>
      </div>
    </>
  );
};
export default AdminServices;
