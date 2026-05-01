import { createContext } from "react"
import { useState, useMemo, useEffect, useContext } from "react"
import { activitiesMock } from "../api/mock/activities"
import { formatBpmOneWeek, formatDistanceFourWeeks } from "../api/services/formatActivities"
import { DateTime } from 'luxon';
import getFirstDayPeriod from "../utils/getFirstDayPeriod";
import changePeriod from "../utils/changePeriod";
import getCurrentWeek from "../utils/getCurrentWeek";
import { dataCurrentWeek } from "../api/services/activitiesService";
import { userMock } from "../api/mock/user";
import { formatUser } from "../api/services/formatUser";
import { AuthContext } from "./AuthContext"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {

    // Récupération du token
    const { token } = useContext(AuthContext)
    
    // Variables permettant de passer du mode mock au mode api
    const [useMock, setUseMock] = useState(true)
    const [loading, setLoading] = useState(true)

    // varaibles de paquets de données
    const [activities, setActivities] = useState([])
    const [user, setUser] = useState([])
    
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

            if (useMock) {
                setActivities(activitiesMock)
                setUser(userMock)
            } else {
                try {
                    const activitiesData = await fetch("/api/activities")
                    const userData = await fetch("/api/user")

                    const activitiesJson = await activitiesData.json()
                    const userJson = await userData.json()

                    setActivities(activitiesJson)
                    setUser(userJson)
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
        if (!activities) return null
        return formatDistanceFourWeeks(endDistancePeriod, activities)
    }, [activities, endDistancePeriod])

    // Données du graphique des bpm
    const lastWeekBpm = useMemo(() => {
        if(!activities) return null
        return formatBpmOneWeek(endBpmPeriod, activities)
    }, [activities, endBpmPeriod]
    )

    // Données du graphique de la semaine
    const { weekActivities, weekDistance, weekDuration } = dataCurrentWeek(weekStart, weekEnd)
    const activityTarget = 6
    const dataDonut = [
        {name: "réalisés", value: weekActivities},
        {name: "restants", value: activityTarget-weekActivities}
    ]

    // Données utilisateur
    const {userId, totalDistance, memberDate, userPicture} = formatUser(user)
    

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

    


    console.log(fourWeeksData)
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
            weekActivities,
            weekDistance,
            weekDuration,
            userId,
            totalDistance,
            memberDate,
            userPicture
        }}>
            {children}
        </DataContext.Provider>
    )
}