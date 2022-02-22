const Http = require('http')
const Express = require('express')
const App = Express()
const Server = Http.createServer(App)
const Dotenv = require('dotenv')
const Morgan = require('morgan')
const FileUpload = require('express-fileupload')
const Cors = require('cors')
const PORT = process.env.PORT || 7777

App.use(Cors())
App.use(Morgan("dev"))
App.use(FileUpload())
App.use(Express.urlencoded({ extended: true }))
App.use(Express.json())
App.use(Express.static(__dirname + '/public'))

Server.listen(PORT, () => { console.log(`Server is running in port : ${ PORT }`) })

const ConnectDB = require('./models/mongodb/Connection')
ConnectDB()

const Routes = require('./routes/routes')
App.use(Routes)

