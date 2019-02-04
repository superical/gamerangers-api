window.addEventListener('load', function(e) {
	const navMenuLogin = document.querySelector('#navMenuLogin')
	const navMenuLoggedAs = document.querySelector('#navMenuLoggedAs')
	if(Authentication.isAuthenticated()) {
		const loggedAsText = document.querySelector('#loggedAsText')
		Utils.fetchAuthApi(`${Configuration.apiUrl}/users/current`, 'GET')
			.then(res => res.json())
			.then(user => {
				loggedAsText.innerHTML = `Logged in as ${user.data.first_name} ${user.data.last_name}`
				navMenuLogin.style.display = 'none'
				navMenuLoggedAs.style.display = 'block'
			})
			.catch(err => {
				Authentication.logout()
				navMenuLogin.style.display = 'block'
				navMenuLoggedAs.style.display = 'none'
			})
	} else {
		navMenuLogin.style.display = 'block'
		navMenuLoggedAs.style.display = 'none'
	}
})

const logoutLinks = document.querySelectorAll('.logoutLink')
logoutLinks.forEach(logoutLink => {
	logoutLink.addEventListener('click', function(e) {
		e.preventDefault()
		if(confirm('Are you sure you want to logout?')) {
			Authentication.logout()
			alert('You have been logged out.')
			window.location.href = '/login.html'
		}
	})
})
