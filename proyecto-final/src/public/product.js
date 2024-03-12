const addToCart = (id) => {
    fetch(`http://localhost:8080/api/carts/65c36e692d510ffae8295f6d/product/${id}`, {
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