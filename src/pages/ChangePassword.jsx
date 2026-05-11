import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function ChangePassword() {
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    })
    const [showOld, setShowOld] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const validatePassword = (password) => {
        const hasLetter = /[a-zA-Z]/.test(password)
        const hasNumber = /[0-9]/.test(password)
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        return password.length >= 6 && hasLetter && hasNumber && hasSpecial
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        if(!formData.old_password || !formData.new_password || !formData.confirm_password) {
            setError('Please fill in all fields!')
            return
        }
        if(!validatePassword(formData.new_password)) {
            setError('New password must be at least 6 characters with letters, numbers and special characters!')
            return
        }
        if(formData.new_password !== formData.confirm_password) {
            setError('New passwords do not match!')
            return
        }
        if(formData.old_password === formData.new_password) {
            setError('New password must be different from current password!')
            return
        }
        setLoading(true)
        setError('')
        try {
            await API.post('/api/auth/change-password/', {
                old_password: formData.old_password,
                new_password: formData.new_password
            })
            setSuccess('Password changed successfully!')
            // Clear tokens and redirect to login
            setTimeout(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('role')
                localStorage.removeItem('username')
                navigate('/login')
            }, 2000)
        } catch(err) {
            setError(err.response?.data?.error || 'Failed to change password!')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 mb-4 transition duration-200"
                        >
                            ← Back to Dashboard
                        </button>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🔒</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Change Password
                            </h2>
                            <p className="text-gray-500 text-sm mt-2">
                                Update your account password
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm">
                            ✅ {success} Redirecting to login...
                        </div>
                    )}

                    {/* Current Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                name="old_password"
                                type={showOld ? 'text' : 'password'}
                                value={formData.old_password}
                                onChange={handleChange}
                                placeholder="Enter current password"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 pr-12"
                            />
                            <button
                                onClick={() => setShowOld(!showOld)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showOld ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                name="new_password"
                                type={showNew ? 'text' : 'password'}
                                value={formData.new_password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 pr-12"
                            />
                            <button
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showNew ? '🙈' : '👁️'}
                            </button>
                        </div>

                        {/* Password Strength */}
                        {formData.new_password && (
                            <div className="mt-2 space-y-1">
                                <span className={`text-xs block ${formData.new_password.length >= 6 ? 'text-green-500' : 'text-red-400'}`}>
                                    {formData.new_password.length >= 6 ? '✅' : '❌'} Min 6 characters
                                </span>
                                <span className={`text-xs block ${/[a-zA-Z]/.test(formData.new_password) ? 'text-green-500' : 'text-red-400'}`}>
                                    {/[a-zA-Z]/.test(formData.new_password) ? '✅' : '❌'} Contains letter
                                </span>
                                <span className={`text-xs block ${/[0-9]/.test(formData.new_password) ? 'text-green-500' : 'text-red-400'}`}>
                                    {/[0-9]/.test(formData.new_password) ? '✅' : '❌'} Contains number
                                </span>
                                <span className={`text-xs block ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.new_password) ? 'text-green-500' : 'text-red-400'}`}>
                                    {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.new_password) ? '✅' : '❌'} Contains special character
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Confirm New Password
                        </label>
                        <input
                            name="confirm_password"
                            type="password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                        {formData.confirm_password && formData.new_password !== formData.confirm_password && (
                            <p className="text-xs text-red-400 mt-1">❌ Passwords do not match!</p>
                        )}
                        {formData.confirm_password && formData.new_password === formData.confirm_password && (
                            <p className="text-xs text-green-500 mt-1">✅ Passwords match!</p>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Changing...
                            </span>
                        ) : 'Change Password'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword