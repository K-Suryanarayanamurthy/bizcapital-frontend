import { useState } from 'react'
import API from '../api/axios'

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'entrepreneur',
        phone: '',
        bio: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleRegister = async () => {
        setLoading(true)
        setError('')
        setSuccess('')
        try {
            await API.post('/api/auth/register/', formData)
            setSuccess('Registration successful! You can now login.')
        } catch(err) {
            setError('Registration failed! Please check your details.')
        }
        setLoading(false)
    }

    return (
        <div style={{
            maxWidth: '400px',
            margin: '50px auto',
            padding: '30px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ textAlign: 'center', color: '#1a56db' }}>
                BizCapital Register
            </h2>

            {error && (
                <p style={{
                    background: '#f8d7da',
                    color: '#721c24',
                    padding: '10px',
                    borderRadius: '6px'
                }}>{error}</p>
            )}

            {success && (
                <p style={{
                    background: '#d4edda',
                    color: '#155724',
                    padding: '10px',
                    borderRadius: '6px'
                }}>{success}</p>
            )}

            <div style={{ marginBottom: '12px' }}>
                <label>Username</label>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
                />
            </div>

            <div style={{ marginBottom: '12px' }}>
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
                />
            </div>

            <div style={{ marginBottom: '12px' }}>
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
                />
            </div>

            <div style={{ marginBottom: '12px' }}>
                <label>Role</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
                >
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="investor">Investor</option>
                </select>
            </div>

            <div style={{ marginBottom: '12px' }}>
                <label>Phone</label>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label>Bio</label>
                <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    rows={3}
                    style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
                />
            </div>

            <button
                onClick={handleRegister}
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
                {loading ? 'Registering...' : 'Register'}
            </button>
        </div>
    )
}

export default Register