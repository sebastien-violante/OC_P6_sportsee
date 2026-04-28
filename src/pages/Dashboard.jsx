import { distanceOverFourWeeks } from '../api/services/activitiesService';
import Distance from '../components/Distance/Distance';

export default function Dashboard() {

  const data = distanceOverFourWeeks()
  const activities = data.activities 
  const averageDistance = data.averageDistance
  
  return (
    <>
    <h2>Vos dernières performances</h2>
    <Distance averageDistance={averageDistance} activities={activities} />
    </>
    )
}