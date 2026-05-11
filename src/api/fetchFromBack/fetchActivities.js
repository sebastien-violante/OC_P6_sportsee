import { fetchMockActivities } from "../fetchFromMock/fetchMockActivities"

export default async function fetchActivities(useMock, token, startDate, endDate) {
    try {
        if (!useMock && !token) {
            throw new Error("Token manquant")
        }
        
        let result = null
        if(!useMock) {
            result = await fetch(`http://localhost:8000/api/user-activity?startWeek=${startDate}&endWeek=${endDate}`, { headers: {Authorization: `Bearer ${token}`} })
        } else {
            result = await fetchMockActivities()
        }

        if(!result.ok) {
            throw new Error(`Erreur ${result.status}`)
        }
        const data = await result.json()
        console.log(data)
        return data
    }
    catch (error) {
          console.error(
            'Pas de récupération des données',
            error.message
        )

        throw error
    }
} 
   