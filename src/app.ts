import app from './index'
import './config/db'

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`running on port ${PORT}`))