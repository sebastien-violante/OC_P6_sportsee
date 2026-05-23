import ProfileBadge from "../components/ProfileBadge/ProfileBadge"
import DataBadge from "../components/DataBadge/DataBadge"
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../providers/ContextData'
import { DateTime } from "luxon"
import fetchActivities from "../api/fetchFromBack/fetchActivities"
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';


export default function Profil() {

    // CONTANTES //////////////////////////////////////////

    // Récupération des données user provenant du context
    const { user, useMock } = useContext(DataContext)
    
    // Date du jour
    const today = DateTime.now()

    // Récupération du token
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    // STATES /////////////////////////////////////////////

    const [restDays, setRestDays] = useState(0)
    const [calories, setCalories] = useState(0)
    const [activities, setActivities] = useState([])

    
    // EFFETS /////////////////////////////////////////////

    // Rapatriement de toutes les activités depuis memberDate
    useEffect(() => {
        if(!token || !user?.memberDate) return
        async function getAllActivities() {
            // Requête auprès de l'API pour récupérer toutes les activités
            const allActivities = await fetchActivities(useMock, token, user.memberDate.toFormat('yyyy-MM-dd'), today.toFormat('yyyy-MM-dd'))
            if(!allActivities) return
            setActivities(allActivities)
            // Détérmination des calories brûlées et du nombre de jours de repos
            const calories = allActivities.reduce((sum, activity) => sum + activity.caloriesBurned, 0)
            setCalories(calories)
            setRestDays(Math.floor(today.diff(user.memberDate, 'days').days ) - allActivities.length) 
        }
        getAllActivities()
    }, [useMock, token, user])
    
    // En l'absence de token, redirection vers authentification
    if (!token && !useMock) {
        return <Navigate to="/" replace />
    }
    
    return (
        <main className="mainProfile">
            {!user ? 
                <div className="flex justify-center">
                    <BeatLoader size={10} color="#36d7b7"/>
                </div>
                :
                <>
                    <section  className="biodata" tabIndex={0} aria-label={`profil de ${user.userId}`}>
                        <div className="profilBadge">
                            <ProfileBadge picture={user.userPicture} id={user.userId} date={user.memberDate}/>
                        </div>
                        <article className="data" tabIndex={0} aria-label={`biodata de ${user.userId}`}>
                            <h2 className="subTitle">Votre profil</h2>
                            <div className="items">
                                <p className="item">Âge : {user.age}</p>
                                <p className="item">Taille : {user.height}</p>
                                <p className="item">Poids : {user.weight}kg</p>
                            </div>
                        </article>
                    </section>
                    <section className="statistics">
                        <h2 className="subTitle">Vos statistiques</h2>
                        <p className="caption">{user.memberDate ? `depuis le ${user.memberDate.setLocale('fr').toFormat('d LLLL yyyy')}` : "" }</p>
                        <div className="badges">
                            <DataBadge title={"Temps total couru"} data={user.totalDurationHrs ?? 0} unit={user.totalDurationMin ?? 0} aria-label={`temps parcouru ${user.totalDurationHrs} heures et ${user.totalDurationMin} minutes`}/>
                            <DataBadge title={"Calories brûlées"} data={calories ?? 0} unit={"cal"} aria-label={`${calories} calorise brulées`} />
                            <DataBadge title={"Distance totale parcourue"} data={user.totalDistance ?? 0} unit={"km"} aria-label={`${user.totalDistance} kilomètres parcourus`} />
                            <DataBadge title={"Nombre de jours de repos"} data={restDays ?? 0} unit={restDays === 0 ? "jour" : "jours"} aria-label={`${restDays} jours de repos`} />
                            <DataBadge title={"Nombre de sessions"} data={activities.length ?? 0} unit={activities.length === 0 ? "session" : "sessions"} aria-label={`${activities.length} sessions`} />
                        </div>
                    </section>
                </>
        }
        </main>
    )
}