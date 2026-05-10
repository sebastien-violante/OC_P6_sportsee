import './Logo.css'

export default function Logo() {
    const blueBars = [
        { src: "blue1.svg", top: 11, left: 0, height: 8 },
        { src: "blue2.svg", top: 8, left: 4, height: 13 },
        { src: "blue3.svg", top: 10, left: 8, height: 7 },
        { src: "blue4.svg", top: 11, left: 12, height: 9 },
        { src: "blue5.svg", top: 11, left: 16, height: 6 },
    ];

    const redBars = [
        { src: "red1.svg", top: 3, left: 0, height: 11, move: 7 },
        { src: "red2.svg", top: 0, left: 4, height: 14, move: 9 },
        { src: "red3.svg", top: 2, left: 8, height: 12, move: 4 },
        { src: "red4.svg", top: 5, left: 12, height: 9, move: 7 },
        { src: "red5.svg", top: 0, left: 16, height: 14, move: 4 },
    ];

    return (
        <div className="logo-container">
            <div className="blueGroup">
                {blueBars.map((bar, index) => (
                    <img key={index} src={bar.src} className="bar blue" style={{"--top": `${bar.top}px`, "--left": `${bar.left}px`, "--height": `${bar.height}px`}} alt=""/>
                ))}
            </div>
            <div className="redGroup">
                {redBars.map((bar, index) => (
                    <div key={index} className="move" style={{"--moveY": `${bar.move}px`}}>
                        <img src={bar.src} className="bar red shake" style={{"--top": `${bar.top}px`, "--left": `${bar.left}px`, "--height": `${bar.height}px`}} alt=""/>
                    </div>
                ))}
            </div>
        </div>
    );
}