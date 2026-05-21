import { useState, useEffect, useContext } from "react"
import { Cookies } from "react-cookie"
import { DataContext } from '../providers/ContextData'
import { DateTime } from "luxon"
import { formatActivitiesDataForIa, formatFormDataForIa } from "../api/services/formatDataForIa"
import validateFormIa from "../utils/validateFormIa"
import isEmpty from "lodash-es/isEmpty"
import { TRAINING_PROMPT } from "../prompts/trainingPrompts"
import ReactMarkdown from "react-markdown"
import rehypeSanitize from "rehype-sanitize"
import { BeatLoader } from "react-spinners"
import formIaHandleChange from "../utils/formIaHandleChange"

export default function Coach() {

    // récupération des infos d'environnement
    const apiKey = import.meta.env.VITE_API_KEY
    const model = import.meta.env.VITE_MODEL
    const temperature = Number(import.meta.env.VITE_TEMPERATURE)
    const url = import.meta.env.VITE_URL
    const max_tokens = import.meta.env.VITE_MAX_TOKENS
    const prompts_limitation = Number(import.meta.env.VITE_PROMPTS_LIMITATION)
    // variable indiquant l'état de chargement des données
    const [loading, setLoading] = useState(false);
    
    // récupération des données utilisateur depuis le context
    const {
        totalDistance,
        memberDate,
        age,
        weight,
    } = useContext(DataContext)
   
    // élaboration de la partie prompt concernant les activités de l'utilisateur
    const activitiesMessage = formatActivitiesDataForIa(totalDistance, memberDate, weight, age)
    
    // initialisation des donées du formulaire
    const initialFormData = {
        raceType: "",
        distance: "",
        terrainType: "",
        startDate: "",
        nutritionAdvice: false,
        days: []
    }    
    const [formData, setFormData] = useState(initialFormData)
    
    // initialisation du ontenu de la partie planning
    const [planning, setPlanning] = useState("")
    
    // Initialisation à null des erreurs du formulaire
    const [errors, setErrors] = useState({
        distance: "",
        terrainType: "",
        startDate: "",
        days: ""
    })

    useEffect(() => {
        const today = DateTime.now().toISODate()
        const lastDate = localStorage.getItem("prompts_date")

        if (lastDate !== today) {
            localStorage.setItem("prompts_date", today)
            localStorage.setItem("prompts_credits", prompts_limitation)
        }
    }, [])

    const getCredits = () => {
        const credits = Number(localStorage.getItem("prompts_credits") || 0)
        return isNaN(credits) ? 0 : credits
    }

    // concaténation des données du formulaire au fur et à mesure de la saisie
    const handleChange = formIaHandleChange(setFormData)
 
    // Soumission du formulaire
    async function handleSubmit(event) {
        event.preventDefault()
        const errors = validateFormIa(formData)
        setErrors(errors)
        if (isEmpty(errors)) {
            const promptsCredits = localStorage.getItem("prompts_credits")
            console.log(promptsCredits)
            const credits = getCredits()
            if (credits <= 0) {
                setPlanning("Votre crédit IA est épuisé pour aujourd'hui !")
                return
            }
            localStorage.setItem("prompts_credits", String(credits - 1))
            setLoading(true)
            let messages = []
            messages.push({
                role: "system",
                content: "tu es un coach sportif confirmé et spécialisé en course à pieds"
            })
            const formMessages = formatFormDataForIa(formData)
            formMessages.map(message => {
                messages.push({
                    role: "user",
                    content: `${message}`
                })
            })
            messages.push(activitiesMessage)
            messages.push({
                role: "user",
                content: TRAINING_PROMPT
            })
            const payload = {
                model: `${model}`,
                temperature: temperature,
                max_tokens: Number(`${max_tokens}`),
                messages: messages
            }
            try{
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`
                    },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) {
                   switch (response.status) {
                    case 400:
                        throw new Error("Votre demande est invalide.")
                    case 401:
                        throw new Error("Vos identifiants ne permettent pas la connection à l'api")
                    case 403:
                        throw new Error("Vous n'êtes pas autorisés à accéder à l'api.")
                    case 404:
                        throw new Error("La page demandée n'existe pas.")
                    case 429:
                        throw new Error("Trop de requêtes. Réessaiyez dans quelques instants.")
                    case 500:
                        throw new Error("Erreur interne du serveur.")
                    case 503:
                        throw new Error("Service temporairement indisponible.")
                    default:
                        throw new Error(`Erreur API (${response.status})`)
                    }
                }
                
                const data = await response.json()
                const result = data.choices[0].message.content
                if(data.choices[0].finish_reason === "length") {
                    throw new Error(`Erreur API: la réponse est tronquée`)
                }
                console.log(data.choices[0].finish_reason)
                setPlanning(result)

            } catch(error) {
                 if (error.name === "TypeError") {
                    setPlanning("Erreur réseau : impossible de contacter l'API")
                } else {
                    setPlanning(error.message)
                }
                
            } finally {
                setLoading(false)
            }
            
        }
    }

    return (
        <section className="coach">
            <h1>Votre plan d'entrainement personnalisé</h1>
            <p className="intro">Remplissez le formulaire et validez-le pour obtenir votre plan d'entraînement sur 6 semaines, personnalisé par notre coach virtuel</p>
            <form className="form">
                <section className="formGroup">
                    <label htmlFor="raceType" className="label">Type de course</label>
                        <select 
                            id="raceType" 
                            name="raceType" 
                            className="" 
                            onChange={handleChange}
                            value={formData.raceType}
                            >
                            <option value="">-- Choisir un type --</option>
                            <option value="marathon">Marathon</option>
                            <option value="semi-marathon">Semi-marathon</option>
                            <option value="10km">10 km</option>
                            <option value="course-libre">Juste pour la forme</option>
                        </select>
                </section>
                <section className="formGroup">
                    <label htmlFor="distance" className="label">Distance</label>
                    <input 
                        type="number" 
                        id="distance" 
                        name="distance" 
                        min="0" 
                        className="" 
                        placeholder="Entrez une distance"  
                        onChange={handleChange} 
                        value={formData.distance}/>
                    <span className="error">{errors.distance}</span>
                </section>
                <section className="formGroup">
                    <label htmlFor="terrainType" className="label">Type de terrain</label>
                    <select 
                        id="terrainType" 
                        name="terrainType" 
                        className="" 
                        onChange={handleChange}
                        value={formData.terrainType}
                        >
                        <option value="">-- Choisir un terrain --</option>
                        <option value="route">Route</option>
                        <option value="chemin">Chemin</option>
                        <option value="mixte">Mixte</option>
                    </select>
                    <span className="error">{errors.terrainType}</span>
                </section>
                <section className="formGroup">
                    <label htmlFor="startDate" className="label">Date de la course</label>
                    <input 
                        type="date" 
                        id="startDate" 
                        name="startDate" 
                        className="startDate" 
                        onChange={handleChange}
                        value={formData.startDate}
                        />
                    <span className="error">{errors.startDate}</span>
                </section>
                <div className="days-container">
                    <section className="formGroup">
                        <label className="label">Choisissez les jours où vous pouvez courir</label>
                        <div className="checkboxes">
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Lundi" checked={formData.days.includes("Lundi")} onChange={handleChange}/>Lun</label>
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Mardi" checked={formData.days.includes("Mardi")} onChange={handleChange}/>Mar</label>
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Mercredi" checked={formData.days.includes("Mercredi")} onChange={handleChange}/>Mer</label>
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Jeudi" checked={formData.days.includes("Jeudi")} onChange={handleChange}/>Jeu</label>
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Vendredi" checked={formData.days.includes("Vendredi")} onChange={handleChange}/>Ven</label>
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Samedi" checked={formData.days.includes("Samedi")} onChange={handleChange}/>Sam</label>
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Dimanche" checked={formData.days.includes("Dimanche")} onChange={handleChange}/>Dim</label> 
                        </div>
                        <span className="error">{errors.days}</span>
                    </section>
                </div>
                <section className="formGroup">
                    <p className="label">J'ai besoin de conseils d'alimentation</p>
                    <label className="nutritionLabel"><input type="checkbox" name="nutritionAdvice" checked={formData.nutritionAdvice} className="check" onChange={handleChange}/>Oui</label>
                </section>
                <button type="submit" className="btnSubmit" onClick={handleSubmit}>Valider</button>
            </form>
            {loading && (
                <div className="loader">
                    <p>Votre plan est en préparation. Encore quelques secondes de patience...</p>
                    <BeatLoader color="#36d7b7" />
                </div>
            )}
            {!loading && planning && (
                <section className="planning">
                    <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                        {planning}
                    </ReactMarkdown>
                </section>
            )}            
        </section>
    )
}