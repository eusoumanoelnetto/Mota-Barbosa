<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

![Deploy Status](https://github.com/eusoumanoelnetto/Mota-Barbosa/actions/workflows/deploy.yml/badge.svg)
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1fBtO4anFHIJJWAsZ6N-lOlXJqblLTXZ0

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy (GitHub Pages)

Publicação automática via GitHub Actions em:
https://eusoumanoelnetto.github.io/Mota-Barbosa/

Para re-disparar o deploy: faça um novo commit na branch `main`.
