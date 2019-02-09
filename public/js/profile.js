const getCurrentUserInfo = () => {
    Utils.fetchAuthApi(`${Configuration.apiUrl}/users/current`, 'GET')
        .then(res => res.json())
        .then(resData => {
            if(resData.error) throw new Error(resData.error)
            const userData = resData.data
            const profileName = document.querySelector('#profileName')
            const profileEmail = document.querySelector('#profileEmail')
            const profileIsAdmin = document.querySelector('#profileIsAdmin')
            profileName.innerHTML = userData.first_name + ' ' + userData.last_name
            profileEmail.innerHTML = userData.email
            if(userData.isAdmin === true)
                profileIsAdmin.innerHTML = 'Yes, user is an administrator.'
            else
                profileIsAdmin.innerHTML = 'No, user is just a normal member.'
        })
}

window.addEventListener('load', function(e) {
    if(!Authentication.isAuthenticated()) {
        alert('You are not logged in to view this page.\nRedirecting you to login page now...')
        window.location.href = './login.html'
    } else {
        document.querySelector('#profileContainer').style.display = 'flex'
        getCurrentUserInfo()
    }
})