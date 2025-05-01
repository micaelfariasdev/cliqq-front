import Header from './components/Header.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { MdVisibility } from "react-icons/md"
import { TbClockHour3 } from "react-icons/tb"
import PhotoDetail from './PhotoDetail.jsx'
import { RiLoader3Fill } from "react-icons/ri";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { SlDiamond } from "react-icons/sl";
import { IoSettings } from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

function Perfil() {
  const [userData, setUserData] = useState(null)
  const [myUsername, setMyUsername] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [photoId, setPhotoId] = useState(null)
  const [photoAuthor, setPhotoAuthor] = useState(null)
  const [isVip, setIsVip] = useState(null)
  const profileusername = useParams().username
  const apiUrl = import.meta.env.VITE_API_URL
  const authToken = localStorage.getItem('auth_token')

  useEffect(() => {
    const fetchData = async () => {
      if (authToken) {
        try {
          const meRes = await axios.get(`${apiUrl}api/auth/me/`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${authToken}`
            }
          });
          setMyUsername(meRes.data.username);
        } catch (error) {
          console.error('Erro ao buscar usuário logado:', error);
        }
      }

      try {
        const userRes = await axios.get(`${apiUrl}api/auth/${profileusername}/`);
        setUserData(userRes.data);
        setIsVip(userRes.data.perfil.vip)
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchData();
  }, [profileusername, authToken]);

  useEffect(() => {
    const fetchData = async () => {
      if (authToken) {
        try {
          const meRes = await axios.get(`${apiUrl}api/auth/me/`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${authToken}`
            }
          });
          setMyUsername(meRes.data.username);
        } catch (error) {
          console.error('Erro ao buscar usuário logado:', error);
        }
      }

      try {
        const userRes = await axios.get(`${apiUrl}api/auth/${profileusername}/`);
        setUserData(userRes.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchData();
  }, [profileusername, authToken]); useEffect(() => {
    const fetchData = async () => {
      if (!showDetail) {

        try {
          const userRes = await axios.get(`${apiUrl}api/auth/${profileusername}/`);
          setUserData(userRes.data);
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      };

    }
    fetchData();
  }, [showDetail]);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.id === 'closephoto' || e.target.id === 'close') {
        setShowDetail(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [showDetail])

  const handlePhotoClick = (id, username) => {
    setPhotoId(id)
    setPhotoAuthor(username)
    setShowDetail(true)
  }

  if (!userData) {
    return (
      <>
        <div className='fixed inset-0 bg-white opacity-80 z-0' />
        <RiLoader3Fill className='text-gray-500 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 animate-spin text-6xl' />
      </>
    );
  }

  const totalViews = userData.photos?.reduce((acc, photo) => acc + photo.views, 0) || 0
  const totalCurtidas = userData.photos?.reduce((acc, photo) => acc + photo.like.length, 0) || 0
  const isOwner = myUsername === profileusername
  return (
    <>
      <Header />
      <div className='w-full grid not-md:grid-cols-[1.5fr_3fr_1fr] grid-cols-[auto_3fr_1fr] justify-start not-md:gap-2 gap-5 p-2 md:pl-10 md:py-10 border-2 border-gray-200 bg-white'>
        <div className='flex flex-row gap-2 col-span-2 items-center'>
          <h1 className='not-md:text-[1.5rem] text-6xl font-bold'>{userData.username}</h1>
          <SlDiamond className={`${isVip ? '' : 'hidden'} relative translate-y-1 md:translate-y-1.5 not-md:text-[1rem] text-4xl text-cyan-500`} />
        </div>
        {isOwner && (
          <div className='justify-self-end '>
            <Menu>
              <MenuButton 
              className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 md:text-2xl font-semibold shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline-gray-300 data-hover:bg-gray-300 data-open:bg-gray-200">
                <IoSettings className='text-gray-400' />
                <FaChevronDown className="size-4 text-gray-400" />
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className={'bg-gray-200 p-1 rounded-xl mt-1 md:w-50 origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0'}
              >
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10">
                    Edit
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10">
                    Duplicate
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-black/5" />
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10">
                    Archive
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-black/10">
                    Delete
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>

          </div>
        )}
        <div className='flex h-full w-full'>
          <img src={`${apiUrl}${userData.perfil.photo_perfil}`} alt=""
            className='md:w-50 border-2 border-gray-500 rounded-full not-md:w-full ' />
        </div>
        <div className='not-md:text-[rem] flex flex-col items-start gap-2 w-full col-span-2'>
          <div className='flex flex-row gap-5'>
            <div className='flex flex-col justify-center items-center'>
              <p className='font-bold'>Fotos</p>
              <p className='md:text-2xl font-bold'>{userData.photos.length}</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <p className='font-bold'>Curtidas</p>
              <p className='md:text-2xl font-bold'>{totalCurtidas}</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <p className='font-bold'>Views</p>
              <p className='md:text-2xl font-bold'>{totalViews}</p>
            </div>
          </div>
          <p className='not-md:text-[1rem] text-2xl'>{userData.perfil.biografia}</p>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-1 md:gap-10 md:p-10 p-2 not-md:text-[.7rem]'>
        {userData.photos
          .slice()
          .sort((a, b) => b.id - a.id)
          .map((item) => (
            <div
              key={item.id}
              className="bg-gray-200 p-0.5 post-header overflow-hidden rounded-lg justify-between flex flex-col gap-1"
              onClick={() => handlePhotoClick(item.id, item.author)}
            >
              <div className='overflow-hidden rounded-lg'>
                <img className="w-full aspect-square object-contain" src={`${apiUrl}${item.image}`} alt="Post Image" />
              </div>
              <div className='flex flex-row gap-2 content-start md:px-2 not-md:px-2'>
                <FaHeart className={`relative translate-y-1 `}
                  onClick={() => handliked()} />
                <p>{item.like.length}</p>
                <MdVisibility className="relative translate-y-1" />
                <p>{item.views}</p>
                <TbClockHour3 className="relative translate-y-1 not-md:hidden" />
                <p className='not-md:hidden'>{item.post_hour}</p>
              </div>
            </div>
          ))}
      </div>

      {showDetail && <PhotoDetail photoId={photoId} username={photoAuthor} />}
    </>
  )
}

export default Perfil
