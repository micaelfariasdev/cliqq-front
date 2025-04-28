import Header from './components/Header.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { MdVisibility } from "react-icons/md"
import { TbClockHour3 } from "react-icons/tb"
import PhotoDetail from './PhotoDetail.jsx'

function Perfil() {
  const [userData, setUserData] = useState(null)
  const [myUsername, setMyUsername] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [photoId, setPhotoId] = useState(null)
  const [photoAuthor, setPhotoAuthor] = useState(null)
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
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
  
    fetchData();
  }, [profileusername, authToken]);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.id === 'closephoto' || e.target.id === 'close') {
        setShowDetail(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const handlePhotoClick = (id, username) => {
    setPhotoId(id)
    setPhotoAuthor(username)
    setShowDetail(true)
  }

  if (!userData) return null

  const totalViews = userData.photos?.reduce((acc, photo) => acc + photo.views, 0) || 0
  const isOwner = myUsername === profileusername

  return (
    <>
      <Header />
      <div className='flex flex-row justify-start items-start gap-5 pl-10 py-10 border-2 border-gray-200 bg-white'>
        <img src={`${apiUrl}${userData.perfil.photo_perfil}`} alt="" className='w-50 border-2 border-gray-500 rounded-2xl' />
        <div className='flex flex-col items-start'>
          <div className='flex flex-row gap-5'>
            <div className='flex flex-col justify-center items-center'>
              <p className='font-bold'>Fotos</p>
              <p className='text-2xl font-bold'>{userData.photos.length}</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <p className='font-bold'>Views</p>
              <p className='text-2xl font-bold'>{totalViews}</p>
            </div>
          </div>
          <h1 className='text-6xl font-bold'>{userData.username}</h1>
          <p className='text-2xl'>{userData.perfil.biografia}</p>
        </div>
        {isOwner && (
          <div>
            config
          </div>
        )}
      </div>

      <div className='grid grid-cols-3 gap-5 p-10'>
        {userData.photos
          .slice()
          .sort((a, b) => b.id - a.id)
          .map((item) => (
            <div
              key={item.id}
              className="bg-gray-200 p-2 post-header overflow-hidden rounded-lg justify-between flex flex-col gap-3"
              onClick={() => handlePhotoClick(item.id, item.author)}
            >
              <div className='overflow-hidden rounded-lg'>
                <img className="w-full aspect-square object-contain" src={`${apiUrl}${item.image}`} alt="Post Image" />
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

      {showDetail && <PhotoDetail photoId={photoId} username={photoAuthor} />}
    </>
  )
}

export default Perfil
