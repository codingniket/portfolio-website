# Portfolio Website

This is a Next.js 15 project featuring a Digital Twin AI assistant.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up AI Backend (Ollama)
This project uses **Ollama** for its AI capabilities instead of cloud APIs to keep it local and private.

- **Download Ollama**: Visit [ollama.com](https://ollama.com) and install it for your OS.
- **Pull the Model**: Run the following command in your terminal to download the required model:
  ```bash
  ollama run gemma4:31b-cloud
  ```
- **Keep Ollama Running**: Ensure the Ollama application is running in the background.

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
# Optional: Change if Ollama is running on a different machine or port
OLLAMA_ENDPOINT=http://localhost:11434
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## AI Configuration
The AI is configured as a "Digital Twin" of Niket Bachhawat. It uses a system prompt to ensure it answers questions based on verified profile data.

- **Model used**: `gemma4:31b-cloud`
- **Endpoint**: `http://localhost:11434/api/chat`

If you see the error `"connect to ollama for ai fun"`, it means the Ollama server is not running or the model is not pulled.
