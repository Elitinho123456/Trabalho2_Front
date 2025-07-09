import {Link} from 'react-router-dom';
import '../styles/NavBar.css'
export function Navbar(){
    return(
        <nav className="dungeons-nav">
            <Link to="/dungeons"> Lista de Itens(Admin)</Link>
            <Link to="/dungeons/relatorio">Relatório</Link>
        </nav>
    )
}