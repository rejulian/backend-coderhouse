const socket = io()
const box = document.getElementById('products-box')

socket.on('products', (data) => {
    const products = data

    const newBox = document.createElement('div');
    newBox.className = 'products-container'

    products.forEach(product => {
        newBox.innerHTML += `<div class="product-card">
            <span>${product.title}</span>
            <p>$${product.price}</p>
        </div>`
    });

    box.innerHTML = '';
    box.appendChild(newBox);
})

const addProduct = (e) => {
    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
        status: document.getElementById('status').value,
        category: document.getElementById('category').value
    }
    // socket.emit('newProduct', product)
    fetch('http://localhost:8080/api/products',{
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        }
    })
    .then(()=>console.log('Producto agregado'))
    .catch((err)=>console.error(err))

    return false;
}
