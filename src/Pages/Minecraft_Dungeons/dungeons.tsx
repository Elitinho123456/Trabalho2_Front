import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import './styles/dungeons.css'; 


export default function Dungeons() {
  return (
    <div className="dungeons-container"> 
      <header>
        <h1>Área Administrativa - Minecraft Dungeons</h1>
      </header>
      <Navbar />
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  );
}