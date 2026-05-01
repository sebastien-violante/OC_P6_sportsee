export async function fetchActivities(token) {
    return fetch("/api/activities", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(r => r.json())
}