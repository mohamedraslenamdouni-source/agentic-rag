import { useEffect, useState } from 'react'
import axios from 'axios'
import ThreeBackground from '../components/ThreeBackground'
import './Chat.css'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('agentic_user') || 'null')
    if(!user) window.location.href = '/'
  }, [])

  const send = async () => {
    if(!text) return
    const user = JSON.parse(localStorage.getItem('agentic_user') || '{}')
    const incoming = { from: 'you', text }
    setMessages((m)=>[...m, incoming])
    setText('')
    setLoading(true)
    try{
      const res = await axios.post('http://localhost:4000/webhook', { message: text, user: user.name })
      setMessages((m)=>[...m, { from: 'bot', text: res.data.response }])
    }catch(err){
      setMessages((m)=>[...m, { from: 'bot', text: 'Error connecting to webhook' }])
    }
    setLoading(false)
  }

  return (
    <div className="flex h-screen w-screen bg-black overflow-hidden">
      {/* 3D Canvas - Left Side */}
      <div className="flex-1 relative">
        <ThreeBackground />
      </div>

      {/* Chat Panel - Right Side with CSS Zen Garden Styling */}
      <div className="chat-panel w-96 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="chat-header">
          <h2>Assistant</h2>
          <p>Real-time conversation</p>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.length === 0 && (
            <p className="chat-message-empty">Start a conversation</p>
          )}
          {messages.map((m, i)=> (
            <div key={i} style={{display: 'flex', justifyContent: m.from === 'you' ? 'flex-end' : 'flex-start', marginBottom: '10px'}}>
              <div className={`message-bubble ${m.from === 'you' ? 'message-from-user' : 'message-from-bot'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{display: 'flex', justifyContent: 'flex-start', marginBottom: '10px'}}>
              <div className="message-bubble message-typing">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="chat-input-container">
          <input 
            value={text} 
            onChange={(e)=>setText(e.target.value)} 
            onKeyPress={(e)=>e.key==='Enter' && !loading && send()}
            className="chat-input" 
            placeholder="Type message..." 
            disabled={loading}
          />
          <button 
            onClick={send} 
            disabled={loading}
            className="chat-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
