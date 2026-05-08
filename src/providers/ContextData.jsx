import { createContext } from "react"
import { useState, useEffect } from "react"
import { formatUser } from "../api/services/formatUser";
import fetchUser from "../api/fetchFromBack/fetchUser";
import fetchActivities from "../api/fetchFromBack/fetchActivities";
import { DateTime } from "luxon";
import { Cookies } from "react-cookie";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {

    // Variables permettant de passer du mode mock au mode api
    const [useMock, setUseMock] = useState(false)
    const cookies = new Cookies()
    const token = cookies.get("token")
    if(!token && !useMock) return
    const [user, setUser] = useState(null)
    const [globalActivities, setGlobalActivities] = useState(null)
    
    //const token = sessionStorage.getItem('token')
    const today = DateTime.now()
    
    // Aiguillage entre mode mock et mode api
    useEffect(() => {
        async function fetchData() {
            // vidage de user et activities pour éviter de garfder en mémoire les données de l'autre mode
            const userData = await fetchUser(useMock, token)
            setUser(userData)
        }
        fetchData()
    }, [useMock, token])

    // Données utilisateur
    const formattedUser = user ? formatUser(user, useMock) : {
        userId: "", 
        memberDate: null, 
        totalDistance: 0, 
        userPicture: "defaultUser.jpg", 
        age: "", 
        weight:"",
        totalDurationHrs: "0h",
        totalDurationMin:'0min'
    }
    const {userId, totalDistance, memberDate, userPicture, age, weight, height, totalDurationHrs, totalDurationMin, totalSessions} = formattedUser
    
    function toggleUseMock() {
        setUseMock(prev => !prev)
    }
    
    return (
        <DataContext.Provider value={{
           // lastWeekBpm,
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