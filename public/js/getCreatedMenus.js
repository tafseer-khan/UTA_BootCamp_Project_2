document.addEventListener('DOMContentLoaded', () => {
    // Gets Our User Data
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
                    const qrList = document.getElementById('qr-list');
                    qrList.innerHTML = '';
                    menuList.innerHTML = '';
                    // If there are no menus a message requesting to create a menu will be displayed
                    if (data.length === 0){
                        menuList.innerHTML = 'Please create a menu to get started'
                    }
                    // Will add each of our Menus to the page
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
                        // Adds qr Codes to the page
                        let qrLI = document.createElement('li');
                        qrList.appendChild(qrLI);
                        qrLI.style.listStyleType = 'none';


                        let qrName = document.createElement('h3');
                        qrLI.appendChild(qrName);
                        qrName.textContent = data[i].menuName;

                        let qrCode = document.createElement('div');
                        qrLI.appendChild(qrCode);
                        qrCode.classList.add('qr-code');
                        qrCode.innerHTML = data[i].qr;




                    }
                })
            })
        });
    });

});


