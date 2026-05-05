import { DateTime } from 'luxon';
import GraphChart from '../components/GraphChart/GraphChart';
import DonutChart  from '../components/DonutChart/DonutChart'
import { useContext } from 'react'
import { DataContext } from '../providers/ContextData';
import ProfileBadge from '../components/ProfileBadge/ProfileBadge';

export default  function Dashboard() {

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
    userPicture
  } = useContext(DataContext)

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
              <p className="average">{fourWeeksData.distAverage}km en moyenne</p>
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
              <p className="average">{lastWeekBpm.averageBpm} BPM</p>
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
              <GraphChart data={lastWeekBpm.bpmPerDay} />
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