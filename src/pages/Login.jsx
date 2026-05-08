import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async () => {
        if(!username || !password) {
            setError('Please fill in all fields!')
            return
        }
        setLoading(true)
        setError('')
        try {
            const response = await API.post('/api/auth/login/', {
                username,
                password
            })
            localStorage.setItem('token', response.data.access_token)
            localStorage.setItem('role', response.data.role)
            localStorage.setItem('username', username)
            navigate('/dashboard')
        } catch(err) {
            setError('Invalid username or password!')
        }
        setLoading(false)
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') handleLogin()
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold text-xl">B</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Welcome back!
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Login to your BizCapital account
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <span
                                onClick={() => navigate('/forgot-password')}
                                className="text-xs text-blue-700 cursor-pointer hover:underline"
                            >
                                Forgot password?
                            </span>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 pr-12"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Logging in...
                            </span>
                        ) : 'Login'}
                    </button>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don't have an account?{' '}
                        <span
                            onClick={() => navigate('/register')}
                            className="text-blue-700 font-medium cursor-pointer hover:underline"
                        >
                            Register here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login