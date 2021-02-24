document.addEventListener('DOMContentLoaded', () => {
    
    const addItem = document.getElementById('add-item');
    
        fetch('/api/user_data', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            res.json().then(data => {
                const userId = data.id;
                renderAdded(userId);
                addItem.addEventListener('click', (e) => {
                    e.preventDefault;
            
                    const section = document.getElementById('categories').value;
                    const dishName = document.getElementById('dish-name').value.trim();
                    const description = document.getElementById('description').value.trim();
            
                    console.log(section, dishName, description);
            
                    const newDish = {
                        name: dishName,
                        description: description,
                        category: section
                    };
            
                    console.log(newDish);
            
                    fetch(`/api/${userId}/menus/1/menuItems`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newDish)
                    }).then(res => {
                        document.getElementById('dish-name').value = ''
                        document.getElementById('description').value = ''
                        renderAdded();
                    })
            
                })
            });
        })

});

const renderAdded = (userId) => {
    console.log('in render')
    fetch(`api/${userId}/menus/1/menuItems`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        res.json().then(data => {
            console.log(data);
            const menuItems = document.getElementById('menu-items');
            menuItems.innerHTML = ""

            for( let i = 0; i < data.length; i++){
                const newItem = document.createElement("li");
                newItem.textContent = data[i].name;
                newItem.classList.add('list-group-item')
                newItem.style.color = 'black';
                menuItems.appendChild(newItem);
            }

        })
    })
}

