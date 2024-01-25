import { Router } from 'express'

const handlebarsRouter = Router()

handlebarsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts',{})
})


export { handlebarsRouter }
