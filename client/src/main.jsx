import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContext from './context/AppContext.jsx';           // for the context
import AppContextProvider from './context/AppContextProvider';  // for the provider
import { ClerkProvider } from '@clerk/clerk-react'
import './i18n';
import axios from 'axios'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
axios.defaults.baseURL =
  (import.meta.env.VITE_BACKEND_URL || '').replace(/\/+$/, '') ||
  (import.meta.env.DEV ? 'http://localhost:5000' : '');
  
createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </ClerkProvider>

)
