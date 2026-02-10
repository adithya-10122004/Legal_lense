


⚖️ Legal Lense
Your Intelligent Window into Indian Law.
Legal Lense is a RAG-powered (Retrieval-Augmented Generation) legal assistant designed to analyze user scenarios, retrieve relevant sections from the Indian Penal Code (IPC), and generate grounded legal insights using Google Gemini 3.
Designed with a high-end "Legal Workspace" aesthetic, it bridges the gap between complex legal statutes and actionable advice.


✨ Key Features

🤖 AI-Powered Legal Analysis: Uses gemini-3-flash-preview to analyze natural language scenarios and map them to specific IPC sections.

📚 RAG Architecture (Simulated): Retrieves relevant legal context ("Evidence Board") from a local IPC dataset before generating an answer, ensuring responses are grounded in actual law.

🗄️ Case Management: A dedicated sidebar to manage different legal case sessions and history.

📖 IPC Library: A searchable digital archive of Indian Penal Code sections with filtering capabilities.



🎨 Professional UI/UX:
Custom "Gold & Charcoal" legal color theme.
Typography optimized for readability (Fraunces & Urbanist fonts).
"Verdict Box" styling for clear penalty visualization.


🔐 Auth Simulation: A polished login/signup screen for user onboarding.



🛠️ Tech Stack
Frontend: React 18 (TypeScript), Vite
Styling: Tailwind CSS (Custom Configuration)
AI Model: Google GenAI SDK (@google/genai)
Icons: Lucide React
Markdown: React Markdown (for rendering legal text)


🚀 Getting Started


Prerequisites
Node.js (v18 or higher)
npm or yarn



A Google Gemini API Key (Get one at aistudio.google.com)


Installation


Clone the repository:
code
Bash
git clone https://github.com/yourusername/legal-lense.git
cd legal-lense
Install dependencies:
code
Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and add your API key:
code
Env
API_KEY=your_google_gemini_api_key_here
Run the development server:
code
Bash
npm run dev
Open the app:
Visit http://localhost:5173 in your browser.



🧠 How It Works (RAG Flow)
User Input: The user describes a scenario (e.g., "My neighbor built a wall on my land...").
Retrieval: The system scans the MOCK_IPC_DATABASE (in services/legalData.ts) using a weighted keyword algorithm to find the top 3 most relevant legal sections.
Augmentation: These sections are displayed on the right-hand Evidence Board and injected into the System Prompt.
Generation: Google Gemini generates a structured response citing specific sections (e.g., IPC Section 441) and formatted penalties based only on the provided context.

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
