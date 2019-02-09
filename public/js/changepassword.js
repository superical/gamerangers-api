const changePassword = () => {
    const changePasswordForm = document.querySelector('#changePasswordForm')
    changePasswordForm.addEventListener('submit', function(e) {
        e.preventDefault()
        if(this.elements['password'].value.trim() === '') {
            alert('Please enter a new password before submitting.')
            return
        }
        if(this.elements['password'].value !== this.elements['retypepassword'].value) {
            alert('Please make sure that you retype the same password.')
            return
        } else {
            Utils.fetchAuthApi(`${Configuration.apiUrl}/users/current/password`, 'PUT', {
                password: this.elements['password'].value
            })
                .then(res => res.json())
                .then(resData => {
                    console.log(resData)
                    if(resData.error) throw new Error(resData.error)
                    alert('Password has been changed successfully.')
                    window.location.href = './profile.html'
                })
                .catch(err => alert(err))
        }
    })
}

window.addEventListener('load', function(e) {
    if(Authentication.isAuthenticated())
        changePassword()
    else {
        alert('You will need to login first before accessing this page.')
        window.location.href = './login.html'
    }
})