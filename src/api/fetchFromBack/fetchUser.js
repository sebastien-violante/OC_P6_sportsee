import { fetchMockUser } from "../fetchFromMock/fetchMockUser"

/**
 * Renvoie les données utilisateur provenant de l'API en fonction d'un token et du mode api/mock
 * @param {Boolean} useMock - définit le mode (1: mock, 0: api)
 * @param {String} token - le token de l'utilisateur
 * @returns {Object} - les données d'activité sur la période selon le mode
 */
export default async function fetchUser(useMock, token) {
        // si en mode api il n'y a pas de token, sortie de la fonction
        if (!useMock && !token) {
            throw new Error("Token manquant")
        }
        let result = null
        // requête api ou mock service en fonction de l'état de useMock
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