import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Bot, Sparkles, Shirt, Scissors } from 'lucide-react'
import './Chatbot.css'

const INITIAL_MESSAGES = [
    {
        role: 'bot',
        content: "Hi there! I'm your AI Fashion Assistant. How can I help you restyle your clothes today?",
        suggestions: [
            "How to restyle an old T-shirt?",
            "Trends for summer 2026",
            "Sustainable fashion tips",
        ]
    }
]

export default function Chatbot({ isOpen, onClose }) {
    const [messages, setMessages] = useState(INITIAL_MESSAGES)
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async (text = input) => {
        if (!text.trim()) return

        const userMessage = { role: 'user', content: text }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsTyping(true)

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: text,
                    history: messages
                })
            });

            const data = await response.json();
            
            if (data.success) {
                setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
            } else {
                throw new Error(data.error || 'API Error');
            }
        } catch (error) {
            console.error('Chat Error:', error);
            // Fallback response if server is not available
            setMessages(prev => [...prev, { 
                role: 'bot', 
                content: "I'm having trouble connecting to the server right now. Make sure the backend is running on port 5000. In the meantime, here's some general advice: natural fibers like cotton are easiest to dye and modify. What clothing item would you like to restyle?" 
            }]);
        } finally {
            setIsTyping(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="chatbot-container"
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.9 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                    <div className="chatbot-header">
                        <div className="header-info">
                            <div className="bot-avatar">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <h4>Fashion AI Assistant</h4>
                                <div className="status"><div className="status-dot"></div> Online</div>
                            </div>
                        </div>
                        <button className="close-btn" onClick={onClose} id="close-chatbot">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`message-wrapper ${msg.role}`}>
                                <div className="message-icon">
                                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                </div>
                                <div className="message-content">
                                    <p>{msg.content}</p>
                                    {msg.suggestions && (
                                        <div className="msg-suggestions">
                                            {msg.suggestions.map((s, j) => (
                                                <button key={j} className="suggestion-btn" onClick={() => handleSend(s)}>
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message-wrapper bot">
                                <div className="message-icon"><Bot size={14} /></div>
                                <div className="message-content typing">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder="Ask me anything about fashion..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            id="chatbot-input-field"
                        />
                        <button className="send-btn" onClick={() => handleSend()} id="send-chat-btn">
                            <Send size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
