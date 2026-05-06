import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Messaging() {
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState(null)
    const [messages, setMessages] = useState([])
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const role = localStorage.getItem('role')
    const username = localStorage.getItem('username')

    // Determine which role to fetch
    const contactRole = role === 'investor' ? 'entrepreneur' : 'investor'

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/login')
            return
        }
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
    try {
        const res = await API.get(`/api/auth/users/?role=${contactRole}`)
        // Remove duplicates by id
        const unique = res.data.filter(
            (contact, index, self) =>
                index === self.findIndex(c => c.id === contact.id)
        )
        setContacts(unique)
        setLoading(false)
    } catch(err) {
        navigate('/login')
    }
}

    const fetchConversation = async (contactId) => {
        try {
            const res = await API.get(`/api/messaging/conversation/${contactId}/`)
            setMessages(res.data)
        } catch(err) {
            console.log(err)
        }
    }

    const handleSelectContact = (contact) => {
        setSelectedContact(contact)
        setError('')
        fetchConversation(contact.id)
    }

    const handleSend = async () => {
        if(!content.trim()) return
        setError('')
        try {
            await API.post('/api/messaging/send/', {
                receiver: selectedContact.id,
                content: content
            })
            setContent('')
            fetchConversation(selectedContact.id)
        } catch(err) {
            setError('Failed to send message!')
        }
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    if(loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Loading messages...</h2>
            </div>
        )
    }

    return (
        <div style={{
            display: 'flex',
            height: 'calc(100vh - 60px)',
            fontFamily: 'Arial, sans-serif'
        }}>

            {/* Left Side - Contacts List */}
            <div style={{
                width: '300px',
                borderRight: '1px solid #ddd',
                overflowY: 'auto',
                background: '#f8f9fa'
            }}>
                <div style={{
                    padding: '15px',
                    background: '#1a56db',
                    color: 'white'
                }}>
                    <h3 style={{ margin: 0 }}>
                        {contactRole === 'entrepreneur' ? '🚀 Entrepreneurs' : '💼 Investors'}
                    </h3>
                </div>

                {contacts.length === 0 && (
                    <p style={{ padding: '20px', color: '#666' }}>
                        No {contactRole}s found!
                    </p>
                )}

                {contacts.map(contact => (
                    <div
                        key={contact.id}
                        onClick={() => handleSelectContact(contact)}
                        style={{
                            padding: '15px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #eee',
                            background: selectedContact?.id === contact.id ? '#e8f0fe' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}
                    >
                        {/* Avatar */}
                        <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            background: '#1a56db',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            flexShrink: 0
                        }}>
                            {contact.username[0].toUpperCase()}
                        </div>

                        {/* Contact Info */}
                        <div>
                            <p style={{ margin: 0, fontWeight: 'bold', color: '#1a1a1a' }}>
                                {contact.username}
                            </p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>
                                {contact.role}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Side - Chat Window */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                background: '#f0f4ff'
            }}>

                {/* No contact selected */}
                {!selectedContact && (
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        color: '#888'
                    }}>
                        <p style={{ fontSize: '50px' }}>💬</p>
                        <h3>Select a contact to start chatting!</h3>
                        <p>Click on a name from the left panel</p>
                    </div>
                )}

                {/* Chat Window */}
                {selectedContact && (
                    <>
                        {/* Chat Header */}
                        <div style={{
                            padding: '15px 20px',
                            background: '#1a56db',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'white',
                                color: '#1a56db',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}>
                                {selectedContact.username[0].toUpperCase()}
                            </div>
                            <div>
                                <p style={{ margin: 0, fontWeight: 'bold' }}>
                                    {selectedContact.username}
                                </p>
                                <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                                    {selectedContact.role}
                                </p>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            {messages.length === 0 && (
                                <div style={{
                                    textAlign: 'center',
                                    color: '#888',
                                    marginTop: '50px'
                                }}>
                                    <p>No messages yet!</p>
                                    <p>Say hello to {selectedContact.username} 👋</p>
                                </div>
                            )}

                            {messages.map(message => {
                                const isMe = message.sender_name === username
                                return (
                                    <div
                                        key={message.id}
                                        style={{
                                            display: 'flex',
                                            justifyContent: isMe ? 'flex-end' : 'flex-start'
                                        }}
                                    >
                                        <div style={{
                                            maxWidth: '65%',
                                            padding: '10px 15px',
                                            borderRadius: isMe
                                                ? '18px 18px 4px 18px'
                                                : '18px 18px 18px 4px',
                                            background: isMe ? '#1a56db' : 'white',
                                            color: isMe ? 'white' : '#1a1a1a',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                        }}>
                                            <p style={{ margin: '0 0 5px 0' }}>
                                                {message.content}
                                            </p>
                                            <p style={{
                                                margin: 0,
                                                fontSize: '11px',
                                                opacity: 0.7,
                                                textAlign: 'right'
                                            }}>
                                                {new Date(message.created_at).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Error */}
                        {error && (
                            <p style={{
                                background: '#f8d7da',
                                color: '#721c24',
                                padding: '10px',
                                margin: '0 20px'
                            }}>{error}</p>
                        )}

                        {/* Message Input */}
                        <div style={{
                            padding: '15px 20px',
                            background: 'white',
                            borderTop: '1px solid #ddd',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center'
                        }}>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={`Message ${selectedContact.username}...`}
                                rows={1}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '25px',
                                    resize: 'none',
                                    outline: 'none',
                                    fontSize: '14px'
                                }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    background: '#1a56db',
                                    color: 'white',
                                    border: 'none',
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                ➤
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Messaging