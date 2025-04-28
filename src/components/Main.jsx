import { MdVisibility } from "react-icons/md";
import { TbClockHour3 } from "react-icons/tb";
import PhotoDetail from '../PhotoDetail.jsx';
import { useEffect, useState } from 'react'

function Main() {
    const [itens, setItens] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;
    const [showDetail, setShowDetail] = useState(false);
    const [photoId, setPhotoId] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        async function carregarItens() {
            const resposta = await fetch(`${apiUrl}api/photos/`)
            const dados = await resposta.json()
            setItens(dados)
        }
        carregarItens()
    }, [])

    const handlePhotoClick = (id, username) => {
        setPhotoId(id);
        setUsername(username);
        setShowDetail(true);
    };

    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.id === 'closephoto' || e.target.id === 'close') {
                setShowDetail(false);
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);



    return (
        <main className=" text-black p-4 border-2 border-gray-200 flex flex-row justify-between items-center bg-white">
            <div id="feed" className="flex flex-col gap-4 w-full justify-center items-center">
                {itens
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map((item) => (
                        <div className="flex flex-col gap-2 bg-gray-200 p-5 rounded-2xl w-full" id="post"
                            onClick={() => handlePhotoClick(item.id, item.author)}
                            key={item.id}>
                            <div className="post-header overflow-hidden rounded-lg h-fit w-full justify-center items-center flex ">
                                <img className="w-full h-full object-cover" src={`${apiUrl}${item.image}`} alt="Post Image" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>
                                    <h1 className="font-bold text-2xl">{item.title}</h1>
                                    <p>{item.description}</p>
                                </div>
                                <a href={`/${item.author}`} >
                                    <div className="flex flex-row gap-1">
                                        {item.photo_perfil && <img className='relative translate-y-1 h-5 rounded-full border-1 border-gray-500 ' src={`${apiUrl}${item.photo_perfil}`} alt="" />}
                                        <p className="font-bold">{item.author}</p>
                                    </div>
                                </a>
                                <div className="flex flex-row gap-2 mt-2 text-gray-500">
                                    <MdVisibility className="relative translate-y-1" />
                                    <p>{item.views}</p>
                                    <TbClockHour3 className="relative translate-y-1" />
                                    <p>{(item.post_hour)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {showDetail && <PhotoDetail photoId={photoId} username={username} />}
        </main>
    );
}
export default Main;