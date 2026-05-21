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
import { useCookies } from 'react-cookie';
import { BeatLoader } from 'react-spinners';

export default function NewDashboard() {
    
  // CONSTANTES //////////////////////////////////////////////////////////////////////////////////

  // Informations utilisateur provenant du contexte
  const { user, loadingUser, useMock } = useContext(DataContext)

  // Récupération du token dans les cookies
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  
  // Initialisation de la date du jour pour base de départ des données
  const today = DateTime.now()

  // Initialisation des données de distance et de bpm
  const initialDistanceData = { distAverage: 0, distances: []}
  const initialBpmData = { averageBpm: 0, bpmPerDay: []}
  const initialWeekData = { weekActivities: 0, weekDuration: 0, weekDistance: 0 }

  // STATES ET CONSTANTES DERIVEES /////////////////////////////////////////////////////////////
  const [distanceData, setDistanceData] = useState(initialDistanceData)
  const [bpmData, setBpmData] = useState(initialBpmData)
  const [weekData, setWeekData] = useState(initialWeekData)
  const [endDistanceDate, setEndDistanceDate] = useState(today)
  const [endBpmDate, setEndBpmDate] = useState(today)

  // Calcul de l'intervalle pour le graphe des distances
  const startDistanceDate = getFirstDayPeriod(endDistanceDate, "week")

  // variable permettant l'affichage du sous-titre du graphique distance
  const isSameDay = endDistanceDate.hasSame(today, "day");
  
  // Calcul de l'intervalle pour le graphe des bpm
  const startBpmDate = getFirstDayPeriod(endBpmDate, "day")

  // Calcul des dates de fin et début de la semaine actuelle
  const {weekStart, weekEnd} = getCurrentWeek(today)
  
  // EFFETS //////////////////////////////////////////////////////////////////////////////////

  // Calcul des données du graphique de distance
  useEffect(() => {
    async function getDistanceData() {
      if(token) {
        const distanceActivities = await fetchActivities(useMock, token, startDistanceDate.toFormat('yyyy-MM-dd'), endDistanceDate.toFormat('yyyy-MM-dd'))
        setDistanceData(formatDistanceFourWeeks(endDistanceDate, distanceActivities))
      }
    }
    getDistanceData()
  }, [useMock, endDistanceDate, token])

  // Calcul des données du graphique de bpm
  useEffect(() => {
    async function getBpmData() {
      if(token) {
        const bpmActivities = await fetchActivities(useMock, token, startBpmDate.toFormat('yyyy-MM-dd'), endBpmDate.toFormat('yyyy-MM-dd'))
        setBpmData(formatBpmOneWeek(endBpmDate, bpmActivities))
      }
    }
    getBpmData()
  }, [useMock, endBpmDate, token])

  // Calcul des données pour la section semaine
  useEffect(() => {
    async function getWeekData() {
      if(token) {
        const weekActivities = await fetchActivities(useMock, token, weekStart.toFormat('yyyy-MM-dd'), weekEnd.toFormat('yyyy-MM-dd'))
        setWeekData(formatCurrentWeekActivities(weekStart, weekEnd, weekActivities))
      } 
    }
    getWeekData()
  }, [useMock, token])

  // Calcul des données du graphique du donut
  const activityTarget = 6
  const done = Number(weekData.weekActivities ?? 0)
  const toDo = Number(activityTarget ?? 0) - Number(weekData.weekActivities ?? 0)
  const dataDonut = useMemo(() => [
        {name: done <= 1 ? "réalisée" : "réalisées", value: Number(weekData.weekActivities ?? 0)},
        {name: toDo <= 1 ? "restante" : "restantes", value: Number(activityTarget ?? 0) - Number(weekData.weekActivities ?? 0)}
  ], [weekData])

  // HANDLERS //////////////////////////////////////////////////////////////////////////////////
  
  function decalateGraph(slot, type) {
    if(slot === "week") {
      const newEndDate = changePeriod(slot, type, endDistanceDate)
      setEndDistanceDate(newEndDate)
    } else {
      const newEndDate = changePeriod(slot, type, endBpmDate)
      setEndBpmDate(newEndDate)
    }
  }
  if (loadingUser || !user) {
  return (
    <div className="fullPageSpinner">
      <BeatLoader size={15} color="#36d7b7" />
    </div>
    );
  }
  
  // Dans le cas où le token est null en mode API, redirection vers l'authentification
  if (!token && !useMock) {
    return <Navigate to="/" replace />
  }

  return (
        <>
          <section className="runner" aria-label={`Dashboard de ${user.userId}, ${user.totalDistance} kilomètre parcourus`} tabIndex={0} >
            <ProfileBadge picture={user.userPicture} id={user.userId} date={user.memberDate} loadingUser={loadingUser}/>
            <article className="totalDistance">
              <p className="caption">Distance totale parcourue</p>
              <div className="badge">
                <img className="flag" src="flag.png" alt=""></img>
                { loadingUser ? 
                (<div className="flex justify-center">
                  <BeatLoader size={10} color="#36d7b7"/>
                </div>) 
                : <p className="totalDistanceNumber">{user.totalDistance} km</p>}
              </div>
            </article>
          </section>
          <section className='lastPerfo'>
            <h2 className="sectionTitle">Vos dernières performances</h2>
            <div className="graphs">
              <article className="graphBarDistance" aria-label={`Graphique des distances parcourues par ${user.userId} sur 4 semaines`} tabIndex={0}>
                <div className="data">
                  <p className="average">{distanceData.distAverage}km en moyenne</p>
                    <div className="selectDate">
                      <button 
                        className="btnArrow" 
                        aria-label="semaine précédente" 
                        onClick={() => decalateGraph('week', 'previous')}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                      </button>
                      <p>{startDistanceDate.setLocale('fr').toFormat('d LLLL')} - {endDistanceDate.setLocale('fr').toFormat('d LLLL')}</p>
                      <button 
                        className="btnArrow" 
                        aria-label="semaine suivante" 
                        onClick={() => decalateGraph('week')}>
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                      </button>
                    </div>
                </div>
                {isSameDay ? <p className="caption">Total des kilomètres 4 dernières semaines</p> : <p className="caption">Total des kilomètres sur 4 semaines</p>}
                <div className="distanceGraphWrapper"> 
                  <GraphChart data={distanceData.distances} />
                </div>
              </article>
              <article className="graphBarBpm" aria-label={`Graphique du rythme cardiaque de ${user.userId} sur 7 jours`} tabIndex={0}>
                <div className="data">
                  <p className="average">{bpmData.averageBpm} BPM</p>
                    <div className="selectDate">
                      <button 
                        className="btnArrow" 
                        aria-label="jour précédent" 
                        onClick={() => decalateGraph('day', 'previous')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                      </button>
                      <p>{startBpmDate.setLocale('fr').toFormat('d LLLL')} - {endBpmDate.setLocale('fr').toFormat('d LLLL')}</p>
                      <button 
                        className="btnArrow" 
                        aria-label="jour suivant" 
                        onClick={() => decalateGraph('day')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 18l6-6-6-6" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
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
                <article className="donut" aria-label={`Graphique des activités de ${user.userId} cette semaine`} tabIndex={0}>
                  <div className="donutHeader">
                    <p className="realised"><span className="target">x{weekData.weekActivities}</span> sur objectif de {activityTarget}</p>
                    <p className="caption">Courses hebdomadaires réalisées</p>
                  </div>
                  <DonutChart data={dataDonut}/>
                </article>
                <div className="data">
                  <article className="duration" aria-label={`Durée d'activité de ${user.userId} cette semaine`} tabIndex={0}>
                    <p className="label">Durée d'activité</p>
                    <p className="result"><span className="number">{weekData.weekDuration}</span> minutes</p>
                  </article>
                  <article className="distance" aria-label={`Distance parcourue par ${user.userId} cette semaine`} tabIndex={0}>
                    <p className="label">Distance</p>
                    <p className="result"><span className="number">{Math.round(weekData.weekDistance*10)/10}</span> kilomètres</p>
                  </article>
                </div>
              </div>
            </section>
        </>
      )
}