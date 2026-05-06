import ProfileBadge from "../components/ProfileBadge/ProfileBadge"
import DataBadge from "../components/DataBadge/DataBadge"
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../providers/ContextData'
import { DateTime } from "luxon"
import fetchActivities from "../api/fetchFromBack/fetchActivities"

export default function Profil() {

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
        burntCalories,
        useMock
    } = useContext(DataContext)


    const [restDays, setRestDays] = useState(0)
    const [calories, setCalories] = useState(0)
    const [sessions, setSessions] = useState(0)
    const [distance, setDistance] = useState(0)

    const today = DateTime.now()
    const token = sessionStorage.getItem('token')
    
    // Rapatriement de toutes les activités depuis memberDate
    useEffect(() => {
        if(!memberDate) return
        async function getAllActivities() {
            const allActivities = await fetchActivities(useMock, token, memberDate.toFormat('yyyy-MM-dd'), today.toFormat('yyyy-MM-dd'))
            let calories = 0
            let daysWithActivity = 0
            let distance = 0
            allActivities.forEach(activity => {
                calories+=activity.caloriesBurned 
                daysWithActivity++   
                distance+=activity.distance        
            })
            console.log(allActivities)
            setCalories(calories)
            setRestDays(Math.floor(today.diff(memberDate, 'days').days - daysWithActivity))
            setSessions(daysWithActivity)
            setDistance(distance)
        }
        getAllActivities()
    }, [useMock])

 
    
    return (
    <main className="mainProfile">
        <section  className="biodata">
            <div className="profilBadge">
                <ProfileBadge picture={userPicture} id={userId} date={memberDate}/>
            </div>
            <article className="data">
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
                <DataBadge title={"Temps total couru"} data={totalDurationHrs} unit={totalDurationMin} />
                <DataBadge title={"Calories brûlées"} data={calories} unit={"cal"} />
                <DataBadge title={"Distance totale parcourue"} data={distance} unit={"km"} />
                <DataBadge title={"Nombre de jours de repos"} data={restDays} unit={"jours"} />
                <DataBadge title={"Nombre de sessions"} data={sessions} unit={"sessions"} />
            </div>
        </section>
        
    </main>
    )
}