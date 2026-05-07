import { NavLink, useNavigate } from 'react-router-dom'
import './Header.css'
import { useCookies } from 'react-cookie'

export default function Header() {

    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(["token"])
    const handleLogout = () => {
         // Supprimer le token en session
        //sessionStorage.removeItem("token")
        removeCookie("token", {path: "/"})
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
                        <NavLink  to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink  to="/profil" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Mon profil</NavLink>
                    </li>
                    <li className="li-decon" onClick={handleLogout}>Se déconnecter</li>
                </ul>
            </nav>
        </header>
    )
}