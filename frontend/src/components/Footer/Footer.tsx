import React from 'react'
import { NavLink } from 'react-router-dom';



const Footer = () => {
  return (
    <div className='flex w-full justify-between'>
    <footer className="h-20 w-full lg:h-10 bg-sky-500 flex flex-wrap items-center justify-center border-t text-center md:justify-between bottom-0 " >
      <p color="blue-gray" className="font-normal">
        &copy; Created by Ankit.B
      </p >
      <ul className="flex flex-wrap items-center gap-2 ">
        <li className='hidden'>
          <NavLink 
            
            to="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </NavLink >
        </li>
        <li>
          <NavLink 
            
            to="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            License
          </NavLink >
        </li>
        <li>
          <NavLink 
            to="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Contribute
          </NavLink >
        </li>
        <li>
          <NavLink 
            to="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 mr-2"
          >
            Contact Us
          </NavLink >
        </li>
      </ul>
    </footer>
    </div>
  );
}

export default Footer;