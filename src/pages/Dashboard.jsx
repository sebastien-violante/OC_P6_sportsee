import { fourWeeksDistances, lastWeekBpm, dataCurrentWeek } from '../api/services/activitiesService';
import { useState } from 'react';
import { DateTime } from 'luxon';
import getFirstDayPeriod from '../utils/getFirstDayPeriod';
import GraphChart from '../components/GraphChart/GraphChart';
import getCurrentWeek from '../utils/getCurrentWeek';
import DonutChart  from '../components/DonutChart/DonutChart'
import { getUser } from '../api/services/userService';
import { useContext } from 'react'
import { DataContext } from '../providers/ContextData';

export default  function Dashboard() {


  //////////////////////////////
  const {
    fourWeeksData,
    toggleUseMock,
    useMock,
    decalateDistanceGraph,
    decalateBpmGraph,
    endDistancePeriod,
    beginDistancePeriod,
    endBpmPeriod,
    beginBpmPeriod
  } = useContext(DataContext)

  console.log(fourWeeksData)
  //const activities = fourWeeksData.distances

  /////////////////////////////////

  const today = DateTime.fromISO("2026-02-05")


  const {userId, totalDistance, memberDate, userPicture} = getUser()
  
  

  // Récupération des données depuis les services
  const data = fourWeeksDistances(endDistancePeriod)
  const averageDistance = data.distAverage
  //const activities = data.distances
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
                  <button onClick={() => decalateDistanceGraph('week', 'previous')}>
                    <img src="leftArrow.png" alt="période précédente" className="arrow" ></img>
                  </button>
                  <p>{beginDistancePeriod.setLocale('fr').toFormat('d LLLL')} - {endDistancePeriod.setLocale('fr').toFormat('d LLLL')}</p>
                  <button onClick={() => decalateDistanceGraph('week')}>
                    <img src="rightArrow.png" alt="période suivante" className="arrow" ></img>
                  </button>
                </div>
            </div>
            <p className="caption">Total des kilomètres 4 dernières semaines</p>
            <div className="distanceGraphWrapper"> 
              <GraphChart data={fourWeeksData.distances} />
            </div>
          </article>
          <article className="graphBarBpm">
            <div className="data">
              <p className="average">{averageBpm} BPM</p>
                <div className="selectDate">
                  <button onClick={() => decalateBpmGraph('day', 'previous')}>
                    <img src="leftArrow.png" alt="période précédente" className="arrow" ></img>
                  </button>
                  <p>{beginBpmPeriod.setLocale('fr').toFormat('d LLLL')} - {endBpmPeriod.setLocale('fr').toFormat('d LLLL')}</p>
                  <button onClick={() => decalateBpmGraph('day')}>
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