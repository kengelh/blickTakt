# blickTakt

A visual metronome app inspired by the fact that the classic auditory metronome just did not work out for me. So, here is a visual metronome, that blinks (and tecs) if you need to press the key.

## Features

- **Visual Focus**: The tempo is conveyed through a clearly visible, flashing circle.
- **Time Signatures**: Selectable time signatures (e.g., 2/4, 3/4, 4/4, 6/8). The first beat of the measure is subtly highlighted (visually brighter, and an optional audio click has a higher pitch).
- **Customizable Appearance**:
  - **Colors**: Choose between red, blue, green, or yellow.
  - **Brightness**: Set the visual effect to dark, medium, or light.
- **Languages**: Supports official UN languages (English, Arabic, Chinese, French, Russian, Spanish - all LLM-translated) and German.
- **Audio Option**: Switchable acoustic metronome.
- **Offline & Installable**: blickTakt is a PWA (Progressive Web App) and can be installed directly onto your mobile device's home screen.

## Installation / Usage

blickTakt is built as a modern React (Vite) app.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will be accessible at `http://localhost:3000` by default.

3. **Build for production:**
   ```bash
   npm run build
   ```
   The output and static files will be located in the `/dist` folder, ready for deployment to any static web hosting provider (Vercel, Netlify, GitHub Pages, etc.).

## Technologies

- React 19
- TypeScript
- Tailwind CSS
- Vite
- Vite PWA Plugin
