import { useState, useEffect } from 'react'
import { Recycle, MessageCircle, Sparkles, Menu, X } from 'lucide-react'
import './Navbar.css'

export default function Navbar({ onChatToggle }) {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setMobileOpen(false)
    }

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} id="navbar">
            <div className="container navbar-inner">
                <a href="#" className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="brand-icon">
                        <Recycle size={22} />
                    </div>
                    <span className="brand-text">
                        ReWear<span className="brand-ai">AI</span>
                    </span>
                </a>

                <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
                    <button onClick={() => scrollTo('features')} className="nav-link">Features</button>
                    <button onClick={() => scrollTo('upload')} className="nav-link">Upload</button>
                    <button onClick={() => scrollTo('studio')} className="nav-link">Studio</button>
                    <button onClick={() => scrollTo('sustainability')} className="nav-link">Impact</button>
                </div>

                <div className="navbar-actions">
                    <button className="btn btn-ghost btn-sm" onClick={onChatToggle} id="chat-toggle-btn">
                        <MessageCircle size={16} />
                        <span>AI Chat</span>
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => scrollTo('upload')} id="get-started-btn">
                        <Sparkles size={16} />
                        <span>Get Started</span>
                    </button>
                    <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>
        </nav>
    )
}
