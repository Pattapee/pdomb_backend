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
import { ItemDeposit } from '../entities/ItemDeposit';
import { ItemDepositRepository } from '../repositories/ItemDepositRepository';

let repository: ItemDepositRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ItemDepositRepository);
};

export default class ItemService {
  public static getAllItemDeposit = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getAllItemDepositlimit50 = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static delDeposit = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.Delete(req.body)
      res.status(HTTPSTATUS_OK).send(result)
    } catch (e) {
      console.error(e)
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' })
    }
  };

  public static getOneByID = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static SaveItemDeposit = async (req: Request, res: Response) => {
    initialize();
    const {
      amount,
      item,
      dateimport,
      datereceived,
      no,
      price,
      company,
      nettotal,
    } = req.body;
    const data = new ItemDeposit();
    data.dateimport = dateimport;
    data.datereceived = datereceived;
    data.no = no;
    data.company = company;
    data.nettotal = nettotal;
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

  public static updateItemDeposit = async (req: Request, res: Response) => {
    initialize();
    const {
      amount,
      item,
      id,
      dateimport,
      no,
      datereceived,
      company,
      nettotal,
      activeStatus
    } = req.body;
    const newData = new ItemDeposit();
    newData.id = id;
    newData.dateimport = dateimport;
    newData.datereceived = datereceived;
    newData.no = no;
    newData.company = company;
    newData.nettotal = nettotal;
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

  public static delItemDeposit = async (req: Request, res: Response) => {
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
