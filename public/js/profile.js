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

	        const profileFirstNameInput = document.querySelector('#profileFirstNameInput')
	        const profileLastNameInput = document.querySelector('#profileLastNameInput')
	        const profileEmailInput = document.querySelector('#profileEmailInput')
	        profileFirstNameInput.value = userData.first_name
	        profileLastNameInput.value = userData.last_name
	        profileEmailInput.value = userData.email
        })
}

const initUpdateProfileInfoForm = () => {
	const updateProfileInfoForm = document.querySelector('#updateProfileInfoForm')
	updateProfileInfoForm.addEventListener('submit', function(e) {
		e.preventDefault()
	    if(
	        this.elements['profileFirstNameInput'].value.trim() === '' ||
	        this.elements['profileLastNameInput'].value.trim() === '' ||
	        this.elements['profileEmailInput'].value.trim() === ''
        ) {
	        alert('You should not have any empty fields for profile information.')
            return
        }
		Utils.fetchAuthApi(`${Configuration.apiUrl}/users/${Authentication.getAuthInfo().id}`, 'PATCH', {
			first_name: this.elements['profileFirstNameInput'].value,
			last_name: this.elements['profileLastNameInput'].value,
			email: this.elements['profileEmailInput'].value
		})
			.then(res => res.json())
            .then(resData => {
                if(resData.error) throw new Error(resData.error)
                alert('Profile updated successfully!')
	            $('#updateProfileModalBox').modal('hide')
	            window.location.reload()
            })
            .catch(err => alert(`An error has occurred:\n${err.message}`))
    })
}

window.addEventListener('load', function(e) {
    if(!Authentication.isAuthenticated()) {
        alert('You are not logged in to view this page.\nRedirecting you to login page now...')
        window.location.href = './login.html'
    } else {
        document.querySelector('#profileContainer').style.display = 'flex'
        getCurrentUserInfo()
	    initUpdateProfileInfoForm()
    }
})