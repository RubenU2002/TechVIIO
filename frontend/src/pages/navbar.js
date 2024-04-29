import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';


const Navigationbar = () => {


  return (
    <nav className="fixed inset-x-0 bottom-0 bg-white border-t border-gray-300 px-4 py-2 flex justify-between items-center">
      <NavLink to="/home" activeClassName="text-blue-500" className="flex flex-col items-center text-gray-700">
        <AiOutlineHome className="text-lg" />
        <span className="text-xs">Home</span>
      </NavLink>
      <NavLink to="/search" activeClassName="text-blue-500" className="flex flex-col items-center text-gray-700">
        <AiOutlineSearch className="text-lg" />
        <span className="text-xs">Search</span>
      </NavLink>
      <NavLink to="/cart" activeClassName="text-blue-500" className="flex flex-col items-center text-gray-700">
        <AiOutlineShoppingCart className="text-lg" />
        <span className="text-xs">Cart</span>
      </NavLink>
      <NavLink to="/favorites" activeClassName="text-blue-500" className="flex flex-col items-center text-gray-700">
        <AiOutlineHeart className="text-lg" />
        <span className="text-xs">Favorites</span>
      </NavLink>
      <NavLink to="/profile" activeClassName="text-blue-500" className="flex flex-col items-center text-gray-700">
        <AiOutlineUser className="text-lg" />
        <span className="text-xs">Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navigationbar;
