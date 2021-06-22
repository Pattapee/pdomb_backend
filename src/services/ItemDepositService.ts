import { defaultMaxListeners } from 'events';
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
import { ItemDepositDetailRepository } from '../repositories/ItemDepositDetailRepository'
import { ItemDepositRepository } from '../repositories/ItemDepositRepository';
import { ItemRepository } from '../repositories/ItemRepository'

let repositoryDeposit: ItemDepositRepository;
const initializeDeposi = () => {
  const connection = getConnection();
  repositoryDeposit = connection.getCustomRepository(ItemDepositRepository);
};
let repositoryDepositDetail: ItemDepositDetailRepository;
const initializeDepositDetail = () => {
  const connection = getConnection();
  repositoryDepositDetail = connection.getCustomRepository(ItemDepositDetailRepository);
};

let repositoryItem: ItemRepository;
const initializeitem = () => {
  const connection = getConnection();
  repositoryItem = connection.getCustomRepository(ItemRepository);
};

export default class ItemService {
  public static getAllItemDeposit = async (req: Request, res: Response) => {
    initializeDeposi();
    try {
      const result = await repositoryDeposit.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getAllItemDepositlimit50 = async (req: Request, res: Response) => {
    initializeDeposi();
    try {
      const result = await repositoryDeposit.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static delDeposit = async (req: Request, res: Response) => {
    initializeDeposi();
    try {
      const result = await repositoryDeposit.Delete(req.body)
      res.status(HTTPSTATUS_OK).send(result)
    } catch (e) {
      console.error(e)
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' })
    }
  };

  public static getOneByID = async (req: Request, res: Response) => {
    initializeDeposi();
    try {
      const result = await repositoryDeposit.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static SaveItemDeposit = async (req: Request, res: Response) => {
    initializeDeposi();
    const {
      dateimport,
      datereceived,
      no,
      company,
      nettotal,
      remark
    } = req.body;
    const data = new ItemDeposit();
    data.dateimport = dateimport;
    data.datereceived = datereceived;
    data.no = no;
    data.company = company;
    data.nettotal = nettotal;
    data.remark = remark;
    try {
      data.created = new Date();
      data.updated = new Date();
      const result = await repositoryDeposit.Save(data);
      res.status(HTTPSTATUS_CREATE).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static updateItemDeposit = async (req: Request, res: Response) => {
    initializeDeposi();
    const {
      id,
      dateimport,
      no,
      datereceived,
      company,
      nettotal,
      activeStatus,
      remark
    } = req.body;
    const newData = new ItemDeposit();
    newData.id = id;
    newData.dateimport = dateimport;
    newData.datereceived = datereceived;
    newData.no = no;
    newData.company = company;
    newData.nettotal = nettotal;
    newData.activeStatus = activeStatus;
    newData.remark = remark
    try {
      newData.updated = new Date();
      const result = await repositoryDeposit.Update(newData.id, newData);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static delItemDeposit = async (req: Request, res: Response) => {
    initializeDeposi();
    initializeDepositDetail();
    initializeitem();
    const detail = await repositoryDepositDetail.getAllByItemdeposit(req.body)
    detail.forEach(async (value) => {
      const item = (await repositoryItem.getOneByID(value.id))[0]
      console.log(item)
      // item.balance = (+item.balance - +value.amount)
      // await repositoryItem.Update(item.id, item)
    })

    try {
      // const result = await repositoryDeposit.Delete(req.body);
      res.status(HTTPSTATUS_OK).send(true);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };
}
