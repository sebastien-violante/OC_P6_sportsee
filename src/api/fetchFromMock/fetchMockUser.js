import { userMock } from '../mock/user'

/**
 * Simule la réponse d'une api à un fetch de mock/user, avec une réponse en json, un statut et un délai d'attente
 * @returns {Object} - les données user provenant du mock au format json
 */
export function fetchMockUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ok: true,
                status: 200,
                json: async () => userMock
            })
        }, 500)
    })
}