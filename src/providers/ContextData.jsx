import { createContext, useState, useEffect} from "react"
import { formatUser } from "../api/services/formatUser";
import fetchUser from "../api/fetchFromBack/fetchUser";
import { DateTime } from "luxon";
import { useCookies } from "react-cookie";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {

    // Variables permettant de passer du mode mock au mode api
    const [useMock, setUseMock] = useState(false)
    // Récupération du token en cookies
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;
    // Variable indiquant l'état de chargement de des données user
    const [loadingUser, setLoadingUser] = useState(true)

    const [user, setUser] = useState(null)
    
    // Aiguillage entre mode mock et mode api
    useEffect(() => {
        async function fetchData() {
            setLoadingUser(true)
            try {
                if(!token && !useMock) {
                    setUser(null);
                    return
                } else {
                    const userData = await fetchUser(useMock, token)
                    setUser(userData) 
                }
             
            } catch(error) {
                console.log(error)
                setUser(null)
            } finally {
                setLoadingUser(false)
            }
        }
        fetchData()
    }, [useMock, token])

    // Données utilisateur
    const formattedUser = user ? formatUser(user, useMock) : {
        userId: "Anonyme", 
        memberDate: null, 
        totalDistance: 0, 
        userPicture: "defaultUser.jpg", 
        age: "--", 
        weight:"--",
        height:"--",
        totalDurationHrs: "0h",
        totalDurationMin:'0min',
        totalSessions: 0
    }
    const {userId, totalDistance, memberDate, userPicture, age, weight, height, totalDurationHrs, totalDurationMin, totalSessions} = formattedUser
    
    function toggleUseMock() {
        setUseMock(prev => !prev)
    }
    
    return (
        <DataContext.Provider value={{
            loadingUser,
            setUser,
            toggleUseMock,
            useMock,
            userId,
            totalDistance,
            memberDate,
            userPicture,
            age,
            weight,
            height,
            totalDurationHrs,
            totalDurationMin,
            totalSessions,
        }}
        >
            {children}
        </DataContext.Provider>
    )
}