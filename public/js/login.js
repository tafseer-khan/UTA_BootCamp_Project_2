document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userData = {
            username: document.getElementById('username'),
            password: document.getElementById('password')
        }

        if (!userData.username || !userData.password) {
            return;
        }

        loginUser(userData.username, userData.password);
        username.val("");
        passwordInput.val("");
    });

    function loginUser(username, password) {
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {     
                username: username,
                password: password
            }
        }).then((res) => {
            res.redirect('/menu');
        }).catch((err) => {
            console.log(err);
        })
    }
})