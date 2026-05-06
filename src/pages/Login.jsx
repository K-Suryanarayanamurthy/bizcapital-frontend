import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await API.post('/api/auth/login/', {
                username,
                password
            })
            // Save token and role in localStorage
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('role', response.data.role)
        localStorage.setItem('username', username)
        navigate('/dashboard')
        } catch(err) {
            setError('Invalid username or password!')
        }
        setLoading(false)
    }

    return (
        <div style={{
            maxWidth: '400px',
            margin: '100px auto',
            padding: '30px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ textAlign: 'center', color: '#1a56db' }}>
                BizCapital Login
            </h2>

            {error && (
                <p style={{
                    background: '#f8d7da',
                    color: '#721c24',
                    padding: '10px',
                    borderRadius: '6px'
                }}>
                    {error}
                </p>
            )}

            <div style={{ marginBottom: '15px' }}>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '5px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '5px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            <button
                onClick={handleLogin}
                disabled={loading}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: '#1a56db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    )
}

export default Login