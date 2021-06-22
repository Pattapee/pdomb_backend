import { Request, Response } from 'express';
import * as _ from 'lodash';
import { getConnection } from 'typeorm';
import {
  HTTPSTATUS_ACCEPT,
  HTTPSTATUS_BADREQUEST,
  HTTPSTATUS_CONFLICT,
  HTTPSTATUS_CREATE,
  HTTPSTATUS_NOTFOUND,
  HTTPSTATUS_OK,
} from '../constants/HttpStatus';
import { ItemDepositDetail } from '../entities/ItemDepositDetail';
import { ItemDepositDetailRepository } from '../repositories/ItemDepositDetailRepository';

let repository: ItemDepositDetailRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ItemDepositDetailRepository);
};

export default class ItemWithdrawService {
  public static getAllItemDepositDetaiul = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getOneItemDepositDetail = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getAllByItemDeposit = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getAllByItemdeposit(req.body);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static saveitemDepositDetail = async (req: Request, res: Response) => {
    initialize();
    const { amount, item, price, itemDeposit, amountbalance } = req.body;
    const data = new ItemDepositDetail();
    data.amount = amount;
    data.amountbalance = amountbalance;
    data.price = price;
    data.item = item;
    data.itemDeposit = itemDeposit
    try {
      data.created = new Date();
      data.updated = new Date();
      const result = await repository.Save(data);
      res.status(HTTPSTATUS_CREATE).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static updateitemDepositDetail = async (req: Request, res: Response) => {
    initialize();
    const { amount, item, itemDeposit, id, price, activeStatus, amountbalance } = req.body;
    const newData = new ItemDepositDetail();
    newData.amount = amount;
    newData.amountbalance = amountbalance;
    newData.price = price;
    newData.item = item;
    newData.itemDeposit = itemDeposit
    newData.id = id;
    newData.activeStatus = activeStatus;
    try {
      newData.updated = new Date();
      const result = await repository.Update(newData.id, newData);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };
  public static delItemDepositDetail = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.Delete(req.body);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };
}
