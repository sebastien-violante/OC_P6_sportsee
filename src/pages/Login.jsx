import './custom.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validateForm from '../utils/validateForm';
import login from '../utils/login';

export default function Home() {
    
    // CONSTANTES ////////////////////////////////////////////////////////////////////////////////////
    const navigate = useNavigate()
    
    // STATES ////////////////////////////////////////////////////////////////////////////////////
    const [formData, setFormData] = useState({
        identifiant: "",
        password: "",
    })

    const [errors, setErrors] = useState({
        username: "",
        password: ""
    })

    // FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////
    
    // HANDLERS ////////////////////////////////////////////////////////////////////////////////////
    const handleChange = (event)  => {
        const { name, value } = event.target 
        setFormData((prev) => ({...prev, [name]: value}))
    }
    
    async function handleSubmit() {
        event.preventDefault()
        const errors = validateForm(formData)
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            const token = await login(formData)
            if(token) {
                sessionStorage.setItem("token", token)
                navigate('/dashboard')
            }
        }
    }
    const hideError = (event) => {
        const name = event.target.name;
        setErrors(prev => ({
            ...prev,
            [name]: null
        }));
    }

    return (
        <section className="wrapper">
            <img src="logo.png" alt="Logo du site Sportsee" className="logo"/>
            <section className='formWrapper'>
                <form className="form">
                    <h1>Transformez<br />vos stats en résultats</h1>
                    <p className="subtitle">Se connecter</p>
                    <section className="formGroup">
                        <label htmlFor="username" className="label">Adresse email</label>
                        <input id="username" className="input" name="username" type="text" onBlur={handleChange} onKeyDown={hideError}/>
                        <span className="error">{errors.username}</span>
                    </section>
                    <section className="formGroup">
                        <label htmlFor="password" className="label">Mot de passe</label>
                        <input id="password" className="input" name="password" type="password" onBlur={handleChange} onKeyDown={hideError}/>
                        <span className="error">{errors.password}</span>
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