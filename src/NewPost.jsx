import Header from "./components/Header";
import axios from "axios";
import 'react-image-crop/dist/ReactCrop.css';
import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';

function NewPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!localStorage.getItem('auth_token')) {
        window.location.href = '/';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        const imageToSend = croppedImage ? croppedImage.blob : imageInput.files[0];
        formData.append('image', imageToSend);
        formData.append('title', title);
        formData.append('description', description);


        try {
            const response = await axios.post(`${apiUrl}api/photo/upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`,
                },
            });

            window.location.href = `/${response.data.author}`;
        } catch (error) {
            console.error(error);
            setError('Não foi possível criar o post. Verifique suas credenciais.');
        }
    };

    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState(null);
    const imgRef = useRef(null);

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImgSrc(reader.result?.toString() || '');

                // reseta o crop com valores padrão ao trocar a imagem
                setCrop({
                    unit: 'px',
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 300,
                    aspect: 1,
                });
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;

        const cropSize = Math.min(width, height) * 0.5; // 50% da menor dimensão
        const centerX = (width - cropSize) / 2;
        const centerY = (height - cropSize) / 2;

        const defaultCrop = {
            unit: 'px',
            x: centerX,
            y: centerY,
            width: cropSize,
            height: cropSize,
            aspect: 1,
        };
        setCrop(defaultCrop);
        setCompletedCrop(defaultCrop);
        generateCroppedImage(defaultCrop);
    };

    const [croppedImage, setCroppedImage] = useState(null);

    const generateCroppedImage = async (crop) => {
        if (!crop?.width || !crop?.height || !imgRef.current) return;

        const image = imgRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const canvas = document.createElement('canvas');
        canvas.width = crop.width * scaleX;
        canvas.height = crop.height * scaleY;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        canvas.toBlob((blob) => {
            if (!blob) return;
            const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
            setCroppedImage({ blob: file, previewUrl: URL.createObjectURL(file) });
        }, 'image/jpeg', 1); // qualidade máxima
    };


    return (
        <>
            <Header />
            <div className="flex flex-col content-center items-center min-h-screen justify-start bg-gray-900 text-white">
                <div className="max-w-100 p-5 gap-1 flex flex-col content-center items-center min-h-screen justify-start">
                    <h1 className="text-5xl font-extrabold">Novo Post</h1>
                    {!!imgSrc && (
                        <ReactCrop
                            crop={crop || {}}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => {
                                setCompletedCrop(c);
                                generateCroppedImage(c);
                            }}
                            aspect={1}
                        >
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    )}
                    <label htmlFor="imageInput" className="w-full">
                        {!imgSrc && <img src={`${apiUrl}static/default/plus.png`} alt="" className="rounded-xl mb-3 mt-3" />}
                        {imgSrc && <div className="bg-blue-500 mt-3 w-full text-center cursor-pointer text-white rounded-xl py-2 hover:bg-blue-600 transition-all" >Mudar</div>}
                    </label>
                    <input type="file" accept="image/*" id="imageInput" onChange={onSelectFile} className="invisible h-0" />
                    <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md flex flex-col text-black gap-3" encType="multipart/form-data">
                        <input
                            type="text"
                            placeholder="Título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-gray-400 rounded-xl px-3 py-2 mt-[-20px]"
                            required
                        />
                        <textarea
                            placeholder="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-gray-400  rounded-xl px-3 py-2"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-xl cursor-pointer py-2 hover:bg-blue-600 transition-all"
                        >
                            Criar Post
                        </button>
                        {error && <p className="text-red-500">{error}</p>}
                    </form>

                    {error && <p>{error}</p>}
                </div>
            </div>
        </>
    );
}

export default NewPost;
