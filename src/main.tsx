import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/header'
import Footer from './components/footer'
import Home from './Pages/Home/home'
import Java from './Pages/Minecraft_Java/java'
import Dungeons from './Pages/Minecraft_Dungeons/dungeons'
import bedrock from '.pages/minecraft_bedrock/bedrock'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/Java',
    element: <Java />
  },
  {
    path: '/Dungeons',
    element: <Dungeons/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </StrictMode>,
)
