if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
// Standard express requires
const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts')
const bodyparser = require('body-parser')

// Router for localhost:3000
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

// EJS stuff
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts);
app.use(express.static('public'))
app.use(bodyparser.urlencoded({ limit: '10mb', extended: false }))

// MongoDB stuff
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))

// Router
app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

// Port
app.listen(process.env.PORT || 3000);