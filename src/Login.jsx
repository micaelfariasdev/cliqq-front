
import { useState } from 'react'
import axios from 'axios'


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
                username,
                password
            })
            localStorage.setItem('auth_token', response.data.token);
            window.location.href = '/';


            // Redirecionar ou fazer algo após o login bem-sucedido
        } catch (error) {
            setError('Erro ao fazer login. Verifique suas credenciais.')
        }
    }


    return (
        <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
    );
}

export default Login
