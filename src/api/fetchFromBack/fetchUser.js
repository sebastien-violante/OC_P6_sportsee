export default async function fetchUser(token) {

    try {
        const result = await fetch("http://localhost:8000/api/user-info", { headers: {Authorization: `Bearer ${token}`} })
        if(result.status !== 200) {
            throw new Error(`Erreur ${result.status}`)
        }
        const data = await result.json()
        console.log(data)
        return data
    }
    catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
          
} 