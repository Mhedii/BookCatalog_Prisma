import { Server } from 'http'
import app from './app'
import config from './config/index'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server
async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Application Running on Port: ${config.port}`)
    })
  } catch (error) {
    console.log('Failed To Connect Database', error)
  }
}
main()
