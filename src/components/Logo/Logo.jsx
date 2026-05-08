import './Logo.css'

export default function Logo() {
    return (
        <div className='movingLogo'>
            <div className="blueBarGroup">
                <img src="blueBar1.svg" className="blueBar1" alt=""></img>
                <img src="blueBar2.svg" className="blueBar2" alt=""></img>
                <img src="blueBar3.svg" className="blueBar3" alt=""></img>
                <img src="blueBar4.svg" className="blueBar4" alt=""></img>
                <img src="blueBar5.svg" className="blueBar5" alt=""></img>
            </div>
            <div className="redBarGroup">
                <img src="redBar1.svg" className="redBar1" alt=""></img>
                <img src="redBar2.svg" className="redBar2" alt=""></img>
                <img src="redBar3.svg" className="redBar3" alt=""></img>
                <img src="redBar4.svg" className="redBar4" alt=""></img>
                <img src="redBar5.svg" className="redBar5" alt=""></img>
            </div>
        </div>
    )
}