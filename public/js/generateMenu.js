document.addEventListener('DOMContentLoaded', () => {
    let url = window.location.href;
    url = url.split('/');
    console.log();
    let menuId = url[url.length - 1];
    menuId = menuId[0];
    console.log(menuId);
    fetch(`/api/menus/${menuId}/menuItems`, {
        method: 'GET'
    }).then(res => {
        res.json().then(data => {
            console.log(data)
            const appList = document.getElementById('apps-list');
            appList.innerHTML = '';
            const breakList = document.getElementById('break-list');
            breakList.innerHTML = '';
            const lunchList = document.getElementById('lunch-list');
            lunchList.innerHTML = '';
            const dinnerList = document.getElementById('dinner-list');
            dinnerList.innerHTML = '';
            const dessertList = document.getElementById('dessert-list');
            dessertList.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].name);
                console.log('i' + i)
                let li = document.createElement('li');
                let dishName = document.createElement('h3');
                let dishPrice = document.createElement('h4');
                const desc = document.createElement('p');
                li.appendChild(dishName);
                li.appendChild(dishPrice)
                li.appendChild(desc);


                dishName.textContent = data[i].name
                dishName.classList.add('dish-name');
                dishPrice.textContent = data[i].price;
                dishPrice.classList.add('price');
                desc.textContent = data[i].description;


                const { category } = data[i];

                switch (category) {
                    case 'apps':
                        appList.appendChild(li);
                        console.log('append apps')
                        break;
                    case 'breakfast':
                        breakList.appendChild(li);
                        break;
                    case 'lunch':
                        lunchList.appendChild(li);
                        break;
                    case 'dinner':
                        dinnerList.appendChild(li);
                        break;
                    case 'dessert':
                        dessertList.appendChild(li);
                        break;
                }
            }
        })
    })
});