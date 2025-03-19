import { app } from './app'
import { dbSequelize } from './config/database'
import 'dotenv/config'

const port = process.env.PORT || 8000

app.listen(port, async () => {
  try {
    await dbSequelize.authenticate()
    console.log(`Server is running...`)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})
