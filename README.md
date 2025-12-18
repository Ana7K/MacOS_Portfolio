## macOS Portfolio

**macOS-style developer portfolio built with React, TypeScript and Vite.**

This project mimics a macOS desktop: a dock, draggable windows (Finder, Terminal, Safari, Photos, Resume, Text, Contact, etc.), and various apps that showcase my projects, experience and contact information.

---

### Features

- **macOS-inspired UI**: Dock, top bar, window controls, wallpaper-style background.
- **Multiple “apps”**: Finder/projects, Photos, Resume (PDF viewer), Terminal, Text, Contact and more.
- **Smooth animations**: Powered by **GSAP** and `@gsap/react`.
- **State management**: Window positions, visibility and navigation handled via **Zustand** stores.
- **Responsive layout**: Works on modern desktop browsers, with basic support for smaller screens.

---

### Tech Stack

- **Frontend**: React 19, TypeScript
- **Bundler/Dev server**: Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP, @gsap/react
- **State Management**: Zustand, Immer
- **Icons & UI**: lucide-react + custom SVG icons
- **PDF rendering**: react-pdf

---

### Getting Started

#### Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **npm**: v9+ (comes with Node)

#### Installation

```bash
npm install
```

#### Running in Development

```bash
npm run dev
```

Then open the printed local URL in your browser (usually `http://localhost:5173`).

---

### Building for Production

```bash
npm run build
```

This outputs a production build to the `dist` folder.

#### Preview the Production Build

```bash
npm run preview
```

---

### Scripts Overview

- **`npm run dev`**: Start Vite dev server with HMR.
- **`npm run build`**: Type-check via `tsc -b` and build with Vite.
- **`npm run preview`**: Preview the production build locally.
- **`npm run lint`**: Run ESLint over the project.

---

### Project Structure

- **`src/App.tsx`**: Root macOS desktop layout and window orchestration.
- **`src/components`**: Dock, navbar, welcome screen, window controls, shared UI.
- **`src/windows`**: Individual “apps” (Finder, Terminal, Photos, Resume, Safari, Contact, etc.).
- **`src/store`**: Zustand stores for location/navigation and window state.
- **`src/constants`**: Data for projects, links and other content rendered in the UI.
- **`src/hoc`**: Higher-order components such as the window wrapper.
- **`public`**: Static assets such as icons, wallpapers and `resume.pdf`.
- **Root config**: `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `index.html`.

#### Folder Tree (simplified)

```text
macos-portfolio/
├─ public/
│  ├─ files/
│  ├─ icons/
│  └─ images/
├─ src/
│  ├─ components/
│  ├─ constants/
│  ├─ hoc/
│  ├─ store/
│  ├─ windows/
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ package.json
├─ vite.config.ts
└─ tsconfig*.json
```

---

### Customization

- **Change resume**: Replace `public/files/resume.pdf` with your own file (keep the same name or adjust the Resume window component).
- **Update projects & content**: Edit entries in `src/constants` and the relevant window components under `src/windows`.
- **Branding & theme**: Swap wallpapers and icons in `public/images` and `public/icons`, and adjust global styles in `src/index.css`.

---

### Contributing

I’m happy for you to explore or extend this project:

- **Fork** the repository.
- **Create a feature branch** for your idea or fix.
- **Run** `npm run lint` and `npm run build` to make sure everything passes.
- **Open a pull request** describing what you changed and why.

---

### License

This project is for personal portfolio use. You can adapt it for your own portfolio; please keep 
or add appropriate attribution if you share it publicly.
