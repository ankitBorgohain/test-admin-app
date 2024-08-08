import { NavLink, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);

  return (
    <div id="error-page" className=" flex flex-col justify-center items-center">
      <h1 className="text-[182px] bg-gradient-to-r from-sky-500 via-pink-400 to-cyan-400 text-transparent bg-clip-text">404</h1>
      <div className=" flex flex-col items-center">
        <h1 className=" ">Oops!</h1>
        <div className="border-b-4 w-32  border-blue-500 rounded-sm relative mb-10" style={{zIndex:"-1"}}> </div>
        
        <p>Sorry, an unexpected error has occurred.</p>
        <p>{/* <i>{error.statusText || error.message}</i> */}</p>

       <div className="mt-4 px-4 py-1 rounded-xl border bg-blue-300 hover-shadow"><NavLink to="/" className="text-xl hover:no-underline ">Home</NavLink></div> 
      </div>
    </div>
  );
}
