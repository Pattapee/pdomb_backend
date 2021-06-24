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
import { ItemHistoryDepositRepository } from '../repositories/ItemHistoryDepositRepository'
import { ItemWithdrawDetailRepository } from '../repositories/ItemWithdrawDetailRepository';

let repositoryIWDR: ItemWithdrawDetailRepository;
const initializeIWDR = () => {
  const connection = getConnection();
  repositoryIWDR = connection.getCustomRepository(ItemWithdrawDetailRepository);
};
let repositoryIHDR: ItemHistoryDepositRepository;
const initializeIHDR = () => {
  const connection = getConnection();
  repositoryIHDR = connection.getCustomRepository(ItemHistoryDepositRepository);
};

export default class ItemWithdrawService {
  public static getAllItemWithdrawDetail = async (req: Request, res: Response) => {
    initializeIWDR();
    try {
      const result = await repositoryIWDR.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getOneItemWithdrawDetail = async (req: Request, res: Response) => {
    initializeIWDR();
    try {
      const result = await repositoryIWDR.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getAllByitemwithdraw = async (req: Request, res: Response) => {
    initializeIWDR();
    try {
      const result = await repositoryIWDR.getAllByItemwithdraw(req.body);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static saveitemWithdrawDetail = async (req: Request, res: Response) => {
    initializeIWDR();
    initializeIHDR();
    const { amount, item, itemWithdraw } = req.body;
    const data = new ItemWithdrawDetail();
    data.amount = amount;
    data.item = item;
    data.itemWithdraw = itemWithdraw;
    let amountchk = amount
    const IHDRDetail = await repositoryIHDR.getAllbyamountbalance(item)
    IHDRDetail.forEach(async (value) => {
      if (amountchk >= value.amountbalance && amountchk > 0) {
        amountchk -= value.amountbalance;
        value.amountbalance = 0;
        await repositoryIHDR.update(value.id, value)

      } else if (amountchk < value.amountbalance && amountchk !== 0) {
        value.amountbalance -= amountchk
        amountchk = 0;
        await repositoryIHDR.update(value.id, value)

      }
    })
    try {
      data.created = new Date();
      data.updated = new Date();
      const result = await repositoryIWDR.Save(data);
      res.status(HTTPSTATUS_CREATE).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static updateItemWithdrawDetail = async (req: Request, res: Response) => {
    initializeIWDR();
    const { amount, item, itemWithdraw, id, activeStatus } = req.body;
    const newData = new ItemWithdrawDetail();
    newData.amount = amount;
    newData.item = item;
    newData.itemWithdraw = itemWithdraw;
    newData.id = id;
    newData.activeStatus = activeStatus;
    try {
      newData.updated = new Date();
      const result = await repositoryIWDR.Update(newData.id, newData);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };
}
