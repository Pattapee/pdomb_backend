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
import { ItemWithdrawDetail } from '../entities/ItemWithdrawDetail';
import { ItemWithdrawDetailRepository } from '../repositories/ItemWithdrawDetailRepository';

let repository: ItemWithdrawDetailRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ItemWithdrawDetailRepository);
};

export default class ItemWithdrawService {
  public static getAllItemWithdrawDetail = async (
    req: Request,
    res: Response
  ) => {
    initialize();
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getOneItemWithdrawDetail = async (
    req: Request,
    res: Response
  ) => {
    initialize();
    try {
      const result = await repository.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getAllByitemwithdraw = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getAllByItemwithdraw(req.body);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static saveitemWithdrawDetail = async (
    req: Request,
    res: Response
  ) => {
    initialize();
    const { amount, item, itemWithdraw } = req.body;
    const data = new ItemWithdrawDetail();
    data.amount = amount;
    data.item = item;
    data.itemWithdraw = itemWithdraw;
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

  public static updateItemWithdrawDetail = async (req: Request, res: Response) => {
    initialize();
    const { amount, item, itemWithdraw, id, activeStatus } = req.body;
    const newData = new ItemWithdrawDetail();
    newData.amount = amount;
    newData.item = item;
    newData.itemWithdraw = itemWithdraw;
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
}
