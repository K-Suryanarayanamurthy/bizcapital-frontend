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
        setMenuOpen(false)
        navigate('/')
    }

    const isActive = (path) => location.pathname === path

    const handleNavigate = (path) => {
        navigate(path)
        setMenuOpen(false)
    }

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
        <>
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

                    {/* Logo */}
                    <div
                        onClick={() => handleNavigate('/')}
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
                            onClick={() => handleNavigate('/proposals')}
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
                                    onClick={() => handleNavigate('/dashboard')}
                                    className={`cursor-pointer font-medium transition duration-200 pb-1 ${
                                        isActive('/dashboard')
                                            ? 'text-blue-700 border-b-2 border-blue-700'
                                            : 'text-gray-600 hover:text-blue-700'
                                    }`}
                                >
                                    Dashboard
                                </span>

                                <span
                                    onClick={() => handleNavigate('/messaging')}
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
                                    className="hidden md:block bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 transition duration-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => handleNavigate('/login')}
                                    className="hidden md:block text-gray-600 font-medium px-4 py-1.5 rounded-lg hover:bg-gray-100 transition duration-200"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => handleNavigate('/register')}
                                    className="hidden md:block bg-blue-700 text-white font-medium px-4 py-1.5 rounded-lg hover:bg-blue-800 transition duration-200"
                                >
                                    Register
                                </button>
                            </>
                        )}

                        {/* Hamburger Button - Mobile Only */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition duration-200 relative"
                        >
                            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 bg-red-500 w-2.5 h-2.5 rounded-full"></span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Mobile Slide-in Menu */}
            <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 md:hidden ${
                menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>

                {/* Menu Header */}
                <div className="bg-blue-700 px-6 py-8">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-white font-bold text-lg">BizCapital</span>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-white hover:text-blue-200 transition duration-200"
                        >
                            ✕
                        </button>
                    </div>

                    {username ? (
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                <span className="text-blue-700 font-bold text-lg">
                                    {username[0].toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <p className="text-white font-bold">{username}</p>
                                <p className="text-blue-200 text-sm capitalize">{role}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-blue-200 text-sm">
                            Please login to access all features
                        </p>
                    )}
                </div>

                {/* Menu Links */}
                <div className="px-4 py-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wide px-2 mb-2">
                        Navigation
                    </p>

                    <button
                        onClick={() => handleNavigate('/proposals')}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition duration-200 mb-1 ${
                            isActive('/proposals')
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <span>📊</span>
                        <span>Proposals</span>
                    </button>

                    {username && (
                        <>
                            <button
                                onClick={() => handleNavigate('/dashboard')}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition duration-200 mb-1 ${
                                    isActive('/dashboard')
                                        ? 'bg-blue-50 text-blue-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <span>🏠</span>
                                <span>Dashboard</span>
                            </button>

                            <button
                                onClick={() => handleNavigate('/messaging')}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition duration-200 mb-1 ${
                                    isActive('/messaging')
                                        ? 'bg-blue-50 text-blue-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <span>💬</span>
                                <div className="flex items-center gap-2 flex-1">
                                    <span>Messages</span>
                                    {unreadCount > 0 && (
                                        <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </div>
                            </button>

                            <button
                                onClick={() => handleNavigate('/edit-profile')}
                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition duration-200 mb-1 ${
                                    isActive('/edit-profile')
                                        ? 'bg-blue-50 text-blue-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <span>👤</span>
                                <span>Edit Profile</span>
                            </button>
                        </>
                    )}
                </div>

                {/* Bottom Section */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-6 border-t border-gray-100">
                    {username ? (
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-red-500 hover:bg-red-50 transition duration-200"
                        >
                            <span>🚪</span>
                            <span>Logout</span>
                        </button>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => handleNavigate('/login')}
                                className="w-full py-2.5 border border-blue-700 text-blue-700 rounded-xl font-medium hover:bg-blue-50 transition duration-200"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => handleNavigate('/register')}
                                className="w-full py-2.5 bg-blue-700 text-white rounded-xl font-medium hover:bg-blue-800 transition duration-200"
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar