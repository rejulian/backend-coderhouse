const addToCart = (id, cart_id) => {
    fetch(`http://localhost:8080/api/carts/${cart_id}/product/${id}`, {
        method : 'POST',
        body: JSON.stringify({
            quantity: 1
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(()=>{
        alert('Producto agregado')
    })
    .catch((err)=> console.log(err))
}