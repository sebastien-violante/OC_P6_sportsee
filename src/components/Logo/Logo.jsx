import './Logo.css'

/**
 * Renvoie un composant logo animé
 * @returns {JSX.Element} - composant Logo
 */
export default function Logo() {
    // tableau de paramétrage des barres bleues
    const blueBars = [
        { src: "pictures/logo/blue1.svg", top: 11, left: 0, height: 8 },
        { src: "pictures/logo/blue2.svg", top: 8, left: 4, height: 13 },
        { src: "pictures/logo/blue3.svg", top: 10, left: 8, height: 7 },
        { src: "pictures/logo/blue4.svg", top: 11, left: 12, height: 9 },
        { src: "pictures/logo/blue5.svg", top: 11, left: 16, height: 6 },
    ];
    // tableau de paramétrage des barres rouges
    const redBars = [
        { src: "pictures/logo/red1.svg", top: 3, left: 0, height: 11, move: 7 },
        { src: "pictures/logo/red2.svg", top: 0, left: 4, height: 14, move: 9 },
        { src: "pictures/logo/red3.svg", top: 2, left: 8, height: 12, move: 4 },
        { src: "pictures/logo/red4.svg", top: 5, left: 12, height: 9, move: 7 },
        { src: "pictures/logo/red5.svg", top: 0, left: 16, height: 14, move: 4 },
    ];

    return (
        <figure className="logo-container" role="img" aria-label="logo Sportsee">
            <div className="blueGroup" aria-hidden="true">
                {blueBars.map((bar, index) => (
                    <img key={index} src={bar.src} className="bar blue" style={{"--top": `${bar.top}px`, "--left": `${bar.left}px`, "--height": `${bar.height}px`}} alt=""/>
                ))}
            </div>
            <div className="redGroup" aria-hidden="true">
                {redBars.map((bar, index) => (
                    <div key={index} className="move" style={{"--moveY": `${bar.move}px`}}>
                        <img src={bar.src} className="bar red shake" style={{"--top": `${bar.top}px`, "--left": `${bar.left}px`, "--height": `${bar.height}px`}} alt=""/>
                    </div>
                ))}
            </div>
        </figure>
    );
}