const updateAuthenticatedOnlyElements = (displayMode = 'flex') => {
	const showOnlyIfLoggedOuts = document.querySelectorAll('.showOnlyIfLoggedOut')
	const showOnlyIfLoggedIns = document.querySelectorAll('.showOnlyIfLoggedIn')
	showOnlyIfLoggedIns.forEach(showOnlyIfLoggedIn => {
		if (Authentication.isAuthenticated()) {
			showOnlyIfLoggedIn.style.display = displayMode
		} else {
			showOnlyIfLoggedIn.style.display = 'none'
		}
	})
	showOnlyIfLoggedOuts.forEach(showOnlyIfLoggedOut => {
		if (!Authentication.isAuthenticated()) {
			showOnlyIfLoggedOut.style.display = displayMode
		} else {
			showOnlyIfLoggedOut.style.display = 'none'
		}
	})
}

const updateAuthenticatedAdminOnlyElements = (displayMode = 'flex') => {
	const showOnlyIfAdmins = document.querySelectorAll('.showOnlyIfAdmin')
	showOnlyIfAdmins.forEach(showOnlyIfAdmin => {
		if (Authentication.isAuthenticated() && Authentication.getAuthInfo().isAdmin === true) {
			showOnlyIfAdmin.style.display = displayMode
		} else {
			showOnlyIfAdmin.style.display = 'none'
		}
	})
}

const updateNavBarActiveItems = () => {
	const url = window.location.pathname
	const currentFilenameInPath = url.substring(url.lastIndexOf('/') + 1)
	const navItems = document.querySelectorAll('.nav-item')
	navItems.forEach(navItem => {
		if (navItem.dataset.page) {
			const pageNames = navItem.dataset.page.split('|')
			if (pageNames.length > 0) {
				if (pageNames.indexOf(currentFilenameInPath) !== -1) {
					navItem.className += ' active'
				}
			}
		}
	})
}

window.addEventListener('load', function (e) {
	const navMenuLogin = document.querySelector('#navMenuLogin')
	const navMenuLoggedAs = document.querySelector('#navMenuLoggedAs')
	if (Authentication.isAuthenticated()) {
		const loggedAsText = document.querySelector('#loggedAsText')
		Utils.fetchAuthApi(`${Configuration.apiUrl}/users/current`, 'GET')
			.then(res => res.json())
			.then(user => {
				loggedAsText.innerHTML = `Logged in as ${user.data.first_name} ${user.data.last_name}`
				if (Authentication.getAuthInfo().isAdmin === true)
					loggedAsText.innerHTML += ' [ADMINISTRATOR]'
				updateAuthenticatedOnlyElements()
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
	updateAuthenticatedAdminOnlyElements()
	updateNavBarActiveItems()
})

const logoutLinks = document.querySelectorAll('.logoutLink')
logoutLinks.forEach(logoutLink => {
	logoutLink.addEventListener('click', function (e) {
		e.preventDefault()
		if (confirm('Are you sure you want to logout?')) {
			Authentication.logout()
			alert('You have been logged out.')
			window.location.href = '/login.html'
		}
	})
})


const standardErrorDisplay = (errMessage, contentContainer) => {
	contentContainer.innerHTML = `<div class="col-sm-12">${errMessage}</div>`
}