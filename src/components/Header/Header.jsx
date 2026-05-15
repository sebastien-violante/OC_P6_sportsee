import { NavLink, useNavigate } from 'react-router-dom'
import './Header.css'
import { useCookies } from 'react-cookie'
import Logo from '../Logo/Logo'
import { DataContext } from '../../providers/ContextData'
import { useContext } from 'react';

export default function Header() {
    const { setUser } = useContext(DataContext)
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(["token"])
    const handleLogout = () => {
        removeCookie("token", {path: "/"})
        setUser(null)
        navigate("/")
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
                        <NavLink  to="/coach-virtuel" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Coach IA</NavLink>
                    </li>
                    <li>
                        <button className="li-decon" onClick={handleLogout}>Se déconnecter</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}