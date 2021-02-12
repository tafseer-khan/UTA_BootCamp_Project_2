document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('newEmail').value.trim();
        const password = document.getElementById('newPassword').value.trim();

        const newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        console.log(newUser);

        fetch('/api/createUser', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => {
            console.log(res);
        })
    })
});