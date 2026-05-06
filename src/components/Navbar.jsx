import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('username')
        navigate('/login')
    }

    return (
        <nav style={{
            background: '#1a56db',
            padding: '15px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            {/* Logo */}
            <h2
                onClick={() => navigate('/proposals')}
                style={{
                    color: 'white',
                    margin: 0,
                    cursor: 'pointer'
                }}
            >
                BizCapital
            </h2>

            {/* Navigation Links */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span
                    onClick={() => navigate('/proposals')}
                    style={{ color: 'white', cursor: 'pointer' }}
                >
                    Proposals
                </span>

                {username ? (
                    <>
                        <span
                            onClick={() => navigate('/dashboard')}
                            style={{ color: 'white', cursor: 'pointer' }}
                        >
                            Dashboard
                        </span>
                        <span
                            onClick={() => navigate('/messaging')}
                            style={{ color: 'white', cursor: 'pointer' }}
                        >
                            Messages
                        </span>
                        <span style={{ color: '#ccc', fontSize: '14px' }}>
                            {username} ({role})
                        </span>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'white',
                                color: '#1a56db',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <span
                            onClick={() => navigate('/login')}
                            style={{ color: 'white', cursor: 'pointer' }}
                        >
                            Login
                        </span>
                        <span
                            onClick={() => navigate('/register')}
                            style={{ color: 'white', cursor: 'pointer' }}
                        >
                            Register
                        </span>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar