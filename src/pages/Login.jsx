import './custom.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validateForm from '../utils/validateForm';
import login from '../utils/login';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import Logo from '../components/Logo/Logo';

export default function Home() {
    
    // CONSTANTES ////////////////////////////////////////////////////////////////////////////////////
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(["token"])

    // STATES ////////////////////////////////////////////////////////////////////////////////////
    const [formData, setFormData] = useState({
        identifiant: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    })
    const [loginError, setLoginError] = useState("")

    // HANDLERS ////////////////////////////////////////////////////////////////////////////////////
    const handleChange = (event)  => {
        const { name, value } = event.target 
        setFormData((prev) => ({...prev, [name]: value}))
    }
    
    async function handleSubmit(event) {
        event.preventDefault()
        const errors = validateForm(formData)
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            try {
                setLoginError("")
                const token = await login(formData)
                if(token) {
                    setCookie("token", token, {
                        path: "/",
                        secure: true,
                        sameSite: "strict",
                        maxAge: 60 * 60 // délai max : 1 heure
                    })
                    navigate('/dashboard')
                }
            } catch (error) {
                setLoginError("Le serveur est indisponible. Veuillez réessayer plus tard.")
            }
        }
    }

    const hideError = (event) => {
        const name = event.target.name;
        setErrors(prev => ({
            ...prev,
            [name]: null
        }));
        setLoginError("")
    }

    return (
        <section className="wrapper">
            <section className='formWrapper'>
                <div className="logo">
                    <Logo />
                    <img src="brand.svg" alt="Sportsee" className="brand"/>
                </div>
                <form className="form">
                    <h1>Transformez<br />vos stats en résultats</h1>
                    <h2 className="subtitle">Se connecter</h2>
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
                    <NavLink  to="/nouveau-mot-de-passe"><button className="forgottenPassword">Mot de passe oublié ?</button></NavLink>
                    {loginError && (<p className="invalidCredential">{loginError}</p>)}
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