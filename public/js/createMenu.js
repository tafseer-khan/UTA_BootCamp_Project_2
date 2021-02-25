document.addEventListener('DOMContentLoaded', () => {
    const mostRecent = localStorage.getItem('mostRecent');
    const addItem = document.getElementById('add-item');
    const finish = document.getElementById('finish-menu');

    console.log(mostRecent);
    fetch(`/api/${mostRecent}/menuinfo`, {
        method: 'GET'
    }).then(res => {
        res.json().then(data => {
            const { id } = data;
            const menuID = id;
            console.log(menuID)
            fetch('/api/user_data', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                res.json().then(data => {
                    const userId = data.id;
                    renderAdded(userId, menuID);
                    addItem.addEventListener('click', (e) => {
                        e.preventDefault;

                        const section = document.getElementById('categories').value;
                        const dishName = document.getElementById('dish-name').value.trim();
                        const description = document.getElementById('description').value.trim();
                        const price = document.getElementById('price').value.trim();

                        console.log(section, dishName, description);

                        const newDish = {
                            name: dishName,
                            description: description,
                            category: section,
                            price: price
                        };

                        console.log(newDish);

                        fetch(`/api/${userId}/menus/${menuID}/menuItems`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newDish)
                        }).then(res => {
                            document.getElementById('dish-name').value = '';
                            document.getElementById('description').value = '';
                            document.getElementById('price').value = '';
                            renderAdded(userId, menuID);
                        })

                    })

                    finish.addEventListener('click', (e) => {
                        window.location.replace('./userHome.html')
                    })
                });
            })
        })
    })


});

const renderAdded = (userId, menuID) => {
    console.log('in render')
    fetch(`api/${userId}/menus/${menuID}/menuItems`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        res.json().then(data => {
            console.log(data);
            const menuItems = document.getElementById('menu-items');
            menuItems.innerHTML = ""

            for (let i = 0; i < data.length; i++) {
                const newItem = document.createElement("li");
                newItem.textContent = data[i].name;
                newItem.classList.add('list-group-item')
                newItem.style.color = 'black';
                menuItems.appendChild(newItem);
            }

        })
    })
}

