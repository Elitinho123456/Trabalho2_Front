import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './components/header'
import Footer from './components/footer'
import Home from './Pages/Home/home'
import JavaEditionPage from './Pages/Minecraft_Java/java'
import Dungeons from './Pages/Minecraft_Dungeons/dungeons.tsx'
//import bedrock from '.pages/minecraft_bedrock/bedrock'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ItemList from './Pages/Minecraft_Dungeons/pages/ItemList.tsx'
import ItemForm from './Pages/Minecraft_Dungeons/pages/ItemForm.tsx'
import ReportPage from './Pages/Minecraft_Dungeons/pages/ReportPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/Java',
    element: <JavaEditionPage />
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
