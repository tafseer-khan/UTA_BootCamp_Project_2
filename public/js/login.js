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
        
        fetch('/api/login', {
            method: 'POST',headers: {
                'Content-Type': 'application/json',
            },
            body: {
                email: email,
                password: password
            }
        }).then(res => {
            console.log(res);
        });
    }
})