import { fourWeeksDistances, lastWeekBpm } from '../api/services/activitiesService';
import { useState } from 'react';
import { DateTime } from 'luxon';
import Distance from '../components/Distance/Distance';
import Bpm from '../components/Bpm/Bpm';
import getFirstDayPeriod from '../utils/getFirstDayPeriod';
import GraphChart from '../components/GraphChart/GraphChart';

export default function Dashboard() {

  const today = DateTime.now()
  // constantes permettant de faire varier l'affichage des différents graphiques
  const [endDistancePeriod, setEndDistancePeriod] = useState(today)
  const beginDistancePeriod = getFirstDayPeriod(endDistancePeriod, "week")
  
  const [endBpmPeriod, setEndBpmPeriod] = useState(today)
  const beginBpmPeriod = getFirstDayPeriod(endBpmPeriod, "day")
  const [bpmIndexDate, setBpmIndexDate] = useState(today)

  // Récupération des données depuis les services
  const data = fourWeeksDistances(endDistancePeriod)
  const averageDistance = data.distAverage
  const activities = data.distances
  const bpm = lastWeekBpm(bpmIndexDate)
  console.log(data)
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
    <h2>Vos dernières performances</h2>
      <section className="distanceBanner">
        <div className="data">
          <p className="average">{averageDistance}km en moyenne</p>
            <div className="selectDate">
              <img src="leftArrow.png" alt="période précédente" className="arrow" onClick={() => changePeriod('week','previous')}></img>
              <p>{beginDistancePeriod.setLocale('fr').toFormat('d LLLL')} - {endDistancePeriod.setLocale('fr').toFormat('d LLLL')}</p>
              <img src="rightArrow.png" alt="période suivante" className="arrow" onClick={() => changePeriod('week')}></img>
            </div>
        </div>
        <p className="caption">Total des kilomètres 4 dernières semaines</p> 
      </section>
      <GraphChart data={activities} />

      <section className="bpmBanner">
        <div className="data">
          <p className="average">{averageDistance}km en moyenne</p>
            <div className="selectDate">
              <img src="leftArrow.png" alt="période précédente" className="arrow" onClick={() => changePeriod('day','previous')}></img>
              <p>{beginBpmPeriod.setLocale('fr').toFormat('d LLLL')} - {endBpmPeriod.setLocale('fr').toFormat('d LLLL')}</p>
              <img src="rightArrow.png" alt="période suivante" className="arrow" onClick={() => changePeriod('day')}></img>
            </div>
        </div>
        <p className="caption">Total des kilomètres 4 dernières semaines</p> 
      </section>
      <GraphChart data={bpm} />
    </>
  )
}