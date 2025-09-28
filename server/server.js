import express from 'express'

import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

import authRouter from '../routes/auth.js'
import getInfoRouter from '../routes/getInfo.js'
import passwordsRouter from '../routes/passwords.js'
import favoritesRouter from '../routes/favorites.js'

app.use('/auth', authRouter)
app.use('/passwords', passwordsRouter)
app.use('/info', getInfoRouter);
app.use('/favorites', favoritesRouter)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`)
})
