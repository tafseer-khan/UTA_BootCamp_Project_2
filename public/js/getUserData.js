
let user;

fetch('/api/user_data', {
    method: 'GET',
    headers: {
        "Content-Type": "application/json"
    }
}).then(res => {
    res.json().then(data => {
        id = data.id;
        email = data.email;
        user = {
            id: id,
            email: email
        };

    });
})


