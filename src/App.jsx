import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Proposals from './pages/Proposals'
import Dashboard from './pages/Dashboard'
import CreateProposal from './pages/CreateProposal'
import Messaging from './pages/Messaging'
import Home from './pages/Home'
import EditProfile from './pages/EditProfile'
import ProposalDetail from './pages/ProposalDetail'
import Navbar from './components/Navbar'
import Feedback from './pages/Feedback'
import EditProposal from './pages/EditProposal'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/proposals/:id" element={<ProposalDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-proposal" element={<CreateProposal />} />
                <Route path="/messaging" element={<Messaging />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/feedback/:userId" element={<Feedback />} />
                <Route path="/edit-proposal/:id" element={<EditProposal />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App