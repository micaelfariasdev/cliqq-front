import Header from './components/Header.jsx'
import { useState } from 'react'
import axios from 'axios'


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const apiUrl = import.meta.env.VITE_API_URL;

    if (localStorage.getItem('auth_token')) {
        window.location.href = '/'
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${apiUrl}api/auth/login/`, {
                username,
                password
            })
            localStorage.setItem('auth_token', response.data.token);
            window.location.href = '/'

        } catch (error) {
            setError('Erro ao fazer login. Verifique suas credenciais.')
        }
    }


    return (
        <>
            <Header />
            <div className='flex flex-row justify-center items-center h-screen'>
                <div className='flex flex-col pt-50 bg-gray-200 p-10 shadow-lg h-full w-full'>
                    <h1 className='text-6xl font-bold'>Dê um Cliqq e compartilhe história</h1>

                </div>
                <div className='flex flex-col pt-50 bg-white p-10 shadow-lg h-full w-full'>
                    <form onSubmit={handleSubmit} className='w-4/5 flex flex-col gap-3'>
                        <p className='text-4xl font-bold'>Entre</p>
                        <div className='flex flex-col'>
                            <label htmlFor="username">Usuário</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className='border-2 border-gray-500 rounded-2xl pl-3 w-full' 
                                id='username'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='border-2 border-gray-500 rounded-2xl pl-3 w-full' 
                                id='password'
                            />
                        </div>
                        <button className='bg-blue-500 text-white rounded-xl pl-3 w-full h-10 cursor-pointer'  type="submit">Entrar</button>
                    </form>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </>
    );
}

export default Login
