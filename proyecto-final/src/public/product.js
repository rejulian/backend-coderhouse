const addToCart = (id) => {
    fetch(`http://localhost:8080/api/carts/6637f2a8defe19c2df2ed5e9/product/${id}`, {
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