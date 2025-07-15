import ItemList from './Pages/Minecraft_Dungeons/pages/ItemList.tsx'
import ItemForm from './Pages/Minecraft_Dungeons/Admin/ItemForm.tsx'
import EducationPage from './Pages/Minecraft_Education/EducationPage.tsx'
import AdminPage from './Pages/Minecraft_Education/AminPage.tsx'
import ReportPage from './Pages/Minecraft_Dungeons/pages/ReportPage.tsx'
import MinecraftLegendsPage from './Pages/Minecraft_Legends/Legends.tsx'
import Home from './Pages/Home/home.tsx'
import JavaEditionPage from './Pages/Minecraft_Java/java.tsx'
import Dungeons from './Pages/Minecraft_Dungeons/dungeons.tsx'
import Bedrock from './Pages/minecraft_bedrock/contanier.tsx'
import DungeonsPage from './Pages/Minecraft_Dungeons/pages/DungeonsPage.tsx'
//import Legends from 'Pages/minecraft_Legends/container.tsx'
import AdminDashboard from './Pages/Minecraft_Java/Admin/AdminDashboard.tsx'
import ManageProducts from './Pages/Minecraft_Java/Admin/Management/ManageProducts.tsx'
import ManageUsers from './Pages/Minecraft_Java/Admin/Management/ManageUsers.tsx'
import ViewReports from './Pages/Minecraft_Java/Admin/Management/ViewReports.tsx'

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

  //Java Edition
  {
    path: '/Java',
    element: <JavaEditionPage />
  },
  {
    path: '/Admin',
    element: <AdminDashboard />,
  },
  {
    path: '/Admin/products',
    element: <ManageProducts />
  },
  {
    path: '/Admin/users',
    element: <ManageUsers />
  },
  {
    path: '/Admin/reports',
    element: <ViewReports />
  },
  {
  },


  {
    path: '/Legends',
    element: <MinecraftLegendsPage />
  },
  //Education
  {
    path: '/Education',
    element: <EducationPage />
  },
  {
    path: '/admin/education',
    element: <AdminPage />
  },
  //dungeons
  {
    path: '/Dungeons',
    element: <DungeonsPage />,
  },
  {
    path: '/admin/dungeons',
    element: <Dungeons />,
    children: [
      {
        path: '',
        element: <ItemList />,
      },
      {
        path: 'novo',
        element: <ItemForm />,
      },
      {
        path: 'editar/:id',
        element: <ItemForm />,
      },
      {
        path: 'relatorio',
        element: <ReportPage />,
      }
    ]
  }
]);