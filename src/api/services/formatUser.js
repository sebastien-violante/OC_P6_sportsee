import { DateTime } from "luxon"

export function formatUser(user, useMock) {

  const userId = `${user.profile.firstName} ${user.profile.lastName}`
  const memberDate = DateTime.fromISO(user.profile.createdAt)
  const userPicture = useMock ? user.profile.profilePicture.split('/').pop() : user.profile.profilePicture
  const totalDistance = Math.floor(Number(user.statistics.totalDistance))
  const age = user.profile.age
  const weight = user.profile.weight
  // Formatage de la hauteur en prenant en compte les hauteurs de moins d'un mètre
  let tempHeight = user.profile.height.toString()
  if(tempHeight.length === 2) tempHeight = '0'+tempHeight
  const height = tempHeight[0]+'m'+tempHeight.substring(1,3)
  // formatage du temps total d'activité
  const totalDurationHrs = Math.floor(user.statistics.totalDuration/60).toString()+'h'
  const totalDurationMin = (user.statistics.totalDuration%60).toString()+'min'
  const totalSessions = user.statistics.totalSessions
  
  return { userId, memberDate, totalDistance, userPicture, age, weight, height, totalDurationHrs, totalDurationMin, totalSessions }
}