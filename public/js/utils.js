const fetchApi = (url, method, bodyContent, additionalHeaders={}) => {
    const req = new XMLHttpRequest()
	req.open(method, url)
    let hasContentType = false
    Object.keys(additionalHeaders).forEach(headerName => {
        if(headerName === 'Content-Type') hasContentType = true
	    req.setRequestHeader(headerName, additionalHeaders[headerName])
    })
    if(!hasContentType) req.setRequestHeader('Content-Type', 'application/json')
    const promise = new Promise(function(outerResolve) {
        const resObj = new Object()
        resObj.json = function() {
	        return new Promise(function(innerResolve) {
	            req.onload = function() {
		            innerResolve(JSON.parse(req.response))
	            }
	        })
        }
        outerResolve(resObj)
    })
    req.send(JSON.stringify(bodyContent))
    return promise
}

const fetchAuthApi = (url, method, bodyContent, additionalHeaders={}) => {
    return fetchApi(url, method, bodyContent, {
        'Authorization': 'Bearer ' + Authentication.getAuthInfo().token,
        ...additionalHeaders
    })
}

const Utils = {
    fetchApi,
    fetchAuthApi
}