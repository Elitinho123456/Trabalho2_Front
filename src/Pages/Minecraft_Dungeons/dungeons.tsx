import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar'


export default function Dungeons() {
  return (
    <div>
      {/* Você pode colocar um título ou banner específico do Dungeons aqui */}
      <h1> Área Administrativa - Minecraft Dungeons</h1>
      {/* O menu de navegação da sua seção */}
      <Navbar />
      <hr />
      {/* O <Outlet> é o espaço onde as suas sub-páginas serão renderizadas */}
      <main>
        <Outlet />
      </main>
    </div >
  )
}