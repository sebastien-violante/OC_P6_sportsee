import { Navigate } from 'react-router-dom';
import { DataContext } from '../providers/ContextData';
import { useContext, useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import GraphChart from '../components/GraphChart/GraphChart'
import DonutChart  from '../components/DonutChart/DonutChart'
import ProfileBadge from '../components/ProfileBadge/ProfileBadge';
import getFirstDayPeriod from '../utils/getFirstDayPeriod';
import getCurrentWeek from '../utils/getCurrentWeek'
import fetchActivities from '../api/fetchFromBack/fetchActivities'

export default function NewDashboard() {
    
  // Récupération des informations de contexte
  const {
    userId,
    totalDistance,
    memberDate,
    userPicture,
    useMock
  } = useContext(DataContext)
 
  // Initialisation de la date du jour pour base de départ des données
  const today = DateTime.local().toFormat('yyyy-MM-dd');
  const startDate = DateTime.local().minus({ months: 1 }).toFormat('yyyy-MM-dd');
  //Début et fin de période du graphique des distances et bpm, calculées par défaut à partir de la date du jour
  //const [endDistancePeriod, setEndDistancePeriod] = useState(today)
  //const beginDistancePeriod = getFirstDayPeriod(endDistancePeriod, "week")
  //const [endBpmPeriod, setEndBpmPeriod] = useState(today)
  //const beginBpmPeriod = getFirstDayPeriod(endBpmPeriod, "day")
  //const {weekStart, weekEnd} = getCurrentWeek(today)

  
  // Renvoi vers la page login en cas d'absence de token en session
  const token = sessionStorage.getItem('token')
     if (!token) {
        return <Navigate to="/" />;
    }
    
  useEffect(() => {
    async function getActivities(token, startDate, endDate) {
      const activities = await fetchActivities(token, startDate, endDate)
      console.log(activities)
    }
    getActivities(token, startDate, today)
  }, [useMock, token])

     return (
        <>
          <section className="runner">
                  <ProfileBadge picture={userPicture} id={userId} date={memberDate}/>
                  <article className="totalDistance">
                    <p className="caption">Distance totale parcourue</p>
                    <div className="badge">
                      <img className="flag" src="flag.png" alt=""></img>
                      <p className="totalDistanceNumber">{totalDistance} km</p>
                    </div>
                  </article>
                </section>

        </>
      )
}