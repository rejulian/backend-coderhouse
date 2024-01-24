const socket = io()

socket.on('products', (data) => {
    console.log(data);
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
    socket.emit('newProduct', product)
    return false;
}