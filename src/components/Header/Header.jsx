import { NavLink, useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {

    const navigate = useNavigate()

    const handleLogout = () => {
         // Supprimer le token en session
        sessionStorage.removeItem("token")
        navigate("/");

    }
    return (
        <header className="header">
            <div className="brand">
                <img className="brand-picture" src="Icon.png" alt="logo de Sportsee"></img>
                <img className="brand-name" src="brand-name.png" alt="Sportsee"></img>
            </div>
            <nav>
                <ul>
                    <li>
                        <button>
                            <NavLink  to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
                        </button>
                    </li>
                    <li>
                        <button>
                            <NavLink  to="/profil" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Mon profil</NavLink>
                        </button>
                    </li>
                    <li className="li-decon" >
                        <button onClick={handleLogout}>Se déconnecter</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}