import { Recycle, Instagram, Twitter, Github, Mail } from 'lucide-react'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-inner">
                <div className="footer-brand-section">
                    <div className="navbar-brand">
                        <div className="brand-icon">
                            <Recycle size={22} />
                        </div>
                        <span className="brand-text">
                            ReWear<span className="brand-ai">AI</span>
                        </span>
                    </div>
                    <p className="footer-tagline">
                        Revolutionizing the way we view old clothes.
                        AI-powered upcycling for a sustainable future.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-link"><Instagram size={20} /></a>
                        <a href="#" className="social-link"><Twitter size={20} /></a>
                        <a href="#" className="social-link"><Github size={20} /></a>
                        <a href="#" className="social-link"><Mail size={20} /></a>
                    </div>
                </div>

                <div className="footer-links-grid">
                    <div className="footer-column">
                        <h5>Product</h5>
                        <a href="#features">Features</a>
                        <a href="#studio">Style Studio</a>
                        <a href="#sustainability">Impact Score</a>
                        <a href="#">Showcase</a>
                    </div>
                    <div className="footer-column">
                        <h5>Company</h5>
                        <a href="#">About Us</a>
                        <a href="#">Sustainability Report</a>
                        <a href="#">Press Kit</a>
                        <a href="#">Contact</a>
                    </div>
                    <div className="footer-column">
                        <h5>Resources</h5>
                        <a href="#">Tutorials</a>
                        <a href="#">DIY Blog</a>
                        <a href="#">Tailor Network</a>
                        <a href="#">Community</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p>&copy; 2026 ReWear AI. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
