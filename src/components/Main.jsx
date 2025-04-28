import { MdVisibility } from "react-icons/md";
import { TbClockHour3 } from "react-icons/tb";
import { useEffect, useState } from 'react'

function Main() {
    const [itens, setItens] = useState([])

    useEffect(() => {
        async function carregarItens() {
            const resposta = await fetch('http://localhost:8000/api/photos/')
            const dados = await resposta.json()
            setItens(dados)
        }
        carregarItens()
    }, [])

    

    return (
        <main className=" text-black p-4 border-2 border-gray-200 flex flex-row justify-between items-center bg-white">
            <div id="feed" className="flex flex-col gap-4 w-full justify-center items-center">
                {itens
                .slice() 
                .sort((a, b) => b.id - a.id)
                .map((item) => (
                    <div className="flex flex-col gap-2 bg-gray-200 p-5 rounded-2xl w-full" id="post">
                        <div className="post-header overflow-hidden rounded-lg h-fit w-full justify-center items-center flex ">
                            <img className="w-full h-full object-cover" src={`http://localhost:8000/${item.image}`} alt="Post Image"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>
                                <h1 className="font-bold text-2xl">{item.title}</h1>
                                <p>{item.description}</p>
                            </div>
                            <div className="flex flex-row gap-1">
                                <img className='relative translate-y-1 h-5 rounded-full border-1 border-gray-500 ' src={`http://localhost:8000/${item.photo_perfil}`} alt="" />
                                <p className="font-bold">{item.author}</p>
                            </div>
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
        </main>
    );
}
export default Main;