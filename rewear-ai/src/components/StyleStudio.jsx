import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Wand2, Sparkles, RefreshCw, ArrowLeftRight, Loader2, Scissors,
    Palette, Gem, Zap, Crown, Flame, Star, BookOpen, ChevronRight, ChevronLeft,
    Type, Heart, Music, Sparkle, Moon, Sun
} from 'lucide-react'
import './StyleStudio.css'

// Korean Fashion Text Design Presets
const KOREAN_TEXT_DESIGNS = [
    {
        id: 'korean-bold',
        label: 'Korean Bold',
        koreanLabel: '한글 굵은',
        icon: Type,
        color: '#ec4899',
        description: 'Bold Korean typography with strong presence',
        fontStyle: '700',
        textEffect: 'bold'
    },
    {
        id: 'minimal-hangul',
        label: 'Minimalist',
        koreanLabel: '미니멀 한글',
        icon: Gem,
        color: '#0ea5e9',
        description: 'Clean, minimal Korean text design',
        fontStyle: '400',
        textEffect: 'minimal'
    },
    {
        id: 'neon-korean',
        label: 'Neon Glow',
        koreanLabel: '네온 한글',
        icon: Sparkle,
        color: '#f43f5e',
        description: 'Glowing neon Korean text effect',
        fontStyle: '600',
        textEffect: 'neon'
    },
    {
        id: 'vintage-korean',
        label: 'Vintage Korean',
        koreanLabel: '빈티지 한글',
        icon: Moon,
        color: '#f59e0b',
        description: 'Retro vintage Korean typography',
        fontStyle: '500',
        textEffect: 'vintage'
    },
    {
        id: 'kpop-style',
        label: 'K-Pop Style',
        koreanLabel: 'K-POP 스타일',
        icon: Music,
        color: '#8b5cf6',
        description: 'Dynamic K-Pop inspired text design',
        fontStyle: '800',
        textEffect: 'dynamic'
    },
    {
        id: 'soft-hangul',
        label: 'Soft Pastel',
        koreanLabel: '소프트 파스텔',
        icon: Heart,
        color: '#fb7185',
        description: 'Soft pastel Korean text with gentle vibes',
        fontStyle: '300',
        textEffect: 'soft'
    },
    {
        id: 'street-korean',
        label: 'Street Style',
        koreanLabel: '스트릿 한글',
        icon: Zap,
        color: '#06d6a0',
        description: 'Edgy streetwear Korean text',
        fontStyle: '900',
        textEffect: 'street'
    },
    {
        id: 'elegant-hangul',
        label: 'Elegant',
        koreanLabel: '엘레강스',
        icon: Crown,
        color: '#a78bfa',
        description: 'Elegant sophisticated Korean typography',
        fontStyle: '400',
        textEffect: 'elegant'
    },
    {
        id: 'cyber-seoul',
        label: 'Cyber Seoul',
        koreanLabel: '사이버 서울',
        icon: Zap,
        color: '#f472b6',
        description: 'Custom neon Korean typography integrated with abstract geometric graphic symbols and Seoul street aesthetic.',
        fontStyle: '800',
        textEffect: 'cyber-neon'
    },
]

const STYLE_PRESETS = [
    { id: 'streetwear', label: 'Streetwear', icon: Zap, color: '#f43f5e' },
    { id: 'vintage', label: 'Vintage', icon: Crown, color: '#f59e0b' },
    { id: 'korean', label: 'Korean', icon: Star, color: '#ec4899' },
    { id: 'minimalist', label: 'Minimalist', icon: Gem, color: '#0ea5e9' },
    { id: 'bohemian', label: 'Bohemian', icon: Palette, color: '#8b5cf6' },
    { id: 'grunge', label: 'Grunge', icon: Flame, color: '#ef4444' },
    { id: 'pro-streetwear', label: 'Pro Redesign', icon: Sparkles, color: '#a855f7' },
    { id: 'artisan-patchwork', label: 'Artisan Patchwork', icon: Palette, color: '#f59e0b' },
    { id: 'vanguard-redesign', label: 'Vanguard (Wow!)', icon: Flame, color: '#10b981' },
]

