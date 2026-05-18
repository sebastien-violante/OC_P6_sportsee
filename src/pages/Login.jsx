import './custom.css'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import validateForm from '../utils/validateForm'
import login from '../utils/login'
import { useCookies } from 'react-cookie'
import { NavLink } from 'react-router-dom'
import Logo from '../components/Logo/Logo'
import isEmpty from "lodash-es/isEmpty"
import getFocusables from '../utils/getFocusables'
import handleKeyboard from '../utils/handleKeyBoard'

export default function Home() {
    
    // CONSTANTES ////////////////////////////////////////////////////////////////////////////////////
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(["token"])
    
    // STATES ///////////////////////////////////////////////////////////////////////////////////////
    const refForm = useRef()
    const refFocusables = useRef([]) 
    // Initialisation à null des valeurs des champs du formulaire
    const [formData, setFormData] = useState({
        identifiant: "",
        password: "",
    })
    // Initialisation à null des erreurs du formulaire
    const [errors, setErrors] = useState({
        username: "",
        password: ""
    })
    // Initialisation à null de l'erreur issu de la soumission du formulaire
    const [loginError, setLoginError] = useState("")
    // EFFECTS /////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if(!refForm.current) return
        refFocusables.current = getFocusables(refForm.current)
        refFocusables.current[0]?.focus()
    }, [])
    // HANDLERS ////////////////////////////////////////////////////////////////////////////////////

    // Gestion des actions clavier 
    const handleKeyDown = (event) => {
        const first = refFocusables.current[0]
        const last = refFocusables.current[refFocusables.current.length-1]
        handleKeyboard(event, { first, last })
    }

    // Remplissage de l'objet formData au fur et à mesure du Remplissage
    const handleChange = (event)  => {
        const { name, value } = event.target 
        setFormData((prev) => ({...prev, [name]: value}))
    }
    
    // Soumission du formulaire
    async function handleSubmit(event) {
        event.preventDefault()
        const errors = validateForm(formData)
        setErrors(errors)
        if (isEmpty(errors)) {
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
                    navigate('/dashboard', {replace: true})
                }
            } catch (error) {
               setLoginError(error.message)
            }
        }
    }

    // Permet d'effacer le message d'erreur d'un champ lorsd'une nouvelle saisie
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
                <form className="form" ref={refForm} onKeyDown={handleKeyDown}>
                    <h1 tabIndex={0}>Transformez<br />vos stats en résultats</h1>
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
                    <NavLink  className="forgottenPassword" to="/">Mot de passe oublié ?</NavLink>
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