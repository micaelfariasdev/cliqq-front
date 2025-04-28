import Header from './components/Header.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdVisibility } from "react-icons/md";
import { TbClockHour3 } from "react-icons/tb";
import PhotoDetail from './PhotoDetail.jsx';

function Perfil() {
    const [userData, setUserData] = useState(null);
    const [TotViews, setTotViews] = useState(0);
    const [authenticated, setAuthenticated] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [photoId, setPhotoId] = useState(null);
    const [username, setUsername] = useState(null);

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
        if (userData && userData.photos) {
            const total = userData.photos.reduce((acc, photo) => acc + photo.views, 0);
            setTotViews(total);
        }
    }, [userData]);

    const handlePhotoClick = (id, username) => {
        setPhotoId(id);
        setUsername(username);
        setShowDetail(true);
    };

    if (userData) {
        if (userData.username === useParams().username) {
            return (
                <>
                    <Header />
                    <div className='flex flex-row justify-start items-start gap-5 pl-10 py-10 border-2 border-gray-200 bg-white'>
                        <img src={`http://127.0.0.1:8000/${userData.perfil.photo_perfil}`} alt=""
                            className='w-50 border-2 border-gray-500 rounded-2xl' />
                        <div className='flex flex-col items-start'>
                            <div className='flex flex-row gap-5'>
                                <div className='flex flex-col justify-center items-center'>
                                    <p className='font-bold'>Fotos</p>
                                    <p className='text-2xl font-bold'>{userData.photos.length}</p>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <p className='font-bold'>Views</p>
                                    <p className='text-2xl font-bold'>{TotViews}</p>
                                </div>
                            </div>
                            <h1 className='text-6xl font-bold'>{userData.username}</h1>
                            <p className='text-2xl'>{userData.perfil.biografia}</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-row gap-5 p-10'>
                            {userData.photos
                                .slice()
                                .sort((a, b) => b.id - a.id)
                                .map((item) => (
                                    <div className="bg-gray-200 p-2 post-header overflow-hidden rounded-lg h-fit w-full justify-between flex flex-col gap-3"
                                        onClick={() => handlePhotoClick(item.id, item.author)}
                                        key={item.id}
                                    >
                                        <div className='overflow-hidden rounded-lg'>
                                            <img className="w-full aspect-square object-cover" src={`http://127.0.0.1:8000/${item.image}`} alt="Post Image" />
                                        </div>
                                        <div className='flex flex-row gap-2 content-start'>
                                            <MdVisibility className="relative translate-y-1" />
                                            <p>{item.views}</p>
                                            <TbClockHour3 className="relative translate-y-1" />
                                            <p>{item.post_hour}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    {showDetail && <PhotoDetail photoId={photoId} username={username} />}
                    {console.log(photoId)}
                    {console.log(username)}
                </>
            );
        }
    }
}

export default Perfil;
