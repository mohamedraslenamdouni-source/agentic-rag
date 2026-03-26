# Agentic-RAG Demo

This scaffold contains a Vite React frontend and a simple Express webhook backend.

Quick start:

1. Install frontend deps and webhook deps:

```bash
cd agentic-rag/frontend
npm install

# in another shell
cd ../webhook
npm install
```

2. Run frontend and webhook:

```bash
# start webhook
cd agentic-rag/webhook
npm run dev

# start frontend
cd agentic-rag/frontend
npm run dev
```

3. Open frontend at http://localhost:5173 (Vite default) and webhook at http://localhost:4000

Notes:
- Place your background images in `frontend/public/assets/` named `bg-login.jpg` and `bg-chat.jpg`.
- Ensure the webhook runs on port 4000 for the frontend to reach it.
