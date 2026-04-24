import './custom.css'
import { useState } from 'react';
import validateForm from '../utils/validateForm';
export default function Home() {

    
    
    // STATES ////////////////////////////////////////////////////////////////////////////////////
    const [formData, setFormData] = useState({
        identifiant: "",
        password: "",
    })

    const [errors, setErrors] = useState({
        username: "",
        "password": ""
    })

    // HANDLERS ////////////////////////////////////////////////////////////////////////////////////

    const handleChange = (event)  => {
        const { name, value } = event.target 
        setFormData((prev) => ({...prev, [name]: value}))
    }
    const handleSubmit = () => {
        event.preventDefault()
        const errors = validateForm(formData)
        setErrors(errors)
    }
    return (
        <section className="wrapper">
            <img src="pictures/logo.png" alt="Logo du site Sportsee" className="logo"/>
            <section className='formWrapper'>
                <form className="form" method="POST">
                    <h1>Transformez<br />vos stats en résultats</h1>
                    <p className="subtitle">Se connecter</p>
                    <section className="formGroup">
                        <label htmlFor="username" className="label">Adresse email</label>
                        <input id="username" className="input" name="username" type="text" onBlur={handleChange}/>
                        <span>{errors.username}</span>
                    </section>
                    <section className="formGroup">
                        <label htmlFor="password" className="label">Mot de passe</label>
                        <input id="password" className="input" name="password" type="password" onBlur={handleChange}/>
                        <span>{errors.password}</span>
                    </section>
                    <input type="submit" className="btnSubmit" value="Se connecter" onClick={handleSubmit}/>
                </form>
            </section>
            <section className='homePicture'>
                <img src="pictures/homepage/homepage-background-picture.jpg" alt="image de coureurs"/>
                <section className="slogan">Analysez vos performances en un clin d'oeil,<br />suivez vos progrès et atteignez vos objectifs.
                </section>
            </section>
        </section>
    )
}