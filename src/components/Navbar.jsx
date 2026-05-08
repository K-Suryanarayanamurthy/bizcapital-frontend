import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import API from '../api/axios'

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const username = localStorage.getItem('username')?.trim()
    const role = localStorage.getItem('role')
    const [menuOpen, setMenuOpen] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0)

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('username')
        navigate('/')
    }

    const isActive = (path) => location.pathname === path

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) return

        const fetchUnreadCount = async () => {
            try {
                const res = await API.get('/api/messaging/unread-count/')
                setUnreadCount(res.data.unread_count)
            } catch(err) {
                console.log(err)
            }
        }

        fetchUnreadCount()
        const interval = setInterval(fetchUnreadCount, 30000)
        return () => clearInterval(interval)
    }, [username])

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">B</span>
                    </div>
                    <span className="text-xl font-bold text-blue-700">
                        BizCapital
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6">
                    <span
                        onClick={() => navigate('/proposals')}
                        className={`cursor-pointer font-medium transition duration-200 pb-1 ${
                            isActive('/proposals')
                                ? 'text-blue-700 border-b-2 border-blue-700'
                                : 'text-gray-600 hover:text-blue-700'
                        }`}
                    >
                        Proposals
                    </span>

                    {username && (
                        <>
                            <span
                                onClick={() => navigate('/dashboard')}
                                className={`cursor-pointer font-medium transition duration-200 pb-1 ${
                                    isActive('/dashboard')
                                        ? 'text-blue-700 border-b-2 border-blue-700'
                                        : 'text-gray-600 hover:text-blue-700'
                                }`}
                            >
                                Dashboard
                            </span>

                            {/* Messages with notification badge */}
                            <span
                                onClick={() => navigate('/messaging')}
                                className={`cursor-pointer font-medium transition duration-200 pb-1 relative ${
                                    isActive('/messaging')
                                        ? 'text-blue-700 border-b-2 border-blue-700'
                                        : 'text-gray-600 hover:text-blue-700'
                                }`}
                            >
                                Messages
                                {unreadCount > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </span>
                        </>
                    )}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    {username ? (
                        <>
                            <div className="hidden md:flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                                <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">
                                        {username[0].toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-blue-700 text-sm font-medium">
                                    {username}
                                </span>
                                <span className="text-blue-400 text-xs">
                                    ({role})
                                </span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 transition duration-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="text-gray-600 font-medium px-4 py-1.5 rounded-lg hover:bg-gray-100 transition duration-200"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="bg-blue-700 text-white font-medium px-4 py-1.5 rounded-lg hover:bg-blue-800 transition duration-200"
                            >
                                Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar