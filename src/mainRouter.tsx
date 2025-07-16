import ItemList from './Pages/Minecraft_Dungeons/pages/ItemList.tsx';
import ItemForm from './Pages/Minecraft_Dungeons/Admin/ItemForm.tsx';
import EducationPage from './Pages/Minecraft_Education/EducationPage.tsx';
import AdminPage from './Pages/Minecraft_Education/AminPage.tsx';
import ReportPage from './Pages/Minecraft_Dungeons/pages/ReportPage.tsx';
import Home from './Pages/Home/home.tsx';
import JavaEditionPage from './Pages/Minecraft_Java/java.tsx';
import Dungeons from './Pages/Minecraft_Dungeons/dungeons.tsx'; 

import DungeonsPage from './Pages/Minecraft_Dungeons/pages/DungeonsPage.tsx';

import AdminDashboard from './Pages/Minecraft_Java/Admin/AdminDashboard.tsx';
import ManageProducts from './Pages/Minecraft_Java/Admin/Management/ManageProducts.tsx';
import ManageUsers from './Pages/Minecraft_Java/Admin/Management/ManageUsers.tsx';
import ViewReports from './Pages/Minecraft_Java/Admin/Management/ViewReports.tsx';
import Legends from './Pages/Minecraft_Legends/Legends.tsx';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },

  //Java Edition
  {
    path: '/Java',
    element: <JavaEditionPage />
  },
  {
    path: '/Admin', // Rota principal para o Admin Geral da Java Edition
    element: <AdminDashboard />, // AdminDashboard deve ter um <Outlet />
  },
  {
    path: 'Admin/users',
    element: <ManageUsers />
  },
  {
    path: 'Admin/products',
    element: <ManageProducts />
  },
  {
    path: 'Admin/reports',
    element: <ViewReports />
  },

  // Minecraft Legends
  {
    path: '/Legends',
    element: <Legends />
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
    // Dungeons como layout para suas rotas de administração
    path: '/admin/dungeons',
    element: <Dungeons />, // O componente Dungeons deve ter um <Outlet />
    children: [
      {
        path: '', // Rota padrão para /admin/dungeons (ItemList)
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