import { Application } from 'express'
import { chatNewMessage } from './chat'

export const getRoutes = (app: Application) => {
  chatNewMessage(app)
}
