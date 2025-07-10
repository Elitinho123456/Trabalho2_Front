import {Link} from 'react-router-dom';
import '../styles/NavBar.css'
export function Navbar(){
    return(
        <nav className="dungeons-nav">
            <Link to="/dungeons"> Lista de Itens</Link>
            <Link to="/admin/dungeons/relatorio">Relatório</Link>
        </nav>
    )
}