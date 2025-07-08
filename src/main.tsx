import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/header'
import Footer from './components/footer'
import Home from './Pages/Home/home'
import JavaEditionPage from './Pages/Minecraft_Java/java'
import Dungeons from './Pages/Minecraft_Dungeons/dungeons.tsx'
import Bedrock from './Pages/minecraft_bedrock/contanier.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ItemList from './Pages/Minecraft_Dungeons/pages/ItemList.tsx'
import ItemForm from './Pages/Minecraft_Dungeons/pages/ItemForm.tsx'
import ReportPage from './Pages/Minecraft_Dungeons/pages/ReportPage.tsx'
import MinecraftLegendsPage from './Pages/Minecraft_Legends/container.tsx' 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/Bedrock',
    element: <Bedrock />
  },
  {
    path: '/Java',
    element: <JavaEditionPage />
  },
  {
    path: '/Legends',
    element: <MinecraftLegendsPage />
  },
  {
    path: '/Dungeons',
    element: <Dungeons/>,
    children:[
      {
        path: '',
        element:<ItemList/>,
      },
      {
        path: 'Novo',
        element:<ItemForm />,
      },
      {
        path: 'editar/:id',
        element:<ItemForm />,
      },
      {
        path: 'relatorio',
        element:<ReportPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </StrictMode>,
)
