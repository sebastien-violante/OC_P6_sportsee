import { fourWeeksDistances, lastWeekBpm, dataCurrentWeek } from '../api/services/activitiesService';
import { useState } from 'react';
import { DateTime } from 'luxon';
import getFirstDayPeriod from '../utils/getFirstDayPeriod';
import GraphChart from '../components/GraphChart/GraphChart';
import getCurrentWeek from '../utils/getCurrentWeek';
import DonutChart  from '../components/DonutChart/DonutChart'
import { getUser } from '../api/services/userService';

export default  function Dashboard() {

  const {userId, totalDistance, memberDate, userPicture} = getUser()
  
  //const today = DateTime.now()
  const today = DateTime.fromISO("2026-02-05")
  // Constantes de dates du graphique distances
  const [endDistancePeriod, setEndDistancePeriod] = useState(today)
  const beginDistancePeriod = getFirstDayPeriod(endDistancePeriod, "week")
  
  // Contantes dates du graphique bpm
  const [endBpmPeriod, setEndBpmPeriod] = useState(today)
  const beginBpmPeriod = getFirstDayPeriod(endBpmPeriod, "day")

  // Récupération des données depuis les services
  const data = fourWeeksDistances(endDistancePeriod)
  const averageDistance = data.distAverage
  const activities = data.distances
  const bpm = lastWeekBpm(endBpmPeriod)
  const averageBpm = bpm.averageBpm
  const bpmPerDay = bpm.bpmPerDay
  const {weekStart, weekEnd} = getCurrentWeek(today)
  const { weekActivities, weekDistance, weekDuration } = dataCurrentWeek(weekStart, weekEnd)
  const activityTarget = 6
  const dataDonut = [
    {name: "réalisés", value: weekActivities},
    {name: "restants", value: activityTarget-weekActivities}
  ]

  /* handlers */
  function changePeriod(slot, type) {
    if(type === "previous") {
      if(slot === "week") {
        setEndDistancePeriod(endDistancePeriod.minus({ weeks: 1 }))
      } else {
        setEndBpmPeriod(endBpmPeriod.minus({ days: 1 }))
      }
    } else {
      if(slot === "week") {
        setEndDistancePeriod(endDistancePeriod.plus({ weeks: 1 }))
      } else {
        setEndBpmPeriod(endBpmPeriod.plus({ days: 1 }))
      }
    }
    
  }
  return (
    <>
      <section className="runner">
        <article className="identity">
          <img className="pictureId" src={userPicture} alt=""></img>
          <div className="dataId">
            <h1>{userId}</h1>
            <p className="caption">Membre depuis le {memberDate.setLocale('fr').toFormat('d LLLL yyyy')}</p>
          </div>
        </article>
        <article className="totalDistance">
          <p className="caption">Distance totale parcourue</p>
          <div className="badge">
            <img className="flag" src="flag.png" alt=""></img>
            <p className="totalDistanceNumber">{totalDistance} km</p>
          </div>
        </article>
      </section>
      <section className='lastPerfo'>
        <h2 className="sectionTitle">Vos dernières performances</h2>
        <div className="graphs">
          <article className="graphBarDistance">
            <div className="data">
              <p className="average">{averageDistance}km en moyenne</p>
                <div className="selectDate">
                  <button onClick={() => changePeriod('week','previous')}>
                    <img src="leftArrow.png" alt="période précédente" className="arrow" ></img>
                  </button>
                  <p>{beginDistancePeriod.setLocale('fr').toFormat('d LLLL')} - {endDistancePeriod.setLocale('fr').toFormat('d LLLL')}</p>
                  <button onClick={() => changePeriod('week')}>
                    <img src="rightArrow.png" alt="période suivante" className="arrow" ></img>
                  </button>
                </div>
            </div>
            <p className="caption">Total des kilomètres 4 dernières semaines</p>
            <div className="distanceGraphWrapper"> 
              <GraphChart data={activities} />
            </div>
          </article>
          <article className="graphBarBpm">
            <div className="data">
              <p className="average">{averageBpm} BPM</p>
                <div className="selectDate">
                  <button onClick={() => changePeriod('day','previous')}>
                    <img src="leftArrow.png" alt="période précédente" className="arrow" ></img>
                  </button>
                  <p>{beginBpmPeriod.setLocale('fr').toFormat('d LLLL')} - {endBpmPeriod.setLocale('fr').toFormat('d LLLL')}</p>
                  <button onClick={() => changePeriod('day')}>
                    <img src="rightArrow.png" alt="période suivante" className="arrow" ></img>
                  </button>
                </div>
            </div>
            <p className="caption">Fréquence cardiaque moyenne</p> 
            <div className="bpmGraphWrapper"> 
              <GraphChart data={bpmPerDay} />
            </div>
          </article>
        </div>
      </section>
      <section className='thisWeek'>
        <h2 className="sectionTitle">Cette semaine</h2>
        <p className="sectionSubTitle">Du {weekStart.setLocale('fr').toFormat('d LLLL')} au {weekEnd.setLocale('fr').toFormat('d LLLL')}</p>
        <div className="donutAndData">
          <article className="donut">
            <div className="donutHeader">
              <p className="realised"><span className="target">x{weekActivities}</span> sur objectif de {activityTarget}</p>
              <p className="caption">Courses hebdomadaires réalisées</p>
            </div>
            <DonutChart data={dataDonut}/>
          </article>
          <div className="data">
            <article className="duration">
              <p className="label">Durée d'activité</p>
              <p className="result"><span className="number">{weekDuration}</span> minutes</p>
            </article>
            <article className="distance">
              <p className="label">Distance</p>
              <p className="result"><span className="number">{Math.round(weekDistance*10)/10}</span> kilomètres</p>
            </article>

          </div>
        </div>
      </section>
    </>
  )
}