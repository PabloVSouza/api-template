import express, { Express } from 'express'
import cors from 'cors'
import Routes from 'scripts/Routes'
import Controllers from 'controllers/Controllers'

class Server {
  private app: Express

  constructor(private port: number) {
    const controllers = new Controllers()
    const { routes } = new Routes(controllers)

    this.app = express()
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(routes)
  }

  public startUp() {
    this.app.listen(this.port, () => {
      console.log('=========================================')
      console.log(`Server Listening on Port: ${this.port}`)
      console.log('=========================================')
    })
  }
}

export default Server
