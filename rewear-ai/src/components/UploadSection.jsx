import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, ImagePlus, X, Shirt, Sparkles, CheckCircle2, Loader2 } from 'lucide-react'
import './UploadSection.css'

const CLOTHING_CATEGORIES = [
    { name: 'T-Shirt', icon: '👕', keywords: ['shirt', 'tee', 'top'] },
    { name: 'Jeans', icon: '👖', keywords: ['jean', 'pants', 'trouser', 'denim'] },
    { name: 'Jacket', icon: '🧥', keywords: ['jacket', 'coat', 'blazer', 'hoodie'] },
    { name: 'Dress', icon: '👗', keywords: ['dress', 'gown', 'frock'] },
    { name: 'Skirt', icon: '🩱', keywords: ['skirt', 'mini', 'maxi'] },
    { name: 'Sweater', icon: '🧶', keywords: ['sweater', 'pullover', 'cardigan', 'knit'] },
    { name: 'Shorts', icon: '🩳', keywords: ['shorts', 'bermuda'] },
    { name: 'Accessory', icon: '🎒', keywords: ['bag', 'hat', 'scarf', 'belt', 'accessory'] },
]

function simulateDetection() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const idx = Math.floor(Math.random() * 4) // first 4 categories
            resolve(CLOTHING_CATEGORIES[idx])
        }, 2000)
    })
}

export default function UploadSection({ uploadedImage, setUploadedImage, detectedCategory, setDetectedCategory }) {
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = async () => {
            setUploadedImage(reader.result)
            setIsAnalyzing(true)
            setDetectedCategory(null)

            const detected = await simulateDetection()
            setDetectedCategory(detected)
            setIsAnalyzing(false)
        }
        reader.readAsDataURL(file)
    }, [setUploadedImage, setDetectedCategory])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024,
    })

    const clearImage = () => {
        setUploadedImage(null)
        setDetectedCategory(null)
    }

    const selectCategory = (cat) => {
        setDetectedCategory(cat)
    }

    return (
        <section className="section upload-section" id="upload">
            <div className="container">
                <motion.div
                    className="upload-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="badge badge-accent">📸 Step 1</span>
                    <h2 className="section-title">
                        Upload Your <span className="gradient-text">Clothing</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Drop a photo of the clothing item you want to transform.
                        Our AI will detect the type and prepare it for redesign.
                    </p>
                </motion.div>

                <motion.div
                    className="upload-area-wrapper"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <AnimatePresence mode="wait">
                        {!uploadedImage ? (
                            <motion.div
                                key="dropzone"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <div
                                    {...getRootProps()}
                                    className={`upload-dropzone ${isDragActive ? 'drag-active' : ''}`}
                                    id="upload-dropzone"
                                >
                                    <input {...getInputProps()} id="upload-input" />
                                    <div className="upload-dropzone-content">
                                        <div className="upload-icon-container">
                                            <ImagePlus size={40} />
                                        </div>
                                        <h3 className="upload-dropzone-title">
                                            {isDragActive ? 'Drop your image here!' : 'Drag & drop your clothing photo'}
                                        </h3>
                                        <p className="upload-dropzone-subtitle">
                                            or click to browse · JPEG, PNG, WebP · Max 10MB
                                        </p>
                                        <button className="btn btn-primary" style={{ marginTop: '16px' }}>
                                            <Upload size={18} />
                                            Choose File
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="preview"
                                className="upload-preview-container"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <div className="upload-preview-card">
                                    <div className="upload-preview-image-wrapper">
                                        <img src={uploadedImage} alt="Uploaded clothing" className="upload-preview-image" />
                                        <button className="upload-remove-btn" onClick={clearImage} id="remove-image-btn">
                                            <X size={18} />
                                        </button>
                                        {isAnalyzing && (
                                            <div className="upload-analyzing-overlay">
                                                <Loader2 size={32} className="analyzing-spinner" />
                                                <span>AI is analyzing your clothing...</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="upload-details">
                                        {isAnalyzing ? (
                                            <div className="upload-analyzing-status">
                                                <div className="analyzing-pulse" />
                                                <span>Detecting clothing type...</span>
                                            </div>
                                        ) : detectedCategory ? (
                                            <div className="upload-detected">
                                                <div className="detected-result">
                                                    <CheckCircle2 size={20} style={{ color: 'var(--accent)' }} />
                                                    <span>AI Detected:</span>
                                                    <span className="detected-category">
                                                        {detectedCategory.icon} {detectedCategory.name}
                                                    </span>
                                                </div>
                                                <p className="detected-hint">
                                                    Not right? Select the correct category below:
                                                </p>
                                                <div className="category-chips">
                                                    {CLOTHING_CATEGORIES.map((cat) => (
                                                        <button
                                                            key={cat.name}
                                                            className={`category-chip ${detectedCategory.name === cat.name ? 'active' : ''}`}
                                                            onClick={() => selectCategory(cat)}
                                                        >
                                                            {cat.icon} {cat.name}
                                                        </button>
                                                    ))}
                                                </div>
                                                <button
                                                    className="btn btn-accent"
                                                    style={{ marginTop: '20px', width: '100%' }}
                                                    onClick={() => document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' })}
                                                    id="proceed-to-studio-btn"
                                                >
                                                    <Sparkles size={18} />
                                                    Proceed to Style Studio
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
