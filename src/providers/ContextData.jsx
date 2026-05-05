import { createContext } from "react"
import { useState, useMemo, useEffect, useContext } from "react"
import { activitiesMock } from "../api/mock/activities"
import { formatBpmOneWeek, formatDistanceFourWeeks } from "../api/services/formatActivities"
import { DateTime } from 'luxon';
import getFirstDayPeriod from "../utils/getFirstDayPeriod";
import changePeriod from "../utils/changePeriod";
import getCurrentWeek from "../utils/getCurrentWeek";
import { formatCurrentWeekActivities } from "../api/services/formatActivities";
import { userMock } from "../api/mock/user";
import { formatUser } from "../api/services/formatUser";
import fetchUser from "../api/fetchFromBack/fetchUser";
import fetchActivities from "../api/fetchFromBack/fetchActivities";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {

    // Récupération du token
    //const { token } = useContext(AuthContext)
    
    // Variables permettant de passer du mode mock au mode api
    const [useMock, setUseMock] = useState(false)
    const [loading, setLoading] = useState(true)

    // varaibles de paquets de données
    const [activities, setActivities] = useState(null)
    const [user, setUser] = useState(null)
  
    // Initialisation de la date du jour pour base de départ des données
    const today = DateTime.fromISO("2026-02-05")

    // Début et fin de période du graphique des distances et bpm
    const [endDistancePeriod, setEndDistancePeriod] = useState(today)
    const beginDistancePeriod = getFirstDayPeriod(endDistancePeriod, "week")
    const [endBpmPeriod, setEndBpmPeriod] = useState(today)
    const beginBpmPeriod = getFirstDayPeriod(endBpmPeriod, "day")
    const {weekStart, weekEnd} = getCurrentWeek(today)

    // Aiguillage entre mode mock et mode api
    
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            // vidage de user et activities pour éviter de garfder en mémoire les données de l'autre mode
            setActivities(null)
            setUser(null)
            
            if (useMock) {
                setActivities(activitiesMock)
                setUser(userMock)
            } else {
                try {
                    // récupération token
                    const token = sessionStorage.getItem("token")
                    if(token) {
                        // fetch des données user et placement en context
                        const userData = await fetchUser(token)
                        setUser(userData)
                        // récupération de la date membre comme startDate et définition de la endDate pour borner le fetch des activités
                        const startDate = userData.profile.createdAt
                        const endDate = new Date().toISOString().split('T')[0];
                        const activitiesData = await fetchActivities(token, startDate, endDate)
                        setActivities(activitiesData)
                    }
                } catch (error) {
                    console.error("Erreur API :", error)
                }
            }   
            setLoading(false)
        }
        fetchData()
    }, [useMock])

    // Données du graphique de distances
    const fourWeeksData = useMemo(() => {
        return formatDistanceFourWeeks(endDistancePeriod, activities)
    }, [activities, endDistancePeriod])

    // Données du graphique des bpm
    const lastWeekBpm = useMemo(() => {
        return formatBpmOneWeek(endBpmPeriod, activities)
    }, [activities, endBpmPeriod]
    )

    // Données du graphique de la semaine
    const weekData = activities ? formatCurrentWeekActivities(weekStart, weekEnd, activities) : {
        weekActivities: 0,
        weekDistance: 0,
        weekDuration: 0
    }

    const activityTarget = 6
    const dataDonut = [
        {name: "réalisés", value: weekData.weekActivities},
        {name: "restants", value: activityTarget-weekData.weekActivities}
    ]

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
    const {userId, totalDistance, memberDate, userPicture, age, weight, height, totalDurationHrs, totalDurationMin, totalSessions} = formattedUser ?? {}
       
    

    function toggleUseMock() {
        setUseMock(prev => !prev)
    }

    function decalateDistanceGraph(slot, type) {
        const newEndDate = changePeriod(slot, type, endDistancePeriod)
        setEndDistancePeriod(newEndDate)
    }

    function decalateBpmGraph(slot, type) {
        const newEndDate = changePeriod(slot, type, endBpmPeriod)
        setEndBpmPeriod(newEndDate)
    }

    
    return (
        <DataContext.Provider value={{
            fourWeeksData,
            lastWeekBpm,
            toggleUseMock,
            useMock,
            decalateDistanceGraph,
            decalateBpmGraph,
            endDistancePeriod,
            beginDistancePeriod,
            endBpmPeriod,
            beginBpmPeriod,
            weekStart,
            weekEnd,
            activityTarget,
            dataDonut,
            weekActivities: weekData.weekActivities,
            weekDistance : weekData.weekDistance,
            weekDuration: weekData.weekDuration,
            userId,
            totalDistance,
            memberDate: memberDate ?? null,
            userPicture,
            age,
            weight,
            height,
            totalDurationHrs,
            totalDurationMin,
            totalSessions
        }}>
            {children}
        </DataContext.Provider>
    )
}