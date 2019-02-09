const retrieveGames = limit => {
    return Utils.fetchApi(`${Configuration.apiUrl}/games`, 'GET')
        .then(res => res.json())
        .then(gameRes => {
            if(gameRes.error) throw new Error(gameRes.error)
            return gameRes.data
        })
}

const searchGames = (title, developer) => {
    return Utils.fetchApi(`${Configuration.apiUrl}/games?search=true&title=${title}&developer=${developer}`, 'GET')
        .then(res => res.json())
        .then(gameRes => {
            if(gameRes.error) throw new Error(gameRes.error)
            return gameRes.data
        })
}

const retrieveTrendingGames = limit => {
    return Utils.fetchApi(`${Configuration.apiUrl}/games/trending`, 'GET')
        .then(res => res.json())
        .then(gameRes => {
            if(gameRes.error) throw new Error(gameRes.error)
            if(!limit) return gameRes.data
            const resData = []
            gameRes.data.forEach((game, idx) => {
                if(idx < limit) resData.push(game)
            })
            return resData
        })
}