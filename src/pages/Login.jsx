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
            localStorage.setItem('username', username.trim())
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-blue-700 dark:bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold text-xl">B</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Welcome back!
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            Login to your BizCapital account
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <span
                                onClick={() => navigate('/forgot-password')}
                                className="text-xs text-blue-700 dark:text-blue-400 cursor-pointer hover:underline"
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
                                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200 pr-12"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-blue-700 dark:bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 dark:hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Logging in...
                            </span>
                        ) : 'Login'}
                    </button>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                        Don't have an account?{' '}
                        <span
                            onClick={() => navigate('/register')}
                            className="text-blue-700 dark:text-blue-400 font-medium cursor-pointer hover:underline"
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