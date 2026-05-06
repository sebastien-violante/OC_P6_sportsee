import { fetchMockActivities } from "../fetchFromMock/fetchMockActivities"

export default async function fetchActivities(useMock, token, startDate, endDate) {
    try {
        let result = null
        if(!useMock) {
            result = await fetch(`http://localhost:8000/api/user-activity?startWeek=${startDate}&endWeek=${endDate}`, { headers: {Authorization: `Bearer ${token}`} })
        } else {
            result = await fetchMockActivities()
        }

        if(result.status !== 200) {
            throw new Error(`Erreur ${result.status}`)
        }
        const data = await result.json()

        return data
    }
    catch (error) {
          console.error('Erreur lors de la récupération des activités :', error);
    }
} 
   