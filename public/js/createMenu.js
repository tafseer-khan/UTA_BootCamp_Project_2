
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
                        const fs = require('fs');
                        const path = require('path');

                        let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu MaQ'R</title>
    <link rel="icon" type="image/png" href="https://restaurantbrisa.be/wp-content/uploads/2016/06/Favicon-01-300x300.png">
    <!-- Bootstrap Stylesheet -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <!-- <a class="navbar-brand">Menu MaQ'R</a> -->
            <a href="index.html"><img src="images/logored.png" alt="Menu Maqr's Logo"></a>
            <form class="d-flex" id="login">
                <input id="email" class="form-control me-2" type="text" placeholder="Username" aria-label="Username">
                <input id="password" class="form-control me-2" type="password" placeholder="Password"
                    aria-label="Password">
                <button class="btn btn-outline-secondary loginButton" type="submit">Log In</button>
            </form>
        </div>

        
        </nav>
        <div class="row">
            <div class="col-md-12 card" id="menu">
                <div class="card-body">
                    <h1 id="menu-name">Menu Name</h1>

                    <div class="row">
                        <div class="col-md-12 card menucard">
                            <div class="card-body">
                                <h2 id="apps">Appetizers</h2>
                                <ul id="apps-list">
                                    <li>
                                        <h3><span class="dish-name">Queso</span></h3>
                                        <h4 class="price">3.99</h4>
                                        <p>Warm delicious cheese</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    

                    <div class="row">
                        <div class="col-md-12 card menucard">
                            <div class="card-body">
                                <h2 id="lunches">Lunch</h2>
                                <ul id="apps-list">
                                    <li>
                                        <h3><span class="dish-name">Queso</span></h3>
                                        <h4 class="price">3.99</h4>
                                        <p>Warm delicious cheese</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    
                    <div class="row">
                        <div class="col-md-12 card menucard">
                            <div class="card-body">
                                <h2 id="dinner">Dinner</h2>
                                <ul id="dinner-list">
                                    <li>
                                        <h3><span class="dish-name">Queso</span></h3>
                                        <h4 class="price">3.99</h4>
                                        <p>Warm delicious cheese</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    

                    <div class="row">
                        <div class="col-md-12 card menucard">
                            <div class="card-body">
                                <h2 id="dessert">Dessert</h2>
                                <ul id="dessert-list">
                                    <li>
                                        <h3><span class="dish-name">Queso</span></h3>
                                        <h4 class="price">7.99</h4>
                                        <p>Warm delicious cheese</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                


                </div>
            </div>
        </div>
</body>
</html>`;

                        console.log(htmlContent);
                        fs.writeFile(path.join(__dirname, "../menus/newMenu.html"), htmlContent, (err) => {
                            console.log('created')
                            if (err) {
                                throw err;
                            }
                        });
                        window.location.replace('./userHome.html')
                    })
                });
            })
        })
    })

    // finishMenu.addEventListener('click', (e) => {
    //     e.preventDefault()
    //     var QRCode = require('qrcode')
    //     make =()=>{
    //         QRCode.toString("https://www.npmjs.com/package/qrcode",{type:'terminal'},(err,url) =>{
    //         return url
    //     })
    //     }

    //     make().then((data)=>{
    //         console.log(data)
    //     })



    // })


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

