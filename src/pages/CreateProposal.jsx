import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function CreateProposal() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        industry: 'tech',
        funding_needed: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const role = localStorage.getItem('role')

    // Only entrepreneurs can access this page
    if(role !== 'entrepreneur') {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2 style={{ color: 'red' }}>
                    Access Denied!
                </h2>
                <p>Only entrepreneurs can create proposals.</p>
                <button
                    onClick={() => navigate('/proposals')}
                    style={{
                        background: '#1a56db',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Browse Proposals
                </button>
            </div>
        )
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError('')
        try {
            await API.post('/api/proposals/create/', formData)
            alert('Proposal created successfully!')
            navigate('/dashboard')
        } catch(err) {
            setError('Failed to create proposal! Please check your details.')
        }
        setLoading(false)
    }

    return (
        <div style={{
            maxWidth: '600px',
            margin: '50px auto',
            padding: '30px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ color: '#1a56db', textAlign: 'center' }}>
                Create Proposal
            </h2>

            {error && (
                <p style={{
                    background: '#f8d7da',
                    color: '#721c24',
                    padding: '10px',
                    borderRadius: '6px'
                }}>{error}</p>
            )}

            <div style={{ marginBottom: '15px' }}>
                <label>Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter proposal title"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '5px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your business idea"
                    rows={4}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '5px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label>Industry</label>
                <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '5px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                    }}
                >
                    <option value="tech">Technology</option>
                    <option value="health">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label>Funding Needed ($)</label>
                <input
                    name="funding_needed"
                    type="number"
                    value={formData.funding_needed}
                    onChange={handleChange}
                    placeholder="Enter amount needed"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: '5px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: '#1a56db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                {loading ? 'Creating...' : 'Create Proposal'}
            </button>

            <button
                onClick={() => navigate('/dashboard')}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: 'white',
                    color: '#1a56db',
                    border: '1px solid #1a56db',
                    borderRadius: '6px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    marginTop: '10px'
                }}
            >
                Cancel
            </button>
        </div>
    )
}

export default CreateProposal