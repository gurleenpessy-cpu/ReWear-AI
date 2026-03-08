import { Sparkles, ArrowDown, Leaf, Wand2, Shirt } from 'lucide-react'
import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero() {
    return (
        <section className="hero" id="hero">
            {/* Gradient orbs */}
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />

            <div className="container hero-content">
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Leaf size={14} />
                    <span>Sustainable Fashion Powered by AI</span>
                </motion.div>

                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    Don't Throw It Away.
                    <br />
                    <span className="gradient-text-hero">ReWear It.</span>
                </motion.h1>

                <motion.p
                    className="hero-description"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    Upload your old clothes, let AI reimagine them into stunning new styles.
                    Get step-by-step DIY guides to transform your wardrobe sustainably.
                </motion.p>

                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.45 }}
                >
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
                        id="hero-cta-btn"
                    >
                        <Wand2 size={20} />
                        Start Redesigning
                    </button>
                    <button
                        className="btn btn-secondary btn-lg"
                        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                        id="hero-learn-btn"
                    >
                        See How It Works
                    </button>
                </motion.div>

                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    <div className="hero-stat">
                        <span className="hero-stat-value gradient-text">92M+</span>
                        <span className="hero-stat-label">Tons of Fashion Waste/Year</span>
                    </div>
                    <div className="hero-stat-divider" />
                    <div className="hero-stat">
                        <span className="hero-stat-value gradient-text">$500B</span>
                        <span className="hero-stat-label">Value Lost to Waste</span>
                    </div>
                    <div className="hero-stat-divider" />
                    <div className="hero-stat">
                        <span className="hero-stat-value" style={{ color: 'var(--accent)' }}>∞</span>
                        <span className="hero-stat-label">Possible Redesigns</span>
                    </div>
                </motion.div>

                {/* Floating elements */}
                <div className="hero-float hero-float-1">
                    <Shirt size={28} />
                </div>
                <div className="hero-float hero-float-2">
                    <Sparkles size={24} />
                </div>
                <div className="hero-float hero-float-3">
                    <Leaf size={22} />
                </div>
            </div>

            <motion.div
                className="hero-scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <ArrowDown size={20} className="hero-scroll-icon" />
            </motion.div>
        </section>
    )
}
