import { DateTime } from 'luxon';
import { userMock } from "../mock/user";

export function getUser() {
    
  const userId = userMock[0].profile.firstName+' '+userMock[0].profile.lastName
  const memberDate = DateTime.fromISO(userMock[0].profile.createdAt)
  const slicedUrl = (userMock[0].profile.profilePicture).split('/')
  const userPicture = slicedUrl[slicedUrl.length-1]
  const totalDistance = Math.floor(userMock[0].statistics.totalDistance)
    return {userId, memberDate, totalDistance, userPicture}
}