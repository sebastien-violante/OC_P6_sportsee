import { DateTime } from "luxon"

export function formatUser(user, useMock) {

  if (!user || !user.profile) {
    return {
      userId: "",
      memberDate: null,
      totalDistance: 0,
      userPicture: "defaultUser.jpeg"
    }
  }

  const userId = `${user.profile.firstName} ${user.profile.lastName}`
  const memberDate = DateTime.fromISO(user.profile.createdAt)

  const userPicture = useMock ? user.profile.profilePicture.split('/').pop() : user.profile.profilePicture
  console.log(user)
  const totalDistance = Math.floor(Number(user.statistics.totalDistance))

  return { userId, memberDate, totalDistance, userPicture }
}