const SAMPLE_REDESIGNS = {
    streetwear: {
        description: 'Urban streetwear transformation with bold graphic elements and oversized silhouette',
        color: '#1a1a2e',
        overlay: 'linear-gradient(135deg, #f43f5e33, #7c3aed33)',
    },
    vintage: {
        description: 'Classic vintage revival with retro patterns, earth tones, and timeless cuts',
        color: '#2d1f0e',
        overlay: 'linear-gradient(135deg, #f59e0b33, #92400e33)',
    },
    korean: {
        description: 'K-fashion inspired clean lines, pastel accents, and modern layering',
        color: '#1a0e2e',
        overlay: 'linear-gradient(135deg, #ec489933, #a78bfa33)',
    },
    minimalist: {
        description: 'Clean, refined silhouette with neutral palette and structured form',
        color: '#0e1a2e',
        overlay: 'linear-gradient(135deg, #0ea5e933, #06b6d433)',
    },
    bohemian: {
        description: 'Free-spirited bohemian style with flowing fabrics and artistic details',
        color: '#1a0e2e',
        overlay: 'linear-gradient(135deg, #8b5cf633, #a78bfa33)',
    },
    grunge: {
        description: 'Edgy grunge aesthetic with distressed textures and rebellious attitude',
        color: '#1a0e0e',
        overlay: 'linear-gradient(135deg, #ef444433, #b91c1c33)',
    },
    'pro-streetwear': {
        description: 'Complete fashion overhaul with bold patterns, luxury logos, and futuristic cyber-typography. A professional-grade transformation that keeps only the structure but redesigns the entire aesthetic.',
        color: '#2e1065',
        overlay: 'linear-gradient(135deg, #a855f733, #ec489933)',
    },
    'artisan-patchwork': {
        description: 'Tactile, mixed-media transformation featuring rich fabric textures (denim, leather, corduroy), photographic print patches, and custom embroidered logos for a unique, handcrafted aesthetic.',
        color: '#451a03',
        overlay: 'linear-gradient(135deg, #f59e0b33, #451a0333)',
    },
    'vanguard-redesign': {
        description: 'The ultimate "WOW" transformation. A masterpiece of art-craft, featuring bold side-seam graphics, hand-painted illustrative elements, photographic print overlays, and premium hardware accents for a fantastic, high-end designer look.',
        color: '#064e3b',
        overlay: 'linear-gradient(135deg, #10b98133, #3b82f633)',
    },
}

const DIY_GUIDES = {
    streetwear: [
        { step: 'Crop the length to hit at the waist or slightly below', icon: '✂️' },
        { step: 'Add iron-on graphic patches or screen-print a bold design', icon: '🎨' },
        { step: 'Cut the neckline into a wider, relaxed crew or V-neck', icon: '👕' },
        { step: 'Distress edges with sandpaper for a worn-in look', icon: '🪨' },
        { step: 'Add a bleach splatter effect for street cred', icon: '💫' },
    ],
    vintage: [
        { step: 'Tea-dye the fabric for an aged, warm tone', icon: '☕' },
        { step: 'Add lace trim or crochet details to hems and cuffs', icon: '🧶' },
        { step: 'Replace buttons with vintage-style brass or pearl buttons', icon: '🔘' },
        { step: 'Create a Peter Pan collar from contrasting fabric', icon: '✨' },
        { step: 'Hand-embroider small floral motifs along seams', icon: '🌸' },
    ],
    korean: [
        { step: 'Slim the fit through the torso for a clean silhouette', icon: '📐' },
        { step: 'Add pastel-colored ribbon or fabric trim details', icon: '🎀' },
        { step: 'Create an asymmetric hem cut for modern edge', icon: '✂️' },
        { step: 'Layer with a sheer organza overlay piece', icon: '🦋' },
        { step: 'Add minimalist metal hardware accents', icon: '⚡' },
    ],
    minimalist: [
        { step: 'Remove all unnecessary embellishments and logos', icon: '🧹' },
        { step: 'Re-dye in a solid neutral tone (black, white, beige)', icon: '🎨' },
        { step: 'Clean up all seams and create crisp, structured lines', icon: '📏' },
        { step: 'Replace closures with hidden snaps or invisible zippers', icon: '🔧' },
        { step: 'Iron and starch for a perfectly pressed finish', icon: '♨️' },
    ],
    bohemian: [
        { step: 'Add fringe detail to hems using matching yarn or suede', icon: '🧶' },
        { step: 'Tie-dye in earthy, warm tones (terracotta, sage, mustard)', icon: '🌈' },
        { step: 'Attach small mirrors or beaded embellishments', icon: '💎' },
        { step: 'Create a flowy extension with contrasting printed fabric', icon: '🦚' },
        { step: 'Add macramé or woven belt/strap detail', icon: '🪢' },
    ],
    grunge: [
        { step: 'Heavily distress with scissors, razor, and sandpaper', icon: '🗡️' },
        { step: 'Cut raw, unfinished hems — embrace the fraying', icon: '✂️' },
        { step: 'Add safety pins as decorative hardware throughout', icon: '📌' },
        { step: 'Apply bleach or acid wash for a corroded effect', icon: '🧪' },
        { step: 'Layer paint splatters in black and red', icon: '🎨' },
    ],
    'pro-streetwear': [
        { step: 'Deconstruct the garment along side seams and add mesh or tech-fabric inserts', icon: '🧵' },
        { step: 'Apply large-scale screen-printed graphics or high-density vinyl logos', icon: '🖼️' },
        { step: 'Replace standard drawstrings with thick neon rope or industrial webbing', icon: '⚓' },
        { step: 'Add functional metallic zippers and D-rings for a hardware-heavy look', icon: '⚙️' },
        { step: 'Use fabric markers or custom stencils for futuristic cyber-typography details', icon: '✒️' },
    ],
    'artisan-patchwork': [
        { step: 'Source diverse fabric scraps like denim, corduroy, or leather for tactile contrast', icon: '🧶' },
        { step: 'Print favorite photos onto fabric transfer paper and apply to patch areas', icon: '📸' },
        { step: 'Layer patches over plain areas using a raw zig-zag or whip stitch', icon: '🧵' },
        { step: 'Add custom embroidered logos or vintage military-style patches', icon: '🏷️' },
        { step: 'Finish with fabric paint splatters to blend the mixed-media elements', icon: '🎨' },
    ],
    'vanguard-redesign': [
        { step: 'Apply bold, vertical graphic logos along the side seams or inner leg', icon: '📐' },
        { step: 'Use fabric paints or high-quality stencils for hand-painted art-craft illustrations on the thighs/pockets', icon: '🎨' },
        { step: 'Attach photographic print patches onto back pockets or knee areas', icon: '🖼️' },
        { step: 'Incorporate premium hardware like metallic chains, D-rings, or oversized zippers', icon: '⛓️' },
        { step: 'Finish with glow-in-the-dark or neon thread embroidery for a "Fantastic" high-end finish', icon: '✨' },
    ],
}

