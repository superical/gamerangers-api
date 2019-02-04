const isAuthenticated = () => {
    const auth = sessionStorage.getItem('auth')
    if(!auth) return false
    const authJson = JSON.parse(auth)
    if(typeof authJson.token !== "undefined") return true
    return false
}

const getAuthInfo = () => {
    if(!isAuthenticated()) return false
    return JSON.parse(sessionStorage.getItem('auth'))
}

const saveAuthObjToSession = authObj => sessionStorage.setItem('auth', JSON.stringify(authObj))

const logout = () => sessionStorage.removeItem('auth')

const authenticateUser = (email, password) => {
    const bodyContent = {
        email: email,
        password: password
    }
    return fetch(`${Configuration.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyContent)
    })
    .then(res => res.json())
    .then(data => {
        if(data.error) throw new Error(data.error)
        saveAuthObjToSession(data.authentication)
        return data.authentication
    })
}

const Authentication = {
    isAuthenticated,
    getAuthInfo,
    authenticateUser,
	saveAuthObjToSession,
    logout
}