const userRegister = document.querySelector('form')
const input1 = document.querySelector('#username')
const input2 = document.querySelector('#email')
const input3 = document.querySelector('#password')

userRegister.addEventListener('submit', (e) => {
    e.preventDefault()
    const username = input1.value
    const email = input2.value
    const password = input3.value

    params = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            name: username,
            email,
            password
        })
    }
    fetch('/users', params).then((response) => {
        if(!response.ok){
            alert('Password must be greater than 6 characters')
        } else {
            location.href = "/dashboard"
        }
        return response.json()
    }).then((data) => {
        console.log('User Successfully Registered');
    })
})