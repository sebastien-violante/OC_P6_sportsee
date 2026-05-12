import './Footer.css'
import { useContext } from 'react'
import { DataContext } from '../../providers/ContextData'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'

export default function Footer() {

    const {useMock, toggleUseMock} = useContext(DataContext)
    return (
        <footer>
            <article>@Sportsee  Tous droits réservés</article>
            <button className={useMock ? "mock" : "api"} onClick={toggleUseMock}>{useMock ? "Mock" : "Api"}</button>
            <section className="bottom-links">
                <ul>
                    <li><NavLink  to="/">Conditions générales</NavLink></li>
                    <li><NavLink to="/">Contact</NavLink></li>
                </ul>
                <Logo />
            </section>
        </footer>
    )
}