import { FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import axios from 'axios'

function Header() {
  const [userData, setUserData] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setUserData(null);
    setAuthenticated(false);
    window.location.href = '/';
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/me', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('auth_token')}`
          }
        });
        setUserData(response.data);
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
    }
  }, [userData]);

  if (!authenticated) {
    return (
      <header className=" text-black p-4 border-2 border-gray-200 flex flex-row justify-between items-center bg-white">
        <a href="/">
          <h1 className="text-2xl font-bold">Cliqq</h1>
        </a>
        <div className='flex justify-end items-center mt-4 gap-2'>
          <input className='border-2 border-gray-500 rounded-2xl pl-3' type="text" name="search" id="isearch" placeholder='Procurar' />
          <a href="/login">
            <button className='bg-blue-500 h-6 px-3 rounded-md text-white text-center cursor-pointer' type="button">Login</button>
          </a>
        </div>
      </header>
    );
  }
  if (authenticated) {
    return (
      <header className=" text-black p-4 border-2 border-gray-200 flex flex-row justify-between items-center bg-white">
        <a href="/">
          <h1 className="text-2xl font-bold">Cliqq</h1>
        </a>
        <div className='flex justify-end items-center mt-4 gap-2'>
          <input className='border-2 border-gray-500 rounded-2xl pl-3' type="text" name="search" id="isearch" placeholder='Procurar' />
          <a href={`/${userData.username}`} className="flex flex-row gap-2">
            <img className='h-5 rounded-full border-1 border-gray-500 ' src={`http://127.0.0.1:8000/${userData.perfil.photo_perfil}`} alt="" />
            <p>{userData.username}</p>
          </a>
          <button className='bg-blue-500 h-6 w-6 rounded-full  flex flex-wrap justify-center flex-col content-center' type="button"><FaPlus className='text-white' /></button>
          <button onClick={handleLogout} className='bg-red-300 h-6 px-3 rounded-md text-white text-center cursor-pointer' type="button">Sair</button>
        </div>
      </header>
    );
  }
}
export default Header;