export default function StyleStudio({ uploadedImage, detectedCategory, generatedDesigns, setGeneratedDesigns, diyGuide, setDiyGuide }) {
    const [selectedStyle, setSelectedStyle] = useState(null)
    const [selectedKoreanText, setSelectedKoreanText] = useState(null)
    const [customPrompt, setCustomPrompt] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [activeDesignIndex, setActiveDesignIndex] = useState(0)
    const [showBeforeAfter, setShowBeforeAfter] = useState(false)
    const [showDiy, setShowDiy] = useState(false)

    const handleGenerate = async () => {
        if (!uploadedImage || (!selectedStyle && !customPrompt.trim())) return

        setIsGenerating(true)
        setGeneratedDesigns([])
        setShowBeforeAfter(false)
        setShowDiy(false)

        try {
            const styleLabel = STYLE_PRESETS.find(s => s.id === selectedStyle)?.label || 'Custom'

            // Get selected Korean text design if any
            const selectedTextDesign = KOREAN_TEXT_DESIGNS.find(t => t.id === selectedKoreanText)

            // Build the final prompt
            let finalPrompt = customPrompt
            if (!finalPrompt.trim()) {
                if (selectedKoreanText && selectedTextDesign) {
                    finalPrompt = `Transform this clothing into ${styleLabel} style with ${selectedTextDesign.label} Korean text design (${selectedTextDesign.koreanLabel}), ${selectedTextDesign.description}`
                } else {
                    finalPrompt = `Transform this clothing into ${styleLabel} style`
                }
            } else if (selectedKoreanText && selectedTextDesign) {
                finalPrompt = `${customPrompt}, with ${selectedTextDesign.label} Korean typography text design (${selectedTextDesign.koreanLabel})`
            }

            console.log('Requesting Google Imagen Redesign...');
            console.log('Selected Text Design:', selectedTextDesign);

            const response = await fetch('http://localhost:5000/api/generate-style', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: uploadedImage,
                    prompt: finalPrompt,
                    style: styleLabel,
                    textDesign: selectedTextDesign ? {
                        id: selectedTextDesign.id,
                        label: selectedTextDesign.label,
                        koreanLabel: selectedTextDesign.koreanLabel,
                        textEffect: selectedTextDesign.textEffect,
                        fontStyle: selectedTextDesign.fontStyle,
                        color: selectedTextDesign.color
                    } : null
                })
            });

            const data = await response.json();

            if (!data.success) throw new Error(data.error || 'API Error');

            const style = selectedStyle || 'streetwear'

            // Use text design description if selected, otherwise use style description
            let info = SAMPLE_REDESIGNS[style] || SAMPLE_REDESIGNS['streetwear']
            if (selectedTextDesign) {
                info = {
                    description: selectedTextDesign.description,
                    color: selectedTextDesign.color,
                    overlay: `linear-gradient(135deg, ${selectedTextDesign.color}33, #7c3aed33)`
                }
            }

            const guide = DIY_GUIDES[style] || DIY_GUIDES['streetwear']

            // Map the API response images to our design structure
            const labels = ['A', 'B', 'C']
            const designs = data.designs.map((imgData, i) => ({
                id: i + 1,
                style: style,
                label: selectedTextDesign
                    ? `${styleLabel} + ${selectedTextDesign.label} ${labels[i]}`
                    : `${styleLabel} - Design ${labels[i]}`,
                description: info.description,
                overlay: info.overlay,
                variation: labels[i],
                apiImage: imgData,
                textDesign: selectedTextDesign || null
            }))

            setGeneratedDesigns(designs)
            setDiyGuide(guide)
            setActiveDesignIndex(0)
        } catch (error) {
            console.error('Style Studio Error:', error);
            alert('Failed to connect to Google Imagen API. Make sure the server is running on port 5000.');
        } finally {
            setIsGenerating(false)
        }
    }

    const promptSuggestions = [
        'Make this shirt streetwear style',
        'Convert these jeans into summer shorts',
        'Add Korean fashion style',
        'Turn this into vintage style',
        'Make it minimalist and clean',
        'Add bohemian vibes',
    ]

    if (!uploadedImage) return null

    return (
        <section className="section studio-section" id="studio">
            <div className="container">
                <motion.div
                    className="studio-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="badge badge-primary">🎨 Step 2</span>
                    <h2 className="section-title">
                        AI <span className="gradient-text">Style Studio</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Choose a style preset or write your own prompt to transform your clothing.
                    </p>
                </motion.div>

                {/* Style presets */}
                <motion.div
                    className="style-presets"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {STYLE_PRESETS.map((preset) => (
                        <button
                            key={preset.id}
                            className={`style-preset-btn ${selectedStyle === preset.id ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedStyle(preset.id)
                                setCustomPrompt('')
                            }}
                            style={{ '--preset-color': preset.color }}
                            id={`style-preset-${preset.id}`}
                        >
                            <preset.icon size={20} />
                            <span>{preset.label}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Korean Text Design Section */}
                <motion.div
                    className="korean-text-section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                >
                    <div className="korean-text-header">
                        <Type size={20} style={{ color: 'var(--accent)' }} />
                        <h3 className="korean-text-title">Korean <span className="gradient-text">Text Designs</span></h3>
                    </div>
                    <p className="korean-text-subtitle">
                        Add Korean typography styles to your clothing designs
                    </p>
                    <div className="korean-text-grid">
                        {KOREAN_TEXT_DESIGNS.map((textDesign) => (
                            <motion.button
                                key={textDesign.id}
                                className={`korean-text-card ${selectedKoreanText === textDesign.id ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedKoreanText(textDesign.id)
                                    setSelectedStyle('korean')
                                    setCustomPrompt(`Add ${textDesign.label} Korean text design`)
                                }}
                                style={{ '--text-color': textDesign.color }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="korean-text-icon">
                                    <textDesign.icon size={24} />
                                </div>
                                <div className="korean-text-info">
                                    <span className="korean-text-label">{textDesign.label}</span>
                                    <span className="korean-text-korean">{textDesign.koreanLabel}</span>
                                </div>
                                <div
                                    className={`korean-text-preview text-effect-${textDesign.textEffect}`}
                                    style={{ color: textDesign.color }}
                                >
                                    가나다
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Custom prompt */}
                <motion.div
                    className="custom-prompt-area"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="prompt-input-wrapper">
                        <Wand2 size={20} className="prompt-icon" />
                        <input
                            type="text"
                            className="input prompt-input"
                            placeholder="Or type your own style prompt... e.g. 'Make this into a summer crop top'"
                            value={customPrompt}
                            onChange={(e) => {
                                setCustomPrompt(e.target.value)
                                if (e.target.value) setSelectedStyle(null)
                            }}
                            id="style-prompt-input"
                        />
                    </div>
                    <div className="prompt-suggestions">
                        {promptSuggestions.map((suggestion, i) => (
                            <button
                                key={i}
                                className="suggestion-chip"
                                onClick={() => {
                                    setCustomPrompt(suggestion)
                                    setSelectedStyle(null)
                                }}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Generate button */}
                <motion.div
                    className="generate-btn-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <button
                        className="btn btn-primary btn-lg generate-btn"
                        onClick={handleGenerate}
                        disabled={isGenerating || (!selectedStyle && !customPrompt.trim())}
                        id="generate-btn"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 size={20} className="spin-icon" />
                                AI is Redesigning...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                Generate Redesigns
                            </>
                        )}
                    </button>
                </motion.div>

                {/* Generation progress */}
                <AnimatePresence>
                    {isGenerating && (
                        <motion.div
                            className="generation-progress"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="progress-bar-wrapper">
                                <div className="progress-bar">
                                    <div className="progress-bar-fill" />
                                </div>
                                <div className="progress-steps">
                                    <span className="progress-step active">Analyzing clothing</span>
                                    <span className="progress-step">Applying style</span>
                                    <span className="progress-step">Generating designs</span>
                                    <span className="progress-step">Creating DIY guide</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Generated Results */}
                <AnimatePresence>
                    {generatedDesigns.length > 0 && (
                        <motion.div
                            className="results-section"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Before / After toggle */}
                            <div className="results-toolbar">
                                <h3 className="results-title">
                                    <Sparkles size={20} style={{ color: 'var(--accent)' }} />
                                    Generated Redesigns
                                </h3>
                                <div className="results-actions">
                                    <button
                                        className={`btn btn-sm ${showBeforeAfter ? 'btn-primary' : 'btn-ghost'}`}
                                        onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                                        id="toggle-before-after"
                                    >
                                        <ArrowLeftRight size={16} />
                                        Before / After
                                    </button>
                                    <button
                                        className={`btn btn-sm ${showDiy ? 'btn-accent' : 'btn-ghost'}`}
                                        onClick={() => setShowDiy(!showDiy)}
                                        id="toggle-diy-guide"
                                    >
                                        <BookOpen size={16} />
                                        DIY Guide
                                    </button>
                                    <button
                                        className="btn btn-sm btn-ghost"
                                        onClick={handleGenerate}
                                        id="regenerate-btn"
                                    >
                                        <RefreshCw size={16} />
                                        Regenerate
                                    </button>
                                </div>
                            </div>

                            {/* Design cards */}
                            <div className="design-cards">
                                {showBeforeAfter && (
                                    <div className="before-card">
                                        <div className="design-card-image-wrapper">
                                            <img src={uploadedImage} alt="Original clothing" className="design-card-image" />
                                            <div className="design-card-label">Original</div>
                                        </div>
                                    </div>
                                )}
                                {generatedDesigns.map((design, i) => (
                                    <motion.div
                                        key={design.id}
                                        className={`design-card ${activeDesignIndex === i ? 'active' : ''}`}
                                        onClick={() => setActiveDesignIndex(i)}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                    >
                                        <div className="design-card-image-wrapper">
                                            <img src={design.apiImage || uploadedImage} alt={design.label} className="design-card-image" />
                                            {!design.apiImage && (
                                                <div
                                                    className="design-card-overlay"
                                                    style={{ background: design.overlay }}
                                                />
                                            )}
                                            <div className="design-card-variation">{design.variation}</div>
                                            <div className="design-card-label">{design.label}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Active design detail */}
                            {generatedDesigns[activeDesignIndex] && (
                                <motion.div
                                    className="active-design-detail"
                                    key={activeDesignIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="design-detail-header">
                                        <h4>{generatedDesigns[activeDesignIndex].label}</h4>
                                        <span className="badge badge-primary">
                                            <Sparkles size={12} />
                                            AI Generated
                                        </span>
                                    </div>
                                    <p className="design-detail-desc">
                                        {generatedDesigns[activeDesignIndex].description}
                                    </p>
                                </motion.div>
                            )}

                            {/* DIY Guide */}
                            <AnimatePresence>
                                {showDiy && diyGuide && (
                                    <motion.div
                                        className="diy-guide"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="diy-guide-header">
                                            <Scissors size={22} style={{ color: 'var(--accent)' }} />
                                            <h3>DIY Transformation Guide</h3>
                                        </div>
                                        <p className="diy-guide-subtitle">
                                            Follow these steps to recreate this design at home:
                                        </p>
                                        <div className="diy-steps">
                                            {diyGuide.map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="diy-step"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                                >
                                                    <div className="diy-step-number">{i + 1}</div>
                                                    <span className="diy-step-icon">{item.icon}</span>
                                                    <p className="diy-step-text">{item.step}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
