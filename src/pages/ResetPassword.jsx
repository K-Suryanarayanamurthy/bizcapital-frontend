import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import API from '../api/axios'

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email

    if(!email) {
        navigate('/forgot-password')
        return null
    }

    const validatePassword = (password) => {
        const hasLetter = /[a-zA-Z]/.test(password)
        const hasNumber = /[0-9]/.test(password)
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        return password.length >= 6 && hasLetter && hasNumber && hasSpecial
    }

    const handleResetPassword = async () => {
        if(!newPassword || !confirmPassword) {
            setError('Please fill in all fields!')
            return
        }
        if(!validatePassword(newPassword)) {
            setError('Password must be at least 6 characters with letters, numbers and special characters!')
            return
        }
        if(newPassword !== confirmPassword) {
            setError('Passwords do not match!')
            return
        }
        setLoading(true)
        setError('')
        try {
            await API.post('/api/auth/reset-password/', {
                email,
                new_password: newPassword
            })
            setSuccess('Password reset successfully!')
            setTimeout(() => navigate('/login'), 2000)
        } catch(err) {
            setError('Failed to reset password! Please try again.')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                    {/* Icon */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🔑</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Reset Password
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            Create a new strong password for your account
                        </p>
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

                    {/* New Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 pr-12"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>

                        {/* Password Strength */}
                        {newPassword && (
                            <div className="mt-2 space-y-1">
                                <span className={`text-xs block ${newPassword.length >= 6 ? 'text-green-500' : 'text-red-400'}`}>
                                    {newPassword.length >= 6 ? '✅' : '❌'} Min 6 characters
                                </span>
                                <span className={`text-xs block ${/[a-zA-Z]/.test(newPassword) ? 'text-green-500' : 'text-red-400'}`}>
                                    {/[a-zA-Z]/.test(newPassword) ? '✅' : '❌'} Contains letter
                                </span>
                                <span className={`text-xs block ${/[0-9]/.test(newPassword) ? 'text-green-500' : 'text-red-400'}`}>
                                    {/[0-9]/.test(newPassword) ? '✅' : '❌'} Contains number
                                </span>
                                <span className={`text-xs block ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword) ? 'text-green-500' : 'text-red-400'}`}>
                                    {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword) ? '✅' : '❌'} Contains special character
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                        {confirmPassword && newPassword !== confirmPassword && (
                            <p className="text-xs text-red-400 mt-1">
                                ❌ Passwords do not match!
                            </p>
                        )}
                        {confirmPassword && newPassword === confirmPassword && (
                            <p className="text-xs text-green-500 mt-1">
                                ✅ Passwords match!
                            </p>
                        )}
                    </div>

                    <button
                        onClick={handleResetPassword}
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Resetting...
                            </span>
                        ) : 'Reset Password'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword