import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdVisibility } from "react-icons/md";
import { TbClockHour3 } from "react-icons/tb";
import { IoMdCloseCircle } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { RiLoader3Fill } from "react-icons/ri";

function PhotoDetail({ photoId, username }) {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [MyPhoto, setMyPhoto] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}api/auth/me/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem('auth_token')}`
                    }
                });
                if (response.data.username === username) {
                    setMyPhoto(true);
                }

            } catch (error) {
                setMyPhoto(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${apiUrl}api/photo/view/${username}/${photoId}/`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching photo details:', error);
            } finally {
                setIsLoading(false);
            }
        };


        if (isLoading) {
            fetchUserData();
        }
    }, [username, photoId]);


    if (isLoading) {
        return (
            <>
                <div id='closephoto' className='closephoto h-screen w-screen bg-black opacity-80 fixed top-0 left-0 z-0'>
                </div>
                <RiLoader3Fill className='scale-580 text-white fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 animate-spin' />
            </>
        )
    }

    if (userData) {
        return (
            <>
                <div id='closephoto' className='h-screen w-screen bg-black opacity-80 fixed top-0 left-0 z-0'>
                </div>
                <div className='bg-blue-500 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 grid
                    grid-cols-[900px_300px] grid-rows-1 rounded-lg shadow-lg w-4/5 h-4/5'>
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
                           {MyPhoto && <FaTrashAlt className="relative  translate-y-1  text-red-400 end" />}

                        </div>
                        <p className='font-extrabold text-4xl'>{userData.title}</p>
                        <p>{userData.description}</p>
                    </div>
                </div>
            </>
        );
    }

    return <div>Foto não encontrada</div>;
}

export default PhotoDetail;
