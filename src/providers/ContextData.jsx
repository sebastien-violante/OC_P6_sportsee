import { createContext } from "react"
import { useState, useEffect } from "react"
import { formatUser } from "../api/services/formatUser";
import fetchUser from "../api/fetchFromBack/fetchUser";
import { DateTime } from "luxon";
import { Cookies } from "react-cookie";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {

    // Variables permettant de passer du mode mock au mode api
    const [useMock, setUseMock] = useState(false)
    const cookies = new Cookies()
    const token = cookies.get("token")
    const [loadingUser, setLoadingUser] = useState(true)

    const [user, setUser] = useState(null)
    
    // Aiguillage entre mode mock et mode api
    useEffect(() => {
        async function fetchData() {
            try {
                if(!token && !useMock) {
                    setLoadingUser(false)
                    return
                }
                const userData = await fetchUser(useMock, token)
                setUser(userData)
            } catch(error) {
                console.log(error)
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