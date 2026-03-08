import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Droplets, DollarSign, Recycle, TreePine, Heart, TrendingUp } from 'lucide-react'
import './SustainabilityScore.css'

const SUSTAINABILITY_DATA = {
    'T-Shirt': { water: 2700, co2: 7, cost: 25, landfill: 0.25 },
    'Jeans': { water: 7600, co2: 33.4, cost: 60, landfill: 0.9 },
    'Jacket': { water: 5000, co2: 15, cost: 80, landfill: 1.2 },
    'Dress': { water: 4000, co2: 12, cost: 55, landfill: 0.6 },
    'Skirt': { water: 2500, co2: 8, cost: 35, landfill: 0.3 },
    'Sweater': { water: 3500, co2: 10, cost: 45, landfill: 0.5 },
    'Shorts': { water: 2200, co2: 6, cost: 30, landfill: 0.2 },
    'Accessory': { water: 1000, co2: 3, cost: 20, landfill: 0.1 },
}

function AnimatedCounter({ end, duration = 2, suffix = '' }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let start = 0
        const increment = end / (duration * 60)
        let frame

        const animate = () => {
            start += increment
            if (start >= end) {
                setCount(end)
                return
            }
            setCount(Math.floor(start))
            frame = requestAnimationFrame(animate)
        }
        frame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frame)
    }, [end, duration])

    return <span>{count.toLocaleString()}{suffix}</span>
}

export default function SustainabilityScore({ uploadedImage, detectedCategory }) {
    if (!uploadedImage || !detectedCategory) return null

    const data = SUSTAINABILITY_DATA[detectedCategory.name] || SUSTAINABILITY_DATA['T-Shirt']
    const overallScore = Math.min(95, Math.round(75 + (data.co2 / 33.4) * 20))

    return (
        <section className="section sustainability-section" id="sustainability">
            <div className="container">
                <motion.div
                    className="sustainability-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="badge badge-accent">🌍 Impact</span>
                    <h2 className="section-title">
                        Your <span className="gradient-text">Sustainability</span> Impact
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        By choosing to rewear instead of buying new, here's the positive impact you're making.
                    </p>
                </motion.div>

                {/* Score circle */}
                <motion.div
                    className="score-hero"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="score-circle-wrapper">
                        <svg className="score-circle-svg" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="88" fill="none" stroke="var(--surface-border)" strokeWidth="8" />
                            <circle
                                cx="100" cy="100" r="88"
                                fill="none"
                                stroke="url(#scoreGradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 88 * overallScore / 100} ${2 * Math.PI * 88}`}
                                transform="rotate(-90 100 100)"
                                className="score-circle-progress"
                            />
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="var(--primary)" />
                                    <stop offset="100%" stopColor="var(--accent)" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="score-circle-value">
                            <span className="score-number gradient-text"><AnimatedCounter end={overallScore} /></span>
                            <span className="score-label">Eco Score</span>
                        </div>
                    </div>
                </motion.div>

                {/* Stats grid */}
                <motion.div
                    className="sustainability-stats"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--sky)' }}>
                            <Droplets size={24} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-value">
                                <AnimatedCounter end={data.water} suffix="L" />
                            </span>
                            <span className="stat-name">Water Saved</span>
                            <span className="stat-detail">Liters not used in production</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'rgba(6, 214, 160, 0.1)', color: 'var(--accent)' }}>
                            <TreePine size={24} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-value">
                                <AnimatedCounter end={data.co2} suffix=" kg" />
                            </span>
                            <span className="stat-name">CO₂ Prevented</span>
                            <span className="stat-detail">Carbon emissions avoided</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--amber)' }}>
                            <DollarSign size={24} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-value">
                                $<AnimatedCounter end={data.cost} />
                            </span>
                            <span className="stat-name">Money Saved</span>
                            <span className="stat-detail">vs. buying new clothing</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--rose)' }}>
                            <Recycle size={24} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-value">
                                <AnimatedCounter end={Math.round(data.landfill * 100) / 100} suffix=" kg" />
                            </span>
                            <span className="stat-name">Landfill Diverted</span>
                            <span className="stat-detail">Textile waste prevented</span>
                        </div>
                    </div>
                </motion.div>

                {/* Impact message */}
                <motion.div
                    className="impact-message"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Heart size={18} style={{ color: 'var(--rose)' }} />
                    <span>
                        By rewearing this <strong>{detectedCategory.name.toLowerCase()}</strong>, you're making a real
                        difference. Every small action counts towards a more sustainable future.
                    </span>
                    <TrendingUp size={18} style={{ color: 'var(--accent)' }} />
                </motion.div>
            </div>
        </section>
    )
}
