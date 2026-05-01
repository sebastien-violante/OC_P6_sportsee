import './Footer.css'
import { useContext } from 'react'
import { DataContext } from '../../providers/ContextData'


export default function Footer() {

    const {useMock, toggleUseMock} = useContext(DataContext)
    return (
        <footer>
            <article>@Sportsee  Tous droits réservés</article>
            <button className={useMock ? "mock" : "api"} onClick={toggleUseMock}>{useMock ? "Mock" : "Api"}</button>
            <section className="bottom-links">
                <ul>
                    <li>Conditions générales</li>
                    <li>Contact</li>
                </ul>
                <img alt="logo" src="Icon.png" className="bottom-logo"></img>
            </section>
        </footer>
    )
}