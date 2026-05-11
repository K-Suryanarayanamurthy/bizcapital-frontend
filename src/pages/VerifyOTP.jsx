import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import API from '../api/axios'

function VerifyOTP() {
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email

    // If no email passed redirect to forgot password
    if(!email) {
        navigate('/forgot-password')
        return null
    }

    const handleVerifyOTP = async () => {
        if(!otp) {
            setError('Please enter the OTP!')
            return
        }
        if(otp.length !== 6) {
            setError('OTP must be 6 digits!')
            return
        }
        setLoading(true)
        setError('')
        try {
            await API.post('/api/auth/verify-otp/', { email, otp })
            setSuccess('OTP verified successfully!')
            setTimeout(() => {
                navigate('/reset-password', { state: { email } })
            }, 1500)
        } catch(err) {
            setError(err.response?.data?.error || 'Invalid or expired OTP!')
        }
        setLoading(false)
    }

    const handleResendOTP = async () => {
        setError('')
        try {
            await API.post('/api/auth/send-otp/', { email })
            setSuccess('New OTP sent to your email!')
            setTimeout(() => setSuccess(''), 3000)
        } catch(err) {
            setError('Failed to resend OTP!')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

                    {/* Icon */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">📧</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Enter OTP
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            We sent a 6 digit OTP to
                        </p>
                        <p className="text-blue-700 font-medium text-sm">
                            {email}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm">
                            ✅ {success}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            6 Digit OTP
                        </label>
                        <input
                            type="number"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6 digit OTP"
                            maxLength={6}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-center text-2xl tracking-widest font-bold"
                        />
                        <p className="text-xs text-gray-400 mt-1 text-center">
                            OTP expires in 10 minutes
                        </p>
                    </div>

                    <button
                        onClick={handleVerifyOTP}
                        disabled={loading}
                        className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition duration-200 disabled:opacity-50 mb-3"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Verifying...
                            </span>
                        ) : 'Verify OTP'}
                    </button>

                    <button
                        onClick={handleResendOTP}
                        className="w-full border border-gray-300 text-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition duration-200"
                    >
                        Resend OTP
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        <span
                            onClick={() => navigate('/forgot-password')}
                            className="text-blue-700 font-medium cursor-pointer hover:underline"
                        >
                            ← Change Email
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default VerifyOTP