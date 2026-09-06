import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { installErrorCapture } from './utils/observability';

// Installed before render so errors thrown during hydration are caught too.
installErrorCapture();

const container = document.getElementById('root');

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Routes are prerendered to static HTML at build time (see scripts/prerender.js).
// When markup is already present we hydrate it instead of throwing it away, so
// the prerendered content stays on screen through hydration.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
