//Logica de socket.io
const socket = io()
const productsBox = document.getElementById('products-box')

socket.on('products', (data) => {
    const products = data;
    const newDiv = document.createElement('div')
    newDiv.className = 'products__container'

    products.forEach(p => {
        newDiv.innerHTML += `
        <div class="product__card">
            <img src=${p.thumbnail} alt=${p.title}>
            <h1>${p.title}</h1>
            <div class="product__card__information">
                <p>$${p.price}</p>
                <p>Stock:${p.stock}</p>
            </div>
            <button>Agregar</button>
        </div>
        `
        productsBox.innerHTML = ''
        productsBox.appendChild(newDiv)
    })
})