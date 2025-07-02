import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/header'
import Footer from './components/footer'
import Home from './Pages/Home/home'
//import Dungeons from './Pages/Minecraft_Dungeons/dungeons'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Home />
    <Footer />
  </StrictMode>,
)
