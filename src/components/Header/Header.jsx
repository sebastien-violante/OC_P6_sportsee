import './Header.css'

export default function Header() {
    return (
        <header className="header">
            <div className="brand">
                <img className="brand-picture" src="Icon.png" alt="logo de Sportsee"></img>
                <img className="brand-name" src="brand-name.png" alt="Sportsee"></img>
            </div>
            <nav>
                <ul>
                    <li>Dashboard</li>
                    <li>Mon profil</li>
                    <li className="li-decon">Se déconnecter</li>
                </ul>
            </nav>
        </header>
    )
}