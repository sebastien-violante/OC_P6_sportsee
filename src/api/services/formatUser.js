import { DateTime } from 'luxon';
 
export function formatUser(user) {
  
    if(!user || !user[0]) {
      return {
        userId: "",
        memberDate: null,
        totalDistance: 0,
        userPicture: ""
      }
    }
    const userId = user[0].profile.firstName+' '+user[0].profile.lastName
    const memberDate = DateTime.fromISO(user[0].profile.createdAt)
    const slicedUrl = (user[0].profile.profilePicture).split('/')
    const userPicture = slicedUrl[slicedUrl.length-1]
    const totalDistance = Math.floor(user[0].statistics.totalDistance)
  
  return {userId, memberDate, totalDistance, userPicture}
  
  
  
}