export const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        next()
    } else {
        res.redirect('http://localhost:8080/views/login')
    }
}

export const userLogged = (req, res, next) => {
    if(req.session && req.session.user) {
        res.redirect('http://localhost:8080/views/products')
    } else {
        next();
    }
}

export const adminMiddleware = (req, res, next) => {
    if(req.session.user.role === 'admin'){
        next()
    } else {
        res.json({message: 'Unauthorized'})
    }
}