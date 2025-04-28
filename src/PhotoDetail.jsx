import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdVisibility } from "react-icons/md";
import { TbClockHour3 } from "react-icons/tb";
import { IoMdCloseCircle } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { RiLoader3Fill } from "react-icons/ri";
import { Dialog } from '@headlessui/react'

function MyDialog({ isOpen, setIsOpen, authToken, photoId }) {
    const apiUrl = import.meta.env.VITE_API_URL;
  
    async function DeletePhoto() {
      try {
        await axios.delete(`${apiUrl}api/photo/delete/${photoId}/`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });
        setIsOpen(false);
        window.location.reload()
      } catch (error) {
        console.error('Erro ao deletar a foto:', error);
      }
    }
  
    return (
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded-lg p-6 shadow-lg w-96">
          <Dialog.Title className="text-xl font-bold">Delete photo</Dialog.Title>
          <Dialog.Description className="text-gray-600 mt-2">
            Esta ação não poderá ser desfeita.
          </Dialog.Description>
  
          <p className="mt-4">
            Tem certeza de que deseja excluir esta foto? Esta ação não pode ser desfeita e a foto será removida permanentemente.
          </p>
  
          <div className="mt-4 flex gap-4">
            <button 
              onClick={() => DeletePhoto()} 
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Delete
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="bg-gray-300 py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    );
  }
  

function PhotoDetail({ photoId, username }) {
    const [userData, setUserData] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_API_URL;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const authToken = localStorage.getItem('auth_token')

    useEffect(() => {
        const fetchData = async () => {
          if (authToken) {
            try {
              const userRes = await axios.get(`${apiUrl}api/auth/me/`, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${authToken}`
                }
              });
              setIsOwner(userRes.data.username === username);
            } catch (error) {
              console.error('Erro ao buscar usuário logado:', error);
            }
          }
      
          try {
            const photoRes = await axios.get(`${apiUrl}api/photo/view/${username}/${photoId}/`);
                setUserData(photoRes.data);
            } catch (error) {
                console.error('Erro ao carregar detalhes da foto:', error);
            } finally {
                setIsLoading(false);
            }
        };
      
        fetchData();
      }, [photoId, username]);


    if (isLoading) {
        return (
            <>
                <div id='closephoto' className='fixed inset-0 bg-black opacity-80 z-0' />
                <RiLoader3Fill className='text-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 animate-spin text-6xl' />
            </>
        );
    }

    if (!userData) {
        return (
            <>
                <div id='closephoto' className='fixed inset-0 bg-black opacity-80 z-0' />
                <div className='text-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-3xl'>
                    Foto não encontrada
                </div>
            </>
        );
    }

    
        return (
            <>
                <MyDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} authToken={authToken} photoId={photoId} />
                <div id='closephoto' className='h-screen w-screen bg-black opacity-80 fixed top-0 left-0 z-0'>
                </div>
                <div className='bg-blue-500 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 grid
                    grid-cols-[3fr_2fr] grid-rows-1 rounded-lg shadow-lg w-4/5 h-4/5'>
                <div className="scale-75 group fixed bottom-148 left-208 z-0">
                    <div id='close' className='w-10 h-10 opacity-75 cursor-pointer relative left-107 top-27 z-15'>
                    </div>
                    <IoMdCloseCircle id='closephoto' className='group-hover:scale-125 text-5xl cursor-pointer text-white invert-50 relative left-106 top-16 ' />
                </div>
                    <div className='bg-gray-200 overflow-hidden rounded-l-lg p-2'>
                        <img className="overflow-hidden object-contain rounded-lg w-full h-full" src={`${apiUrl}${userData.image}`} alt="Post Image" />
                    </div>
                    <div className='bg-gray-200 p-2 overflow-hidden rounded-r-lg w-full flex flex-col gap-3 '>
                        <div className='flex flex-row gap-2 content-start'>
                            <MdVisibility className="relative translate-y-1" />
                            <p>{userData.views}</p>
                            <TbClockHour3 className="relative translate-y-1" />
                            <p>{userData.post_hour}</p>
                           {isOwner  && <FaTrashAlt onClick={() => setIsDialogOpen(true)} className="relative  translate-y-1  text-red-400 end" />}

                        </div>
                        <p className='font-extrabold text-4xl'>{userData.title}</p>
                        <p>{userData.description}</p>
                    </div>
                </div>
            </>
        );
    }


export default PhotoDetail;
