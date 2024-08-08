import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";

import { API } from "../../Constants";



interface IUser extends Document {
    _id: string;
  name: string;
  email: string;
  password: string;
}

const AdminUsers = () => {
  const { AuthorizationToken, user } = useAuth();

  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  

    // //delete user method
    const deleteUser = async (id: string) =>{
      try {
          setIsLoading(!isLoading)
          const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: AuthorizationToken,
            },
          });
          
          const data = await response.json();
          console.log(`USER AFTER DELETION :  ${data}`);
          setIsLoading(false)
      } catch (error) {
          console.log(error);
        }
    };

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if(!response.ok){
        return console.log("No user found");
        
      }
      const data = await response.json();
      setUsers(data);
      console.log(`${data}`);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      getAllUsersData();

  }, [isLoading]);


  return (
    <>
      <section className="w-full flex flex-col items-center">
        <div>
          <h1 className="m-10">Admin user panel</h1>
        </div>
        <div>
            <table className="w-fit mb-20">
                <thead >
                    <tr className="text-2xl p-8 bg-blue-600 rounded-t-xl">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className="">
                {users?.map((currentUser, index) => {
            
                    return <tr key={index} className="p-5">
                        <td>{currentUser.name}</td>
                        <td>{currentUser.email}</td>
                        <td>
                            <Link 
                            className="bg-green-600 rounded-lg px-7 py-2.5 hover:border border-gray-300"
                            to={`/admin/users/${currentUser._id}/edit`}>Edit</Link>
                        </td>
                        <td>
                            <button 
                            className="-mt-16 hover:bg-red-400"
                            onClick={()=> deleteUser(currentUser._id)}>Delete</button></td>
                    </tr>
          
          })}

                </tbody>
            </table>
          
        </div>
      </section>
    </>
  );
};
export default AdminUsers;
