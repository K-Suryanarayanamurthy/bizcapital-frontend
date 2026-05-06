import { useState, useEffect } from 'react'
import API from '../api/axios'

function Proposals() {
    const [proposals, setProposals] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        API.get('/api/proposals/list/')
            .then(res => {
                setProposals(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    if(loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Loading proposals...</h2>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
            <h1 style={{ color: '#1a56db' }}>Business Proposals</h1>
            <p style={{ color: '#666' }}>Total: {proposals.length} proposals</p>

            {proposals.length === 0 && (
                <p>No proposals found!</p>
            )}

            {proposals.map(proposal => (
                <div key={proposal.id} style={{
                    border: '1px solid #ddd',
                    padding: '20px',
                    margin: '15px 0',
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    background: 'white'
                }}>
                    <h3 style={{ color: '#1a56db', margin: '0 0 10px 0' }}>
                        {proposal.title}
                    </h3>
                    <p style={{ color: '#444', margin: '0 0 10px 0' }}>
                        {proposal.description}
                    </p>
                    <p><strong>By:</strong> {proposal.entrepreneur_name}</p>
                    <p><strong>Industry:</strong> {proposal.industry}</p>
                    <p><strong>Funding Needed:</strong> ${proposal.funding_needed}</p>
                    <div style={{ marginTop: '10px' }}>
                        <span style={{
                            background: '#1a56db',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '13px',
                            marginRight: '8px'
                        }}>
                            {proposal.industry}
                        </span>
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
                </div>
            ))}
        </div>
    )
}

export default Proposals