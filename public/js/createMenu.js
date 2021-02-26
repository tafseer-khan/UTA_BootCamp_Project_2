// Once content is loaded function may run
document.addEventListener('DOMContentLoaded', () => {
    // Selects ID, and local storage for future refernce
    const mostRecent = localStorage.getItem('mostRecent');
    const addItem = document.getElementById('add-item');
    const finish = document.getElementById('finish-menu');

    console.log(mostRecent);
    // Gets the menu data by the local storage value of mostRecent, this is the value for the menu name which is stored when working with the specific menu
    // This will give us the id for the menu by by name
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
                // Selects the menu's id and renders the menu's contents
                res.json().then(data => {
                    const userId = data.id;
                    renderAdded(userId, menuID);
                    // Once addItem button is clicked function for adding the menu Item will run
                    addItem.addEventListener('click', (e) => {
                        e.preventDefault;
                        // gets elements values by element id for future reference
                        const section = document.getElementById('categories').value;
                        const dishName = document.getElementById('dish-name').value.trim();
                        const description = document.getElementById('description').value.trim();
                        const price = document.getElementById('price').value.trim();

                        console.log(section, dishName, description);
                        // Creates a new object for new dish, which will have required column information to post on database. Information is grabbed by the element values denoted above
                        const newDish = {
                            name: dishName,
                            description: description,
                            category: section,
                            price: price
                        };

                        console.log(newDish);
                        // Posts to database by User ID and Menu ID with the given column values
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
                    // Once finish is clicked you will be redirected to the UserHome which will have your added menus
                    finish.addEventListener('click', (e) => {
                        window.location.replace('./userHome.html');
                    })
                });
            })
        })
    })


});
// Gets the new added menus 
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
            // Creates new elements for each menu
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

