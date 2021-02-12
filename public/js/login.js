document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('login btn clkd')

        const userData = {
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value.trim()
        }

        console.log(userData);

        if (!userData.email || !userData.password) {
            return;
        }

        loginUser(userData.email, userData.password);
        email.value = "";
        password.value = "";
    });

    function loginUser(email, password) {
        console.log(email, password);

        fetch("/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:
                JSON.stringify(
                    {
                        email: email,
                        password: password

                    }
                )
        })
            .then(function () {
                fetch('/login', {
                    method: 'GET'
                }).then(res => {
                    location.reload();
                });
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
            })
    }

})