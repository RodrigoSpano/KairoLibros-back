import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import 'dotenv/config'

import indexRouter from './routes/index.routes'
import JWTStrategy from './utilities/helpers/passport.config'

require('./utilities/helpers/google')

const app = express()

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({mongoUrl: process.env.MONGO_URI, collectionName: 'session'}),
        cookie: {
            maxAge: 600000
        }
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))
app.use(cookieParser(process.env.SECRET))

app.use(passport.initialize())
app.use(passport.session())
passport.use(JWTStrategy)

app.use(indexRouter)

export default app