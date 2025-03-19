import { Response } from 'express'
import { ResponseMessage } from './message'

export interface ResponseInterface {
  message: string
  status: number
  data: any
}

export const successResponse = (
  res: Response,
  results: any = {},
  status: number = 200
) => {
  const response: ResponseInterface = {
    status,
    message: 'OK',
    data: results,
  }
  return res.status(status).json(response)
}

export const errorResponse = (
  res: Response,
  err: Error,
  msg?: string,
  status?: number
) => {
  console.log(err)
  const statusError = status || 500
  const messageError = msg || ResponseMessage.ERROR_SERVER

  const response: ResponseInterface = {
    status: statusError,
    message: messageError,
    data: {},
  }

  return res.status(response.status).json(response)
}
