import { fourWeeksDistances, lastWeekBpm } from '../api/services/activitiesService';
import { useState } from 'react';
import { DateTime } from 'luxon';
import getFirstDayPeriod from '../utils/getFirstDayPeriod';
import GraphChart from '../components/GraphChart/GraphChart';

export default function Dashboard() {

  const today = DateTime.now()

  // Constantes de dates du graphique distances
  const [endDistancePeriod, setEndDistancePeriod] = useState(today)
  const beginDistancePeriod = getFirstDayPeriod(endDistancePeriod, "week")
  
  // Contantes dates du graphique bpm
  const [endBpmPeriod, setEndBpmPeriod] = useState(today)
  const beginBpmPeriod = getFirstDayPeriod(endBpmPeriod, "day")

  const [bpmIndexDate, setBpmIndexDate] = useState(today)

  // Récupération des données depuis les services
  const data = fourWeeksDistances(endDistancePeriod)
  const averageDistance = data.distAverage
  const activities = data.distances
  const bpm = lastWeekBpm(endBpmPeriod)
  const averageBpm = bpm.averageBpm
  const bpmPerDay = bpm.bpmPerDay

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
      <section className='lastPerfo'>
        <h2>Vos dernières performances</h2>
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
    </>
  )
}