# ♻️ ReWear AI

**ReWear AI** is a cutting-edge, full-stack web application designed to revolutionize sustainable fashion. By leveraging Google's advanced Generative AI (Gemini & Imagen), the platform allows users to transform their old, plain clothing into high-end, designer fashion pieces.

## ✨ Features

- 📸 **AI Clothing Detection**: Upload your garment and let our AI categorize it instantly.
- 🎨 **Style Studio**: Transform your clothes using curated presets:
    - **Pro Redesign**: Complete fashion overhaul with bold patterns and luxury logos.
    - **Artisan Patchwork**: Tactile mixed-media with fabric textures and photo patches.
    - **Vanguard (Wow!)**: High-impact "Art-Craft" transformations (perfect for pants!).
    - **Cyber Seoul**: Neon-infused Korean streetwear with custom typography.
    - *Other styles*: Streetwear, Vintage, Bohemian, Minimalist, and Grunge.
- 💬 **AI Fashion Assistant**: A Gemini-powered chatbot to give you real-time upcycling tips and DIY advice.
- 📊 **Sustainability Impact**: Track how much water and CO2 you save by upcycling instead of buying new.
- 🧵 **DIY Guides**: Every AI redesign comes with a step-by-step physical transformation guide.

## 🚀 Tech Stack

### Frontend
- **React (v19)**: Modern UI component architecture.
- **Vite**: Ultra-fast build tool and dev server.
- **Framer Motion**: Premium micro-animations and transitions.
- **Lucide React**: Clean, consistent iconography.
- **Vanilla CSS**: Custom-designed design system with Glassmorphism.

### Backend
- **Node.js & Express**: High-performance API server.
- **Google Generative AI SDK**:
    - **Imagen 3**: For professional-grade image-to-image redesigns.
    - **Gemini 1.5 Flash**: For the conversational fashion assistant.
- **Axios & Dotenv**: For API requests and environment management.

## 🛠️ Installation & Setup

### 1. Prerequisites
- Node.js (v18 or higher)
- NPM or Yarn
- A Google Gemini API Key

### 2. Clone and Install
```bash
# Install frontend dependencies
cd rewear-ai
npm install

# Install backend dependencies
cd server
npm install
```

### 3. Backend Configuration
Create a `.env` file in the `server` directory:
```env
GOOGLE_API_KEY=your_gemini_api_key_here
PORT=5000
```

### 4. Running the Project
You need to run both the frontend and backend simultaneously:

**Run Backend:**
```bash
cd server
npm run dev
```

**Run Frontend:**
```bash
cd rewear-ai
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🌍 Vision
ReWear AI aims to reduce textile waste by proving that "old" isn't "ugly." We empower users to become designers, making sustainability the most stylish choice.

Made with ❤️ and AI for a Greener Future.
