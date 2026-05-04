export default async function fetchActivities(token, startDate, endDate) {
    try {
        const result = await fetch(`http://localhost:8000/api/user-activity?startWeek=${startDate}&endWeek=${endDate}`, { headers: {Authorization: `Bearer ${token}`} })
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
   