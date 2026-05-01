import { createContext } from "react"
import { useState, useMemo } from "react"
import { activitiesMock } from "../api/mock/activities"
import { formatDistanceFourWeeks } from "../api/services/formatActivities"
import { DateTime } from 'luxon';
import getFirstDayPeriod from "../utils/getFirstDayPeriod";
import changePeriod from "../utils/changePeriod";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {

    const [useMock, setUseMock] = useState(true)
    
    const today = DateTime.fromISO("2026-02-05")

    const [endDistancePeriod, setEndDistancePeriod] = useState(today)
    const beginDistancePeriod = getFirstDayPeriod(endDistancePeriod, "week")

    const [endBpmPeriod, setEndBpmPeriod] = useState(today)
    const beginBpmPeriod = getFirstDayPeriod(endBpmPeriod, "day")

    const toggleUseMock = () => {
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

    const activities = useMock ? activitiesMock : []; 
    const fourWeeksData = useMemo(() => {
        if (!activities) return null;
        return formatDistanceFourWeeks(endDistancePeriod, activities);
    }, [activities, endDistancePeriod]);


    console.log(fourWeeksData)
    return (
        <DataContext.Provider value={{
            fourWeeksData,
            toggleUseMock,
            useMock,
            decalateDistanceGraph,
            decalateBpmGraph,
            endDistancePeriod,
            beginDistancePeriod,
            endBpmPeriod,
            beginBpmPeriod
        }}>
            {children}
        </DataContext.Provider>
    )
}