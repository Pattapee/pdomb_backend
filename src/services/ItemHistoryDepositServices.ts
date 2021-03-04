import { Request, Response } from 'express'
import * as _ from 'lodash'
import { getConnection } from 'typeorm'
import {
  HTTPSTATUS_ACCEPT,
  HTTPSTATUS_BADREQUEST,
  HTTPSTATUS_CONFLICT,
  HTTPSTATUS_CREATE,
  HTTPSTATUS_NOTFOUND,
  HTTPSTATUS_OK,
} from '../constants/HttpStatus'
import { ItemHistoryDeposit } from '../entities/ItemHistoryDeposit'
import { ItemHistoryDepositRepository } from '../repositories/ItemHistoryDepositRepository'

let repository: ItemHistoryDepositRepository
const initialize = () => {
  const connection = getConnection()
  repository = connection.getCustomRepository(ItemHistoryDepositRepository)
}

export default class ItemHistoryDepositServices {

  public static getAllItemHistoryDeposit = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize()
    }
    try {
      const result = await repository.getAll()
      res.status(HTTPSTATUS_OK).send(result)
    } catch (e) {
      console.error(e)
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' })
    }
  }

  public static DelItemHistoryDeposit = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize()
    }
    try {
      const { itemhistoryDeposit } = req.body
      const result = await repository.Delete(itemhistoryDeposit)
      res.status(HTTPSTATUS_OK).send(result)
    } catch (e) {
      console.error(e)
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Can not Delete item !!!' })
    }

  }
  public static getAllByIDItem = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize()
    }
    try {
      const result = await repository.getAllbyIditem(+req.params.id)
      res.status(HTTPSTATUS_OK).send(result)
    } catch (e) {
      console.error(e)
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' })
    }
  }

  public static SaveData = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize()
    }
    const {
      item,
      balance,
      amount,
      price,
      company,
      datereceived,
      dateimport,
      itemDeposit
    } = req.body
    const data = new ItemHistoryDeposit()
    data.item = item
    data.balance = balance
    data.amount = amount
    data.price = price
    data.company = company
    data.datereceived = datereceived
    data.dateimport = dateimport
    data.itemDeposit = itemDeposit
    try {
      data.created = new Date()
      data.updated = new Date()
      const result = await repository.Save(data)
      res.status(HTTPSTATUS_CREATE).send(result)
    } catch (e) {
      console.error(e)
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find ItemHistoryDeposit !!!' })
    }
  }

  public static updateData = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize()
    }
    const {
      item,
      balance,
      amount,
      datereceived,
      price,
      company,
      id,
      dateimport,
      itemDeposit
    } = req.body
    const newData = new ItemHistoryDeposit()
    newData.item = item
    newData.balance = balance
    newData.amount = amount
    newData.price = price
    newData.company = company
    newData.datereceived = datereceived
    newData.dateimport = dateimport
    newData.itemDeposit = itemDeposit
    newData.id = id
    try {
      newData.updated = new Date()
      const result = await repository.Update(newData.id, newData)
      res.status(HTTPSTATUS_OK).send(result)
    } catch (e) {
      console.error(e)
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' })
    }
  }
}
