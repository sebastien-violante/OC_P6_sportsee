import { userMock } from '../mock/user'

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