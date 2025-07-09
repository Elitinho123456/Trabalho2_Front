import ItemList from './Pages/Minecraft_Dungeons/pages/ItemList.tsx'
import ItemForm from './Pages/Minecraft_Dungeons/pages/ItemForm.tsx'
import ReportPage from './Pages/Minecraft_Dungeons/pages/ReportPage.tsx'
import MinecraftLegendsPage from './Pages/Minecraft_Legends/container.tsx'
import Home from './Pages/Home/home'
import JavaEditionPage from './Pages/Minecraft_Java/java'
import Dungeons from './Pages/Minecraft_Dungeons/dungeons.tsx'
import Bedrock from './Pages/minecraft_bedrock/contanier.tsx'
import Legends from 'Pages/minecraft_Legends/container.tsx'

import { createBrowserRouter } from 'react-router-dom'


export const router = createBrowserRouter([
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
    element: <Dungeons />,
    children: [
      {
        path: '',
        element: <ItemList />,
      },
      {
        path: 'Novo',
        element: <ItemForm />,
      },
      {
        path: 'editar/:id',
        element: <ItemForm />,
      },
      {
        path: 'relatorio',
        element: <ReportPage />
      }
    ]
  }
]);