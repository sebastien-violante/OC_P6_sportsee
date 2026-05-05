import ProfileBadge from "../components/ProfileBadge/ProfileBadge";
import DataBadge from "../components/DataBadge/DataBadge";
import { useContext } from 'react'
import { DataContext } from '../providers/ContextData';

export default function Profil() {

     const {
        fourWeeksData,
        lastWeekBpm,
        decalateDistanceGraph,
        decalateBpmGraph,
        endDistancePeriod,
        beginDistancePeriod,
        endBpmPeriod,
        beginBpmPeriod,
        weekStart,
        weekEnd,
        activityTarget,
        dataDonut,
        weekActivities,
        weekDistance,
        weekDuration,
        userId,
        totalDistance,
        memberDate,
        userPicture,
        age,
        weight,
        height,
        totalSessions,
        totalDurationHrs,
        totalDurationMin,
        burntCalories,
      } = useContext(DataContext)

    
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
                <DataBadge title={"Calories brûlées"} data={burntCalories} unit={"cal"} />
                <DataBadge title={"Distance totale parcourue"} data={totalDistance} unit={"km"} />
                <DataBadge title={"Nombre de jours de repos"} data={totalDistance} unit={"km"} />
                <DataBadge title={"Nombre de sessions"} data={totalSessions} unit={"sessions"} />
            </div>
        </section>
        
    </main>
    )
}