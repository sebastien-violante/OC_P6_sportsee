import './Footer.css'
import { useContext } from 'react'
import { DataContext } from '../../providers/ContextData'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'

/**
 * Renvoie le footer de l'application
 * @returns {JSX.Element} - composant Footer
 */
export default function Footer() {

    const {useMock, toggleUseMock} = useContext(DataContext)

    return (
        <footer>
            <article>@Sportsee  Tous droits réservés</article>
            <button className={useMock ? "mock" : "api"} onClick={toggleUseMock}>{useMock ? "Mock" : "Api"}</button>
            <section className="bottom-links">
                <ul>
                    <li><NavLink  to="/dashboard">Conditions générales</NavLink></li>
                    <li><NavLink to="/dashboard">Contact</NavLink></li>
                </ul>
                <Logo />
            </section>
        </footer>
    )
}