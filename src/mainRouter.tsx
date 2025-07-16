import ItemList from './Pages/Minecraft_Dungeons/pages/ItemList.tsx';
import ItemForm from './Pages/Minecraft_Dungeons/Admin/ItemForm.tsx';
import EducationPage from './Pages/Minecraft_Education/EducationPage.tsx';
import AdminPage from './Pages/Minecraft_Education/AminPage.tsx';
import ReportPage from './Pages/Minecraft_Dungeons/pages/ReportPage.tsx';
import MinecraftLegendsPage from './Pages/Minecraft_Legends/Legends.tsx';
import Home from './Pages/Home/home.tsx';
import JavaEditionPage from './Pages/Minecraft_Java/java.tsx';
import Dungeons from './Pages/Minecraft_Dungeons/dungeons.tsx'; // Se Dungeons for o layout admin, renomeie para DungeonsAdminLayout para clareza


import DungeonsPage from './Pages/Minecraft_Dungeons/pages/DungeonsPage.tsx';

import AdminDashboard from './Pages/Minecraft_Java/Admin/AdminDashboard.tsx';
import ManageProducts from './Pages/Minecraft_Java/Admin/Management/ManageProducts.tsx';
import ManageUsers from './Pages/Minecraft_Java/Admin/Management/ManageUsers.tsx';
import ViewReports from './Pages/Minecraft_Java/Admin/Management/ViewReports.tsx';

// IMPORTS ESPECÍFICOS PARA MINECRAFT LEGENDS ADMIN
import LegendsAdminDashboard from './Pages/Minecraft_Legends/admin/AdminDashBoard.tsx';
import LegendsItemForm from './Pages/Minecraft_Legends/Components/LegendsItemForm.tsx';


import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
   
  },

  //Java Edition
  {
    path: '/Java',
    element: <JavaEditionPage />
  },
  {
    path: '/Admin', // Rota principal para o Admin Geral da Java Edition
    element: <AdminDashboard />, // AdminDashboard deve ter um <Outlet />
    children: [
      {
        path: 'products',
        element: <ManageProducts />
      },
      {
        path: 'users',
        element: <ManageUsers />
      },
      {
        path: 'reports',
        element: <ViewReports />
      },
    ]
  },

  // Minecraft Legends
  {
    path: '/Legends',
    element: <MinecraftLegendsPage />
  },
  {
    // Rota para o painel de administração específico do Minecraft Legends
    path: '/admin/legends',
    element: <LegendsAdminDashboard />, // Este componente (AdminDashBoard.tsx) precisa renderizar um <Outlet />
    children: [
      {
      },
      {
      path: 'novo', // Rota para adicionar nova entidade: /admin/legends/novo
      element: <LegendsItemForm />,
      },
      {
      path: 'editar/:id', // Rota para editar entidade existente: /admin/legends/editar/:id
      element: <ReportPage />,
      },
      {
      }
    ]
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