import Header from './components/Header.jsx'
import { useState } from 'react'
import axios from 'axios'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'


function Login() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState(null)
    const [errorslogin, setErrorLogin] = useState('')
    const [errorsregister, setErrorReg] = useState('')
    const apiUrl = import.meta.env.VITE_API_URL;

    if (localStorage.getItem('auth_token')) {
        window.location.href = '/'
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (ConfirmPassword) {
            try {
                const response = await axios.post(`${apiUrl}api/auth/register/`, {
                    username,
                    email,
                    password,
                    confirm_password: ConfirmPassword
                })
                console.log(response)
                const logar = await axios.post(`${apiUrl}api/auth/login/`, {
                    username,
                    password
                })
                localStorage.setItem('auth_token', logar.data.token);
                window.location.href = '/'
            } catch (error) {
                if (error) {
                    let erros = {}
                    for (const [key, value] of Object.entries(error.response.data)) {
                        console.log(key, value)
                        if (value.length > 1) {

                        }
                        erros[key] = value

                    }
                    setErrorReg(erros)
                }
            }
        } else {
            try {
                const response = await axios.post(`${apiUrl}api/auth/login/`, {
                    username,
                    password
                })
                localStorage.setItem('auth_token', response.data.token);
                window.location.href = '/'
            } catch (error) {
                setErrorLogin('Usuário ou senha inválidos')
            }
        }

    }


    return (
        <>
            <Header />
            <div className='flex flex-row not-md:flex-col justify-center items-center h-screen'>
                <div className='flex flex-col md:pt-50 bg-gray-200 p-10 shadow-lg md:h-full md:w-full'>
                    <h1 className='md:text-6xl text-3xl font-bold'>Dê um Cliqq e compartilhe história</h1>

                </div>
                <div className='flex flex-col md:pt-50 bg-white p-10 shadow-lg h-full w-full not-md:items-center'>

                    <TabGroup>
                        <TabList className="flex gap-2 mb-4 ">
                            <Tab
                                className="rounded-full px-3 py-1 text-sm/6 font-bold text-black focus:not-data-focus:outline-none data-focus:outline data-focus:outline-blue-700 data-hover:bg-blue-500/9 data-selected:bg-blue-700/10 data-selected:data-hover:bg-blue-700/10"
                            >Login</Tab>
                            <Tab
                                className="rounded-full px-3 py-1 text-sm/6 font-bold text-black focus:not-data-focus:outline-none data-focus:outline data-focus:outline-blue-700 data-hover:bg-blue-500/9 data-selected:bg-blue-700/10 data-selected:data-hover:bg-blue-700/10"
                            >Register</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
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
                                    <button className='bg-blue-500 text-white rounded-xl pl-3 w-full h-10 cursor-pointer' type="submit">Entrar</button>

                                    {errorslogin && <p className='text-red-600 text-sm'>{errorslogin}</p>}
                                </form>
                            </TabPanel>
                            <TabPanel>
                                <form onSubmit={handleSubmit} className='w-4/5 flex flex-col gap-3'>
                                    <p className='text-4xl font-bold'>Register</p>
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
                                        {errorsregister.username &&
                                            errorsregister.username.map((error, index) => (
                                                <p key={index} className='text-red-600 text-sm'>{error}</p>
                                            ))}
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="email">E-mail</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className='border-2 border-gray-500 rounded-2xl pl-3 w-full'
                                            id='email'
                                        />
                                        {errorsregister.email &&
                                            errorsregister.email.map((error, index) => (
                                                <p key={index} className='text-red-600 text-sm'>{error}</p>
                                            ))}
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
                                        {errorsregister.password &&
                                            errorsregister.password.map((error, index) => (
                                                <p key={index} className='text-red-600 text-sm'>{error}</p>
                                            ))}
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="confirmpassword">Confimação de senha</label>
                                        <input
                                            type="password"
                                            value={ConfirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            className='border-2 border-gray-500 rounded-2xl pl-3 w-full'
                                            id='confirmpassword'
                                        />
                                        {errorsregister.confirm_password &&
                                            errorsregister.confirm_password.map((error, index) => (
                                                <p key={index} className='text-red-600 text-sm'>{error}</p>
                                            ))}
                                    </div>
                                    <button className='bg-blue-500 text-white rounded-xl pl-3 w-full h-10 cursor-pointer' type="submit">Entrar</button>
                                </form>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </>
    );
}

export default Login
