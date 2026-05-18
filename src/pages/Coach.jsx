import { useState, useEffect, useContext } from "react"
import { Cookies } from "react-cookie"
import { DataContext } from '../providers/ContextData'
import { DateTime } from "luxon"
import { formatActivitiesDataForIa, formatFormDataForIa } from "../api/services/formatDataForIa"
import validateFormIa from "../utils/validateFormIa"
import isEmpty from "lodash-es/isEmpty"
import { TRAINING_PROMPT } from "../prompts/trainingPrompts"
import ReactMarkdown from "react-markdown"
import { BeatLoader } from "react-spinners"

export default function Coach() {

    // récupération des inofs d'environnement
    const apiKey = import.meta.env.VITE_API_KEY
    const model = import.meta.env.VITE_MODEL
    const temperature = Number(import.meta.env.VITE_TEMPERATURE)
    const system = import.meta.env.VITE_SYSTEM 
    const url = import.meta.env.VITE_URL

    const [loading, setLoading] = useState(false);

    const [activities, setActivities] = useState(null)
    // Récupération des données user provenant du context
        const {
            userId,
            totalDistance,
            memberDate,
            userPicture,
            age,
            weight,
            height,
            totalDurationHrs,
            totalDurationMin,
            useMock
        } = useContext(DataContext)
    
    // Récupération du token
        const cookies = new Cookies()
        const token = cookies.get("token")
   
    const activitiesMessage = formatActivitiesDataForIa(totalDistance, memberDate, weight, age)
    

    const [formData, setFormData] = useState({
            raceType: "",
            distance: "",
            terrainType: "",
            startDate: "",
            nutritionAdvice: false,
            days: []
        })
    
    const [planning, setPlanning] = useState("")
    
    // Initialisation à null des erreurs du formulaire
    const [errors, setErrors] = useState({
        distance: "",
        terrainType: "",
        startDate: "",
        days: ""
    })

     // Remplissage de l'objet formData
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        if (name === "raceType") {
            let distanceValue = ""
            switch (value) {
                case "marathon":
                    distanceValue = 42.195
                    break
                case "semi-marathon":
                    distanceValue = 21
                    break
                case "10km":
                    distanceValue = 10
                    break
            }
            setFormData((prev) => ({
                ...prev,
                raceType: value,
                distance: distanceValue
            }))
            return
        }

        if (name === "days") {
            setFormData((prev) => ({
                ...prev,
                days: checked
                    ? [...prev.days, value]
                    : prev.days.filter(d => d !== value)
            }))
            return
        }

        if (type === "radio") {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }))
            return
        }
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

       const fillDistance = (value) => {
    let distanceValue = ""

    switch(value) {
        case "marathon":
            distanceValue = 42.195
            break
        case "semi-marathon":
            distanceValue = 21
            break
        case "10km":
            distanceValue = 10
            break
        default:
            distanceValue = ""
    }

    setFormData((prev) => ({
        ...prev,
        raceType: value,
        distance: distanceValue
    }))
}

    // Soumission du formulaire
    async function handleSubmit(event) {
        event.preventDefault()
        
        const errors = validateFormIa(formData)
        console.log(errors)
        setErrors(errors)
        if (isEmpty(errors)) {
            setLoading(true)
            let messages = []
            messages.push({
                role: "system",
                content: `${system}`
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
                    const errorBody = await response.text()
                    console.error("API ERROR:", response.status, errorBody);
                    switch (response.status) {
                        case 401 : 
                            throw new Error("Erreur 401 : vous n'avez pas l'autorisation de vous connecter")
                            break
                        default :
                        
                        }
                    

                    throw new Error(`Erreur API (${response.status})`)
                }
                const data = await response.json()
                const result = data.choices[0].message.content
                setPlanning(result)
            } catch(error) {
                console.error(error)
                setPlanning(error.message)
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
                            <select id="raceType" name="raceType" className="" onBlur={handleChange} onChange={(e) => fillDistance(e.target.value)}>
                                <option value="">-- Choisir un type --</option>
                                <option value="marathon">Marathon</option>
                                <option value="semi-marathon">Semi-marathon</option>
                                <option value="10km">10 km</option>
                                <option value="course-libre">Juste pour la forme</option>
                            </select>
                    </section>
                
                
                    <section className="formGroup">
                        <label htmlFor="distance" className="label">Distance</label>
                        <input type="number" id="distance" name="distance" min="0" className="" placeholder="Entrez une distance"  onChange={handleChange} value={formData.distance}/>
                        <span className="error">{errors.distance}</span>
                    </section>
                
                
                    <section className="formGroup">
                        <label htmlFor="terrainType" className="label">Type de terrain</label>
                        <select id="terrainType" name="terrainType" className="" onBlur={handleChange}>
                            <option value="">-- Choisir un terrain --</option>
                            <option value="route">Route</option>
                            <option value="chemin">Chemin</option>
                            <option value="mixte">Mixte</option>
                        </select>
                        <span className="error">{errors.terrainType}</span>
                    </section>
                
                
                    <section className="formGroup">
                        <label htmlFor="startDate" className="label">Date de la course</label>
                        <input type="date" id="startDate" name="startDate" className="" onBlur={handleChange}/>
                        <span className="error">{errors.startDate}</span>
                    </section>
                
                <div className="days-container">
                    <section className="formGroup">
                        <label className="label">Choisissez les jours où vous pouvez courir</label>
                        <div className="checkboxes">
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Lundi" onChange={handleChange}/>Lun</label>
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Mardi" onChange={handleChange}/>Mar</label>
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Mercredi" onChange={handleChange}/>Mer</label>
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Jeudi" onChange={handleChange}/>Jeu</label>
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Vendredi" onChange={handleChange}/>Ven</label>
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Samedi" onChange={handleChange}/>Sam</label>
                            <label className="dayLabel"><input className="dayInput" type="checkbox" name="days" value="Dimanche" onChange={handleChange}/>Dim</label> 
                        </div>
                        <span className="error">{errors.days}</span>
                    </section>
                </div>
                
                    <section className="formGroup">
                        <p className="label">J'ai besoin de conseils d'alimentation</p>
                        <label className="nutritionLabel"><input type="checkbox" name="nutritionAdvice" value="oui" className="check" onChange={handleChange}/>Oui</label>
                    </section>
                
                <button type="submit" className="btnSubmit" onClick={handleSubmit}>Valider</button>
            </form>
            {loading && (
                <div className="loader">
                    <p>Votre plan est en préparation. Quelques secondes de patience...</p>
                    <BeatLoader color="#36d7b7" />
                </div>
            )}

            {!loading && planning && (
                <section className="planning">
                    <ReactMarkdown>{planning}</ReactMarkdown>
                </section>
            )}            
        </section>
        
    )
}