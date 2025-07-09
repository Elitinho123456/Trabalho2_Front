import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/header'
import Footer from './components/footer'
import { RouterProvider } from 'react-router-dom'
import { router } from './mainRouter'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </StrictMode>,
)
