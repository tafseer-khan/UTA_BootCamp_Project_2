document.addEventListener('DOMContentLoaded', () => {
    // Once page is loaded we are able to log in
    const loginForm = document.getElementById('login');
    // On submit will verify login 
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('login btn clkd')
        // Creates object for user data which will get the inputed values for email and password
        const userData = {
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value.trim()
        }

        console.log(userData);
        // Checks to see if email and password exist
        if (!userData.email || !userData.password) {
            return;
        }
        // logs in user and clears form
        loginUser(userData.email, userData.password);
        email.value = "";
        password.value = "";
    });
    // Posts that we have logged in, if given correct credentials
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
                    if(res.status === 200){
                        window.location.replace('./userHome.html')
                    }
                });
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
            })
    }

})