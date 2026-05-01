import { DateTime } from 'luxon';
import { userMock } from "../mock/user";
 
export function formatUser(user) {
     
   const userId = userMock[0].profile.firstName+' '+user[0].profile.lastName
   const memberDate = DateTime.fromISO(user[0].profile.createdAt)
   const slicedUrl = (user[0].profile.profilePicture).split('/')
   const userPicture = slicedUrl[slicedUrl.length-1]
   const totalDistance = Math.floor(user[0].statistics.totalDistance)
    
   return {userId, memberDate, totalDistance, userPicture}
 }