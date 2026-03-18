import Style from "./Navbar.module.css";

export default function Navbar() {
    return( 
    <nav className={Style.navStyle}>
        <div className={Style.navDiv}>
            <div className={Style.ulDiv}>
                <ul className={Style.ulStyle}>
                    <li>
                        <a href="/" className={Style.liStyle}>Início</a>
                    </li>
                    <li>
                        <a href="/criar" className={Style.liStyle}>Criar</a>
                    </li>
                    <li>
                        <a href="/buscarPorAutor" className={Style.liStyle}>Buscar por Autor</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );
}