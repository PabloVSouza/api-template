import Server from 'scripts/Server'
import 'dotenv/config'

class StartUp {
  private server: Server

  constructor() {
    this.server = new Server(Number(process.env.PORT))
    this.server.startUp()
  }
}

export default StartUp
