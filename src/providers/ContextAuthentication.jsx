import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

function getCookie(name) {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1]
}

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString()
    document.cookie = `${name}=${value}; expires=${expires}; path=/`
}

function deleteCookie(name) {
    document.cookie = `${name}=; Max-Age=0; path=/`
}

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)

    useEffect(() => {
        const cookieToken = getCookie("token")
        setToken(cookieToken || null)
    }, [])

    function login(fakeToken) {
        setCookie("token", fakeToken, 1)
        setToken(fakeToken)
    }

    function logout() {
        deleteCookie("token")
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}