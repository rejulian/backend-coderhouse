//Logica de socket.io
const socket = io()
const productsBox = document.getElementById('products-box')

socket.on('productAdded', (data) => {
    const product = data;
    const newDiv = document.createElement('div')
    newDiv.className = 'product__card'
    newDiv.innerHTML += `
            <img src=${product.thumbnail} alt=${product.title}>
            <h1>${product.title}</h1>
            <div class="product__card__information">
                <p>$${product.price}</p>
                <p>Stock:${product.stock}</p>
            </div>
            <button>Agregar</button>
        `
    productsBox.appendChild(newDiv)
})
