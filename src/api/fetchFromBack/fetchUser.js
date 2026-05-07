import { fetchMockUser } from "../fetchFromMock/fetchMockUser"

export default async function fetchUser(useMock, token) {
    
        let result = null
        if(!useMock) {
            result = await fetch("http://localhost:8000/api/user-info", { headers: {Authorization: `Bearer ${token}`} })
        } else {
            result = await fetchMockUser()
        }

        if (result.status === 401) {
            throw new Error("Identifiants invalides")
        }

        if(result.status !== 200) {
            throw new Error(`Erreur ${result.status}`)
        }

        return await result.json()
              
} 