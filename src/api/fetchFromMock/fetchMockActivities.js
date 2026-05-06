import { activitiesMock } from '../mock/activities'

export function fetchMockActivities() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ok: true,
                status: 200,
                json: async () => activitiesMock
            })
        }, 500)
    })
}