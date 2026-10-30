import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DayProvider } from './context/DayContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DayProvider>
      <App />
    </DayProvider>
  </StrictMode>,
)
