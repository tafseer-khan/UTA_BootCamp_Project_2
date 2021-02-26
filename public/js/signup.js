document.addEventListener('DOMContentLoaded', () => {
    // Once submit is clicked on signup form then all user information is grabbed
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('newEmail').value.trim();
        const password = document.getElementById('newPassword').value.trim();
        
        // object for new User is created with grabbed information
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        console.log(newUser);
        // Posts the new User information into our database
        fetch('/api/createUser', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => {
            loginUser(newUser.email, newUser.password);
        })
    })
    // Login function which will post that we have logged in once signing up
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
        // Once we are logged in then we are relocated to the user Home
            .then(function (res) {
                window.location.replace('../userHome.html');
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
            })
    }
});

