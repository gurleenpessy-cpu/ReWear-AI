import { motion } from 'framer-motion'
import { Upload, Wand2, Eye, BookOpen, BarChart3, MessageCircle } from 'lucide-react'
import './Features.css'

const features = [
    {
        icon: Upload,
        title: 'Smart Upload',
        description: 'Upload any clothing photo. Our AI instantly detects the item type — shirts, jeans, jackets, dresses, and more.',
        color: 'var(--primary)',
        bg: 'rgba(124, 58, 237, 0.1)',
        border: 'rgba(124, 58, 237, 0.2)',
    },
    {
        icon: Wand2,
        title: 'AI Redesign',
        description: 'Powerful AI generates multiple stunning redesigns. From streetwear to vintage, Korean fashion to boho chic.',
        color: 'var(--accent)',
        bg: 'rgba(6, 214, 160, 0.1)',
        border: 'rgba(6, 214, 160, 0.2)',
    },
    {
        icon: Eye,
        title: 'Virtual Preview',
        description: 'Compare before & after side by side. Switch between styles instantly and find your perfect transformation.',
        color: 'var(--sky)',
        bg: 'rgba(14, 165, 233, 0.1)',
        border: 'rgba(14, 165, 233, 0.2)',
    },
    {
        icon: BookOpen,
        title: 'DIY Guide',
        description: 'Get step-by-step transformation instructions. Cut, sew, dye — everything you need to recreate the look.',
        color: 'var(--amber)',
        bg: 'rgba(245, 158, 11, 0.1)',
        border: 'rgba(245, 158, 11, 0.2)',
    },
    {
        icon: BarChart3,
        title: 'Sustainability Score',
        description: 'Track your environmental impact. See how much waste you prevent and money you save with each redesign.',
        color: 'var(--accent)',
        bg: 'rgba(6, 214, 160, 0.1)',
        border: 'rgba(6, 214, 160, 0.2)',
    },
    {
        icon: MessageCircle,
        title: 'Fashion Chatbot',
        description: 'Ask our AI stylist anything — from restyling tips to accessory recommendations. Your personal fashion assistant.',
        color: 'var(--rose)',
        bg: 'rgba(244, 63, 94, 0.1)',
        border: 'rgba(244, 63, 94, 0.2)',
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Features() {
    return (
        <section className="section features-section" id="features">
            <div className="container">
                <motion.div
                    className="features-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="badge badge-primary">✨ Features</span>
                    <h2 className="section-title">
                        Everything You Need to <br />
                        <span className="gradient-text">Reimagine Fashion</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        From AI-powered redesigns to sustainability tracking — a complete
                        toolkit for conscious fashion transformation.
                    </p>
                </motion.div>

                <motion.div
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {features.map((feat, i) => (
                        <motion.div key={i} className="feature-card" variants={itemVariants}>
                            <div
                                className="feature-icon"
                                style={{
                                    background: feat.bg,
                                    border: `1px solid ${feat.border}`,
                                    color: feat.color,
                                }}
                            >
                                <feat.icon size={24} />
                            </div>
                            <h3 className="feature-title">{feat.title}</h3>
                            <p className="feature-desc">{feat.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
