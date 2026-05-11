import { NavLink, useNavigate } from 'react-router-dom'
import './Header.css'
import { useCookies } from 'react-cookie'
import Logo from '../Logo/Logo'

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
            <div className="logo">
                <Logo />
                <img src="brand.svg" alt="Nom de la marque" className="brand"/>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink  to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink  to="/profil" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Mon profil</NavLink>
                    </li>
                    <li>
                        <button className="li-decon" onClick={handleLogout}>Se déconnecter</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}