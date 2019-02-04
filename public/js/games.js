const retrieveGames = limit => {
    return Utils.fetchApi(`${Configuration.apiUrl}/games`, 'GET')
        .then(res => res.json())
        .then(gameRes => {
            if(gameRes.error) throw new Error(gameRes.error)
            return gameRes.data
        })
}