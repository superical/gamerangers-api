const performPostSuccessLogin = () => {
	document.getElementById('message').innerHTML = ''
	alert('Login successfully!\nWe will bring you back to our homepage now.')
	window.location.href = '/home.html'
}

const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    Authentication.authenticateUser(email, password)
        .then(authData => {
            if(authData.token) {
	            performPostSuccessLogin()
            } else {
                throw new Error('Invalid token.')
            }
        })
        .catch(err => {
            document.getElementById('message').innerHTML = err
        })
})

window.authCallback = authObj => {
    if(authObj.token) {
	    Authentication.saveAuthObjToSession(authObj)
	    performPostSuccessLogin()
    } else {
	    document.getElementById('message').innerHTML = 'Error while signing in through Google.'
    }
}

window.addEventListener('load', function() {
    const sessionAuth = JSON.parse(sessionStorage.getItem('auth'))
    if(sessionAuth) {
        alert('You are already logged in.')
        window.location.href = '/home.html'
    }
	document.querySelector('#googlelogin').addEventListener('click', () => {
		window.open('/api/auth/google')
	})
	document.querySelector('#googlesignup').addEventListener('click', () => {
		window.open('/api/auth/google')
	})
})
function login() {
    
}