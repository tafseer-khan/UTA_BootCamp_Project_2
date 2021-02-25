document.addEventListener('DOMContentLoaded', () => {

    fetch('/api/user_data', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        res.json().then(data => {
            const userId = data.id;
            const firstName = data.firstName;
            const name = document.getElementById('first-name');
            name.textContent = 'Hi, ' + firstName + '!';
            fetch(`/api/${userId}/menus`, {
                method: 'GET'
            }).then(res => {
                res.json().then(data => {
                    console.log(data);
                    const menuList = document.getElementById('menus');
                    menuList.innerHTML = '';
                    if (data.length === 0){
                        menuList.innerHTML = 'Please create a menu to get started'
                    }
                    for(let i = 0; i < data.length; i++){
                        let li = document.createElement('li');
                        li.classList.add('card-body');
                        menuList.appendChild(li);

                        let h3 = document.createElement('h3');
                        h3.textContent = data[i].menuName;
                        li.appendChild(h3);

                        let btn = document.createElement('button');
                        btn.classList.add('btn');
                        btn.classList.add('btn-outline-secondary');
                        btn.id = 'edit';
                        btn.setAttribute('data-menu', data[i].menuName)
                        btn.textContent = 'Edit Menu'
                        li.appendChild(btn);
                    }
                })
            })
        });
    });

});


