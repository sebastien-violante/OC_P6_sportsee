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
import { formatDistanceFourWeeks, formatBpmOneWeek } from '../api/services/formatActivities'


export default function NewDashboard() {
    
  // Récupération des informations de contexte
  const {
    userId,
    totalDistance,
    memberDate,
    userPicture,
    useMock
  } = useContext(DataContext)
 
  // Initialisation des données de distance et de bpm pour les graphiques
  const [distanceData, setDistanceData] = useState({})
  const [bpmData, setBpmData] = useState({})

  // Initialisation de la date du jour pour base de départ des données
  const today = DateTime.now()
  // Calcul de l'intervalle pour le graphe des distances
  const [endDistanceDate, setEndDistanceDate] = useState(today)
  const startDistanceDate = getFirstDayPeriod(endDistanceDate, "week")
// Calcul de l'intervalle pour le graphe des bpm
  const [endBpmDate, setEndBpmDate] = useState(today)
  const startBpmDate = getFirstDayPeriod(endBpmDate, "day")

  //const {weekStart, weekEnd} = getCurrentWeek(today)

  // Calcul des données du graphique de distance
  useEffect(() => {
    async function getDistanceData() {
      const token = sessionStorage.getItem('token')
      const distanceActivities = await fetchActivities(useMock, token, startDistanceDate, endDistanceDate)
      setDistanceData(formatDistanceFourWeeks(endDistanceDate, distanceActivities))
    }
    getDistanceData()
  }, [useMock, endDistanceDate])

  // Calcul des données du graphique de bpm
  useEffect(() => {
    async function getBpmData() {
      const token = sessionStorage.getItem('token')
      const bpmActivities = await fetchActivities(useMock, token, startBpmDate, endBpmDate)
      setBpmData(formatBpmOneWeek(endBpmDate, bpmActivities))
    }
    getBpmData()
  }, [useMock, endBpmDate])
  // Renvoi vers la page login en cas d'absence de token en session
   //  if (!token) {
   //     return <Navigate to="/" />;
  //  }
  const decalateDistanceGraph = (item, type) => {
    console.log(item)
    console.log(type)
  }
    const decalateBpmGraph = (item, type) => {
    console.log(item)
    console.log(type)
  }
  console.log(startDistanceDate)
  console.log(endDistanceDate)
  
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
                      <button onClick={() => decalateDistanceGraph('week', 'previous')}>
                        <img src="leftArrow.png" alt="période précédente" className="arrow" ></img>
                      </button>
                      <p>{startDistanceDate.setLocale('fr').toFormat('d LLLL')} - {endDistanceDate.setLocale('fr').toFormat('d LLLL')}</p>
                      <button onClick={() => decalateDistanceGraph('week')}>
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
                      <button onClick={() => decalateBpmGraph('day', 'previous')}>
                        <img src="leftArrow.png" alt="période précédente" className="arrow" ></img>
                      </button>
                      <p>{startBpmDate.setLocale('fr').toFormat('d LLLL')} - {endBpmDate.setLocale('fr').toFormat('d LLLL')}</p>
                      <button onClick={() => decalateBpmGraph('day')}>
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
        </>
      )
}