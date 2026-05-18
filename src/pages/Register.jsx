import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'entrepreneur',
        phone: '',
        bio: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validatePhone = (phone) => {
    if(!phone) return true // phone is optional
    return /^[0-9]{10}$/.test(phone)
}

const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    return password.length >= 6 && hasLetter && hasNumber && hasSpecial
}

const handleRegister = async () => {
    // Check required fields
    if(!formData.username || !formData.email || !formData.password || !formData.role) {
        setError('Please fill in all required fields!')
        return
    }

    // Validate email format
    if(!validateEmail(formData.email)) {
        setError('Please enter a valid email address!')
        return
    }

    // Validate phone format
    if(!validatePhone(formData.phone)) {
        setError('Phone number must be exactly 10 digits!')
        return
    }

    // Validate password strength
    if(!validatePassword(formData.password)) {
        setError('Password must be at least 6 characters with letters, numbers and special characters!')
        return
    }

    // Check passwords match
    if(formData.password !== formData.confirmPassword) {
        setError('Passwords do not match!')
        return
    }

    setLoading(true)
    setError('')
    try {
        await API.post('/api/auth/register/', formData)
        setSuccess('Registration successful!')
        setTimeout(() => navigate('/login'), 2000)
    } catch(err) {
        setError('Registration failed! Username or email already exists.')
    }
    setLoading(false)
}

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-blue-700 dark:bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold text-xl">B</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Create Account
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            Join BizCapital today
                        </p>
                    </div>

                    {/* Role Selector */}
                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={() => setFormData({...formData, role: 'entrepreneur'})}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition duration-200 ${
                                formData.role === 'entrepreneur'
                                    ? 'bg-blue-700 dark:bg-blue-600 text-white border-blue-700 dark:border-blue-400'
                                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:border-blue-700 dark:hover:border-blue-400'
                            }`}
                        >
                            🚀 Entrepreneur
                        </button>
                        <button
                            onClick={() => setFormData({...formData, role: 'investor'})}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition duration-200 ${
                                formData.role === 'investor'
                                    ? 'bg-blue-700 dark:bg-blue-600 text-white border-blue-700 dark:border-blue-400'
                                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:border-blue-700 dark:hover:border-blue-400'
                            }`}
                        >
                            💼 Investor
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg mb-4 text-sm">
                            ✅ {success} Redirecting to login...
                        </div>
                    )}

                    {/* Username */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200 pr-12"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* Password Strength Indicator */}
                        {formData.password && (
                            <div className="mt-2 space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs ${formData.password.length >= 6 ? 'text-green-500' : 'text-red-400'}`}>
                                        {formData.password.length >= 6 ? '✅' : '❌'} Min 6 characters
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs ${/[a-zA-Z]/.test(formData.password) ? 'text-green-500' : 'text-red-400'}`}>
                                        {/[a-zA-Z]/.test(formData.password) ? '✅' : '❌'} Contains letter
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-red-400'}`}>
                                        {/[0-9]/.test(formData.password) ? '✅' : '❌'} Contains number
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? 'text-green-500' : 'text-red-400'}`}>
                                        {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? '✅' : '❌'} Contains special character
                                    </span>
                                </div>
                            </div>
                        )}

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200"
                        />
                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                            <p className="text-xs text-red-400 mt-1">❌ Passwords do not match!</p>
                        )}
                        {formData.confirmPassword && formData.password === formData.confirmPassword && (
                            <p className="text-xs text-green-500 mt-1">✅ Passwords match!</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Phone
                        </label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200"
                        />
                    </div>

                    {/* Bio */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                            rows={3}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200 resize-none"
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating account...
                            </span>
                        ) : 'Create Account'}
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className="text-blue-700 font-medium cursor-pointer hover:underline"
                        >
                            Login here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register