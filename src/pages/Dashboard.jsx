import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Dashboard() {
    const [profile, setProfile] = useState(null)
    const [proposals, setProposals] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const role = localStorage.getItem('role')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/login')
            return
        }

        // Get profile
        API.get('/api/auth/profile/')
            .then(res => {
                setProfile(res.data)
                setLoading(false)
            })
            .catch(err => {
                navigate('/login')
            })

        // If entrepreneur get their proposals
        if(role === 'entrepreneur') {
            API.get('/api/proposals/list/')
                .then(res => {
                    const myProposals = res.data.filter(
                        p => p.entrepreneur_name === localStorage.getItem('username')
                    )
                    setProposals(myProposals)
                })
        }
    }, [])

    if(loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Loading dashboard...</h2>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>

            {/* Profile Card */}
            <div style={{
                background: '#f0f4ff',
                padding: '25px',
                borderRadius: '10px',
                marginBottom: '30px',
                border: '1px solid #ddd'
            }}>
                <h2 style={{ color: '#1a56db', margin: '0 0 15px 0' }}>
                    My Profile
                </h2>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Role:</strong> {profile.role}</p>
                <p><strong>Phone:</strong> {profile.phone || 'Not provided'}</p>
                <p><strong>Bio:</strong> {profile.bio || 'Not provided'}</p>
                <p><strong>Joined:</strong> {new Date(profile.date_joined).toLocaleDateString()}</p>
            </div>

            {/* Entrepreneur Section */}
            {role === 'entrepreneur' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ color: '#1a56db' }}>My Proposals</h2>
                        <button
                            onClick={() => navigate('/create-proposal')}
                            style={{
                                background: '#1a56db',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }}
                        >
                            + Create Proposal
                        </button>
                    </div>



                    {proposals.length === 0 && (
                        <p style={{ color: '#666' }}>
                            You have no proposals yet!
                        </p>
                    )}

                    {proposals.map(proposal => (
                        <div key={proposal.id} style={{
                            border: '1px solid #ddd',
                            padding: '20px',
                            margin: '15px 0',
                            borderRadius: '10px',
                            background: 'white'
                        }}>
                            <h3 style={{ color: '#1a56db', margin: '0 0 10px 0' }}>
                                {proposal.title}
                            </h3>
                            <p>{proposal.description}</p>
                            <p><strong>Funding:</strong> ${proposal.funding_needed}</p>
                            <span style={{
                                background: proposal.status === 'open' ? '#28a745' : '#dc3545',
                                color: 'white',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '13px'
                            }}>
                                {proposal.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Investor Section */}
            {role === 'investor' && (
                <div style={{
                    background: '#f0f4ff',
                    padding: '25px',
                    borderRadius: '10px',
                    border: '1px solid #ddd'
                }}>
                    <h2 style={{ color: '#1a56db', margin: '0 0 15px 0' }}>
                        Investor Dashboard
                    </h2>
                    <p>Browse proposals and connect with entrepreneurs!</p>
                    <button
                        onClick={() => navigate('/proposals')}
                        style={{
                            background: '#1a56db',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Browse Proposals
                    </button>
                </div>
            )}
        </div>
    )
}

export default Dashboard