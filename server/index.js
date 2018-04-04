const express = require( 'express')
const bodyParser =  require('body-parser')
const session = require('express-session')
require('dotenv').config();


// Middleware
const checkForSession = require('./middlewares/checkForSession')


// Controllers
const swagController = require('./controllers/swag_controller')
const authController = require('./controllers/auth_controller')
const cartController = require('./controllers/cart_controller')
const lookController = require('./controllers/search_controller')


app = express();
app.use(bodyParser.json())
app.use( session({
    secret: 'Bears eat Beets. Bears, Beets, BattleStar Galactica',
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)
app.use( express.static( `${__dirname}/build` ) );



app.get('/api/swag', swagController.read)
app.get('/api/search', lookController.search)
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)
app.post('/api/cart', cartController.add)
app.post('/api/cart/checkout', cartController.checkout)
app.delete('/api/cart', cartController.delete)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {console.log(`Loud and Clear on ${PORT}` )})