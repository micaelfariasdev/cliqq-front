import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdVisibility } from "react-icons/md";
import { TbClockHour3 } from "react-icons/tb";

function PhotoDetail({ photoId, username }) {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Estado de loading

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true); 
                const response = await axios.get(`http://127.0.0.1:8000/api/photo/view/${username}/${photoId}/`);
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
        return <div>Loading...</div>;
    }

    if (userData) {
        return (
            
            <div className='w-2/3 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10'>
                <div className="bg-gray-200 p-2 post-header overflow-hidden rounded-lg h-fit w-full justify-between flex flex-col gap-3">
                    <div className='overflow-hidden rounded-lg'>
                        <img className="w-full aspect-square object-cover" src={`http://127.0.0.1:8000/${userData.image}`} alt="Post Image" />
                    </div>
                    <div className='flex flex-row gap-2 content-start'>
                        <MdVisibility className="relative translate-y-1" />
                        <p>{userData.views}</p>
                        <TbClockHour3 className="relative translate-y-1" />
                        <p>{userData.post_hour}</p>
                    </div>
                </div>
            </div>
        );
    }

    return <div>Foto não encontrada</div>;
}

export default PhotoDetail;
