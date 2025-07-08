import {Link} from 'react-router-dom';

export function Navbar(){
    return(
        <nav>
            <Link to="/dungeons"> Lista de Itens</Link>
            <Link to="/dungeons/relatorio">Relatório</Link>
        </nav>
    )
}