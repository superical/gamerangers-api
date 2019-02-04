const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    Authentication.authenticateUser(email, password)
        .then(authData => {
            if(authData.token) {
                document.getElementById('message').innerHTML = ''
                alert('Login successfully!\nWe will bring you back to our homepage now.')
                window.location.href = 'nav.html'
            } else {
                throw new Error('Invalid token.')
            }
        })
        .catch(err => {
            document.getElementById('message').innerHTML = err
        })
})

window.addEventListener('load', function() {
    const sessionAuth = JSON.parse(sessionStorage.getItem('auth'))
    if(sessionAuth) {
        alert('You are already logged in.')
        window.location.href = 'nav.html'
    }
})
function login() {
    
}