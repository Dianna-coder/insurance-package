/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

import AppError from './error.class'

export const handlingErrorRequest = (error: Error, request: Request, response: Response, next?: NextFunction) => {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ message: error.message, status: 'error' })
  }

  console.log(error)

  return response.status(500).json({
    message: 'Internal server error',
    status: 'error'
  })
}
