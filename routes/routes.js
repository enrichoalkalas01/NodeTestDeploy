const Express = require('express')
const Routes = Express.Router()

const ImagesController = require('../controllers/images/images')

Routes.get('/', (req, res) => {
    res.send('welcome to homepages')
})

// Images API
Routes.get('/api/images', ImagesController.Find)
Routes.post('/api/images', ImagesController.Create)

module.exports = Routes