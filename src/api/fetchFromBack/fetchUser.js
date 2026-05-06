import { fetchMockUser } from "../fetchFromMock/fetchMockUser"

export default async function fetchUser(useMock, token) {

    try {
        let result = null
        if(!useMock) {
            result = await fetch("http://localhost:8000/api/user-info", { headers: {Authorization: `Bearer ${token}`} })
        } else {
            result = await fetchMockUser()
        }
        if(result.status !== 200) {
            throw new Error(`Erreur ${result.status}`)
        }
        const data = await result.json()
        
        return data
    }
    catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
          
} 