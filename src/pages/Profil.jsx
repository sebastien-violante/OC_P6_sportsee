import ProfileBadge from "../components/ProfileBadge/ProfileBadge"
import DataBadge from "../components/DataBadge/DataBadge"
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../providers/ContextData'
import { DateTime } from "luxon"
import fetchActivities from "../api/fetchFromBack/fetchActivities"
import { Cookies } from "react-cookie"
import { Navigate } from 'react-router-dom';

export default function Profil() {

    // CONTANTES //////////////////////////////////////////

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
    
    const today = DateTime.now()

    // STATES /////////////////////////////////////////////
    const [restDays, setRestDays] = useState(0)
    const [calories, setCalories] = useState(0)
    const [activities, setActivities] = useState(0)

    // Récupération du token
    const cookies = new Cookies()
    const token = cookies.get("token")
    if (!token && !useMock) {
        return <Navigate to="/" replace />
    }

    // Rapatriement de toutes les activités depuis memberDate
    useEffect(() => {
        if(!memberDate) return
        async function getAllActivities() {
            // Requête auprès de l'API pour récupérer toutes les activités
            const allActivities = await fetchActivities(useMock, token, memberDate.toFormat('yyyy-MM-dd'), today.toFormat('yyyy-MM-dd'))
            if(!allActivities) return
            setActivities(allActivities)
            
            // Détérmination des calories brûlées et du nombre de jours de repos
            const calories = allActivities.reduce((sum, activity) => sum + activity.caloriesBurned, 0)
            setCalories(calories)
            setRestDays(Math.floor(today.diff(memberDate, 'days').days ) - allActivities.length)
        }
        getAllActivities()
    }, [useMock])

     
    return (
    <main className="mainProfile">
        <section  className="biodata" tabIndex={0} aria-label={`profil de ${userId}`}>
            <div className="profilBadge">
                <ProfileBadge picture={userPicture} id={userId} date={memberDate}/>
            </div>
            <article className="data" tabIndex={0} aria-label={`biodata de ${userId}`}>
                <h2 className="subTitle">Votre profil</h2>
                <div className="items">
                    <p className="item">Âge : {age}</p>
                    <p className="item">Taille : {height}</p>
                    <p className="item">Poids : {weight}kg</p>
                </div>
            </article>
        </section>
        <section className="statistics">
            <h2 className="subTitle">Vos statistiques</h2>
            <p className="caption">{memberDate ? `depuis le ${memberDate.setLocale('fr').toFormat('d LLLL yyyy')}` : "" }</p>
            <div className="badges">
                <DataBadge title={"Temps total couru"} data={totalDurationHrs} unit={totalDurationMin} aria-label={`temps parcouru ${totalDurationHrs} heures et ${totalDurationMin} minutes`}/>
                <DataBadge title={"Calories brûlées"} data={calories} unit={"cal"} aria-label={`${calories} calorise brulées`} />
                <DataBadge title={"Distance totale parcourue"} data={totalDistance} unit={"km"} aria-label={`${totalDistance} kilomètres parcourus`} />
                <DataBadge title={"Nombre de jours de repos"} data={restDays} unit={"jours"} aria-label={`${restDays} jours de repos`} />
                <DataBadge title={"Nombre de sessions"} data={activities.length} unit={"sessions"} aria-label={`${activities.length} sessions`} />
            </div>
        </section>
    </main>
    )
}