const fetchApi = (url, method, bodyContent, additionalHeaders) => {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...additionalHeaders
        },
        body: JSON.stringify(bodyContent)
    })
}

const fetchAuthApi = (url, method, bodyContent, additionalHeaders) => {
    return fetchApi(url, method, bodyContent, {
        'Authorization': 'Bearer ' + Authentication.getAuthInfo().token
    })
}

const Utils = {
    fetchApi,
    fetchAuthApi
}