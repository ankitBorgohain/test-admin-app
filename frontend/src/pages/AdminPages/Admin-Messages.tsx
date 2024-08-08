import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { API } from "../../Constants";



const AdminMessages = () => {
  const { AuthorizationToken } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const getMessagesData = async () => {
    try {
        
      const response = await fetch(`${API}/api/admin/message`, {
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
  
  const deleteMessage = async (id:string) =>{

    try {
        setIsLoading(!isLoading)
        const response = await fetch(`${API}/api/admin/message/delete/${id}` ,{
            method: "DELETE",
            headers: {
            Authorization: AuthorizationToken,
            }, 
        });
        
        if(response.ok){
            const data = await response.json();
            console.log("User deleted > after deletion data", data);
            
        }
        setIsLoading(false)


    } catch (error) {
        console.log(error);
        
    }
  }
  useEffect(() => {
    getMessagesData();
  }, [isLoading]);
  return (
    <>
      <div className="flex flex-col">
        <h1>Admin Messages panel</h1>
       <div className="flex gap-5 m-8">
        {data.map((currData, index) => {
          const { _id,name, email, message } = currData;
          
          
          
          return (
        
              <div key={index} className=" flex flex-col justify-between mb-5 border h-50 p-4 rounded-xl hover:shadow-lg hover:shadow-slate-500 contact-card">
                
                <div>
                    
                <p className="text-2xl uppercase font-bold text-red-400 ">{name}</p>
                <p className="hover:text-blue-400 mb-5">{email}</p>
                <p  className="mb-2 italic ">{message}</p>
                </div>
                <div className="flex justify-end items-baseline m-2">
                <button className="hover:bg-red-500" onClick={()=>deleteMessage(_id) }>Delete</button>
                    </div>
                
              </div>
           
          );
        })}
        </div>
      </div>
    </>
  );
};
export default AdminMessages;
