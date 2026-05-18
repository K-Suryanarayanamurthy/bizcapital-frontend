import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleSendOTP = async () => {
        if(!email) {
            setError('Please enter your email!')
            return
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address!')
            return
        }
        setLoading(true)
        setError('')
        try {
            await API.post('/api/auth/send-otp/', { email })
            setSuccess('OTP sent to your email successfully!')
            setTimeout(() => {
                navigate('/verify-otp', { state: { email } })
            }, 1500)
        } catch(err) {
            setError('No account found with this email!')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">

                    {/* Icon */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🔐</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Forgot Password?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                            Enter your email and we'll send you an OTP to reset your password
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-600 dark:text-green-300 px-4 py-3 rounded-lg mb-6 text-sm">
                            ✅ {success}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your registered email"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition duration-200"
                        />
                    </div>

                    <button
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Sending OTP...
                            </span>
                        ) : 'Send OTP'}
                    </button>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                        Remember your password?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className="text-blue-700 dark:text-blue-300 font-medium cursor-pointer hover:underline"
                        >
                            Login here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword