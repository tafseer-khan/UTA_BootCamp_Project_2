document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('menuToEdit')){
        const menuToEdit = localStorage.getItem('menuToEdit');
        const addItem = document.getElementById('add-item')
        const finish = document.getElementById('finish-menu');

        console.log(menuToEdit);
        // Gets menu info for the local storage menu name
        fetch(`/api/${menuToEdit}/menuinfo`, {
            method:'GET'
        }).then(res => {
            res.json().then(data => {
                const menuId = data.id;
                // Gets user data
                fetch('/api/user_data', {
                    method:'GET'
                }).then(res => {
                    // renders user Id and Menu ID
                    res.json().then(data => {
                        const userId = data.id;
                        renderAdded(userId, menuId);
                        addItem.addEventListener('click', (e) => {
                            e.preventDefault;
    
                            const section = document.getElementById('categories').value;
                            const dishName = document.getElementById('dish-name').value.trim();
                            const description = document.getElementById('description').value.trim();
                            const price = document.getElementById('price').value.trim();
    
                            console.log(section, dishName, description);
                            // Creates new dish object with values from input form once add item is clicked
                            const newDish = {
                                name: dishName,
                                description: description,
                                category: section,
                                price: price
                            };
    
                            console.log(newDish);
                            // Posts dish into our menu Items table with associated menu ID 
                            fetch(`/api/${userId}/menus/${menuId}/menuItems`, {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(newDish)
                            }).then(res => {
                                document.getElementById('dish-name').value = '';
                                document.getElementById('description').value = '';
                                document.getElementById('price').value = '';
                                renderAdded(userId, menuId);
                            })
    
                        });
                        // Once finish is clicked we are taken back to user home
                        finish.addEventListener('click', (e) => {
                            window.location.replace('./userHome.html')
                        })
                    })
                })
            })
        })
    }
});
// Gets and renders our new dishes
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