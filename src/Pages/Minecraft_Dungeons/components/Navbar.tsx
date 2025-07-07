import {Link} from 'react-router-dom';

export function Navbar(){
    return(
        <nav>
            <Link to="/"> Lista de Itens</Link>
            <Link to="/relatorio">Relatório</Link>
        </nav>
    )
}