import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Proposals from './pages/Proposals'
import Dashboard from './pages/Dashboard'
import CreateProposal from './pages/CreateProposal'
import Messaging from './pages/Messaging'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/proposals" element={<Proposals />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-proposal" element={<CreateProposal />} />
                <Route path="/messaging" element={<Messaging />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App