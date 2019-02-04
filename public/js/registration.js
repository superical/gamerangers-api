const signupForm = document.querySelector('#signupForm')
signupForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const formElements = e.target.elements
    const formErrors = []
    if(formElements['firstname'].value.trim() === '') {
        formErrors.push('Please enter your first name.')
    }
    if(formElements['lastname'].value.trim() === '') {
        formErrors.push('Please enter your last name.')
    }
    if(formElements['email'].value.trim() === '') {
        formErrors.push('Please enter a valid email address.')
    }
    if(formElements['password'].value.trim() === '') {
        formErrors.push('Please enter a complex password.')
    }
    if(formErrors.length > 0) {
        const errorMessage = formErrors.reduce((prevVal, currentVal) => {
            prevVal += `  - ${currentVal}\n`
            return prevVal
        }, 'There are errors in your form:\n')
        alert(errorMessage)
        return
    }
    const bodyContent = {
        first_name: formElements['firstname'].value.trim(),
        last_name: formElements['lastname'].value.trim(),
        email: formElements['email'].value.trim(),
        password: formElements['password'].value.trim()
    }
    Utils.fetchApi(`${Configuration.apiUrl}/users`, 'POST', bodyContent)
        .then(res => res.json())
        .then(resData => {
            if(resData.error) throw new Error(resData.error)
            return Authentication.authenticateUser(formElements['email'].value.trim(), formElements['password'].value.trim())
                .then(authData => {
                    if(authData.token) {
                        alert('You have registered successfully!\nWe will redirect you to our homepage now.')
                        window.location.href = 'nav.html'
                    } else {
                        throw new Error('Unable to authenticate new account.')
                    }
                })
            
        })
        .catch(err => alert('An error has occurred:\n' + err.message))
})