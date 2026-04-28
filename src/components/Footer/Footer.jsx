import './Footer.css'

export default function Footer() {
    return (
        <footer>
            <article>@Sportsee  Tous droits réservés</article>
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