import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ThreeBackground from '../components/ThreeBackground'
import './Login.css'

export default function Login() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    localStorage.setItem('agentic_user', JSON.stringify({ name: name || 'User' }))
    navigate('/chat')
  }

  return (
    <div className="login-container">
      {/* Full Screen 3D Canvas Background */}
      <ThreeBackground />

      {/* Centered Transparent Login Panel */}
      <div className="login-panel">
        <div className="login-content">
          <h1 className="login-title">Assistant</h1>
          <p className="login-subtitle">Enter the Experience</p>
          <div className="login-divider"></div>

          <form onSubmit={submit} className="login-form">
            <input 
              type="text"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="login-input" 
              placeholder="Enter your name" 
              autoFocus
            />
            <button type="submit" className="login-button">
              Begin Journey
            </button>
          </form>
        </div>

        <div className="login-footer">
          Real-time conversation awaits
        </div>
      </div>
    </div>
  )
}
