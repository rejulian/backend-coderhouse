const email = document.getElementById('email');
const password = document.getElementById('password');

const loginUser = (e) => {
    e.preventDefault();
    const user = {
        email: email.value,
        password: password.value
    }

    fetch('http://localhost:8080/api/session/login',{
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then(()=>console.log('login successful'))
    .catch((err)=>console.log(err))
}