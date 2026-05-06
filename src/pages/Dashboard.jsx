import { Navigate } from 'react-router-dom';
import { DataContext } from '../providers/ContextData';
import { useContext, useState, useEffect, useMemo } from 'react';
import { DateTime } from 'luxon';
import GraphChart from '../components/GraphChart/GraphChart'
import DonutChart  from '../components/DonutChart/DonutChart'
import ProfileBadge from '../components/ProfileBadge/ProfileBadge';
import getFirstDayPeriod from '../utils/getFirstDayPeriod';
import getCurrentWeek from '../utils/getCurrentWeek'
import fetchActivities from '../api/fetchFromBack/fetchActivities'
import { formatDistanceFourWeeks, formatBpmOneWeek, formatCurrentWeekActivities } from '../api/services/formatActivities'
import changePeriod from '../utils/changePeriod';


export default function NewDashboard() {
    
  // Récupération des informations de contexte
  const {
    userId,
    totalDistance,
    memberDate,
    userPicture,
    useMock
  } = useContext(DataContext)
 
  // Initialisation des données de distance et de bpm
  const initialDistanceData = { distAverage: 0, distances: []}
  const initialBpmData = { averageBpm: 0, bpmPerDay: []}
  const initialWeekData = {}

  const [distanceData, setDistanceData] = useState(initialDistanceData)
  const [bpmData, setBpmData] = useState(initialBpmData)
  const [weekData, setWeekData] = useState(initialWeekData)

  // Initialisation de la date du jour pour base de départ des données
  const today = DateTime.now()
  // Calcul de l'intervalle pour le graphe des distances
  const [endDistanceDate, setEndDistanceDate] = useState(today)
  const startDistanceDate = getFirstDayPeriod(endDistanceDate, "week")
  // Calcul de l'intervalle pour le graphe des bpm
  const [endBpmDate, setEndBpmDate] = useState(today)
  const startBpmDate = getFirstDayPeriod(endBpmDate, "day")
  // Calcul des dates de fin et début de la semaine actuelle
  const {weekStart, weekEnd} = getCurrentWeek(today)
  
  // Calcul des données du graphique de distance
  useEffect(() => {
    async function getDistanceData() {
      const token = sessionStorage.getItem('token')
      const distanceActivities = await fetchActivities(useMock, token, startDistanceDate.toFormat('yyyy-MM-dd'), endDistanceDate.toFormat('yyyy-MM-dd'))
      setDistanceData(formatDistanceFourWeeks(endDistanceDate, distanceActivities))
    }
    getDistanceData()
  }, [useMock, endDistanceDate])

  // Calcul des données du graphique de bpm
  useEffect(() => {
    async function getBpmData() {
      const token = sessionStorage.getItem('token')
      const bpmActivities = await fetchActivities(useMock, token, startBpmDate.toFormat('yyyy-MM-dd'), endBpmDate.toFormat('yyyy-MM-dd'))
      setBpmData(formatBpmOneWeek(endBpmDate, bpmActivities))
    }
    getBpmData()
  }, [useMock, endBpmDate])

  // Calcul des données du graphique du donut
  const activityTarget = 6
  const dataDonut = [
        {name: "réalisés", value: weekData.weekActivities},
        {name: "restants", value: activityTarget-weekData.weekActivities}
  ]
  
  useEffect(() => {
    async function getWeekData() {
      const token = sessionStorage.getItem('token')
      const weekActivities = await fetchActivities(useMock, token, weekStart, weekEnd)
      setWeekData(formatCurrentWeekActivities(weekStart, weekEnd, weekActivities))
    }
    getWeekData()
  }, [useMock])
  
  function decalateGraph(slot, type) {
    if(slot === "week") {
      const newEndDate = changePeriod(slot, type, endDistanceDate)
      setEndDistanceDate(newEndDate)
    } else {
      const newEndDate = changePeriod(slot, type, endBpmDate)
      setEndBpmDate(newEndDate)
    }
  }
  console.log(distanceData)  
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
          <section className='lastPerfo'>
            <h2 className="sectionTitle">Vos dernières performances</h2>
            <div className="graphs">
              <article className="graphBarDistance">
                <div className="data">
                  <p className="average">{distanceData.distAverage}km en moyenne</p>
                    <div className="selectDate">
                      <button onClick={() => decalateGraph('week', 'previous')}>
                        <img src="leftArrow.png" alt="période précédente" className="arrow" ></img>
                      </button>
                      <p>{startDistanceDate.setLocale('fr').toFormat('d LLLL')} - {endDistanceDate.setLocale('fr').toFormat('d LLLL')}</p>
                      <button onClick={() => decalateGraph('week')}>
                        <img src="rightArrow.png" alt="période suivante" className="arrow" ></img>
                      </button>
                    </div>
                </div>
                <p className="caption">Total des kilomètres 4 dernières semaines</p>
                <div className="distanceGraphWrapper"> 
                  <GraphChart data={distanceData.distances} />
                </div>
              </article>
              <article className="graphBarBpm">
                <div className="data">
                  <p className="average">{bpmData.averageBpm} BPM</p>
                    <div className="selectDate">
                      <button onClick={() => decalateGraph('day', 'previous')}>
                        <img src="leftArrow.png" alt="période précédente" className="arrow" ></img>
                      </button>
                      <p>{startBpmDate.setLocale('fr').toFormat('d LLLL')} - {endBpmDate.setLocale('fr').toFormat('d LLLL')}</p>
                      <button onClick={() => decalateGraph('day')}>
                        <img src="rightArrow.png" alt="période suivante" className="arrow" ></img>
                      </button>
                    </div>
                </div>
                <p className="caption">Fréquence cardiaque moyenne</p> 
                <div className="bpmGraphWrapper"> 
                  <GraphChart data={bpmData.bpmPerDay} />
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
                    <p className="realised"><span className="target">x{weekData.weekActivities}</span> sur objectif de {activityTarget}</p>
                    <p className="caption">Courses hebdomadaires réalisées</p>
                  </div>
                  <DonutChart data={dataDonut}/>
                </article>
                <div className="data">
                  <article className="duration">
                    <p className="label">Durée d'activité</p>
                    <p className="result"><span className="number">{weekData.weekDuration}</span> minutes</p>
                  </article>
                  <article className="distance">
                    <p className="label">Distance</p>
                    <p className="result"><span className="number">{Math.round(weekData.weekDistance*10)/10}</span> kilomètres</p>
                  </article>
                </div>
              </div>
            </section>
        </>
      )
}