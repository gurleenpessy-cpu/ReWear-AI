import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import UploadSection from './components/UploadSection'
import StyleStudio from './components/StyleStudio'
import SustainabilityScore from './components/SustainabilityScore'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import './App.css'

function App() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [detectedCategory, setDetectedCategory] = useState(null)
  const [generatedDesigns, setGeneratedDesigns] = useState([])
  const [diyGuide, setDiyGuide] = useState(null)
  const [showChatbot, setShowChatbot] = useState(false)

  return (
    <div className="app">
      <ParticleBackground />
      <Navbar onChatToggle={() => setShowChatbot(!showChatbot)} />
      <main>
        <Hero />
        <Features />
        <UploadSection
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          detectedCategory={detectedCategory}
          setDetectedCategory={setDetectedCategory}
        />
        <StyleStudio
          uploadedImage={uploadedImage}
          detectedCategory={detectedCategory}
          generatedDesigns={generatedDesigns}
          setGeneratedDesigns={setGeneratedDesigns}
          diyGuide={diyGuide}
          setDiyGuide={setDiyGuide}
        />
        <SustainabilityScore
          uploadedImage={uploadedImage}
          detectedCategory={detectedCategory}
        />
      </main>
      <Footer />
      <Chatbot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
    </div>
  )
}

export default App
