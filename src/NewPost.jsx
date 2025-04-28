import Header from "./components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

function NewPost() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')
    const apiUrl = import.meta.env.VITE_API_URL

    if (!localStorage.getItem('auth_token')) {
        window.location.href = '/'
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        const imageInput = document.getElementById('image');
    
        formData.append('image', imageInput.files[0]);
        formData.append('title', title);
        formData.append('description', description);
    
        try {
            const response = await axios.post(`${apiUrl}api/photo/upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${localStorage.getItem('auth_token')}`
                }
            });
    
            window.location.href = `/${response.data.author}/photo/${response.data.id}/`;
        } catch (error) {
            console.error(error);
            setError('Não foi possível criar o post. Verifique suas credenciais.');
        }
    };

    return (
        <>
            <Header />
            <div className="new-post">
                <h1>New Post</h1>
                <form onSubmit={handleSubmit} className='w-4/5 flex flex-col gap-3' encType="multipart/form-data">
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="image" accept="image/*" required />
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" required value={title}
                        onChange={(e) => setTitle(e.target.value)} />

                    <label htmlFor="content">description:</label>
                    <textarea id="content" name="content" required value={description}
                        onChange={(e) => setDescription(e.target.value)} ></textarea>

                    <button type="submit">Submit</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </>
    );
}

export default NewPost;