import { Application } from 'express'
import { newMessage } from '../../controllers/chat/newMessage'
import { endpoints } from '../endpoints'

export const chatNewMessage = (app: Application) => {
  app.post(endpoints.chat.newMessage, newMessage)
}
