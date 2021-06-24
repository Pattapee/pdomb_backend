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
import { ItemHistoryWithdraw } from '../entities/ItemHistoryWithdraw'
import { ItemHistoryWithdrawRepository } from '../repositories/ItemHistoryWithdrawRepository'

let repository: ItemHistoryWithdrawRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ItemHistoryWithdrawRepository);
};

export default class ItemHistoryWithdrawServices {
  public static getAllItemHistoryWithdraw = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static DelItemHistoryWithdraw = async (req: Request, res: Response) => {
    initialize();
    try {
      const { itemhistorywithdraw } = req.body
      const result = await repository.Delete(itemhistorywithdraw);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Can not Delete item !!!' });
    }

  };
  public static getAllByIDItem = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getAllbyIditem(+req.params.id);
      const data = await _.orderBy(result, [(obj) => new Date(obj.created)], ['desc'])
      res.status(HTTPSTATUS_OK).send(data);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static SaveData = async (req: Request, res: Response) => {
    initialize();
    const {
      item,
      balance,
      cusid,
      cusfullname,
      cusemail,
      cusposition,
      cusdepartment,
      amount,
      datewithdraw,
      itemWithdraw
    } = req.body;
    const data = new ItemHistoryWithdraw();
    data.item = item;
    data.balance = balance;
    data.amount = amount;
    data.cusid = cusid;
    data.cusfullname = cusfullname
    data.cusemail = cusemail
    data.cusposition = cusposition
    data.cusdepartment = cusdepartment
    data.datewithdraw = datewithdraw
    data.itemWithdraw = itemWithdraw
    try {
      data.created = new Date();
      data.updated = new Date();
      const result = await repository.Save(data);
      res.status(HTTPSTATUS_CREATE).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find ItemHistoryWithdraw !!!' });
    }
  };

  public static updateData = async (req: Request, res: Response) => {
    initialize();
    const {
      item,
      balance,
      cusid,
      cusfullname,
      cusemail,
      cusposition,
      cusdepartment,
      id,
      amount,
      datewithdraw,
      itemWithdraw
    } = req.body;
    const newData = new ItemHistoryWithdraw();
    newData.item = item;
    newData.amount = amount
    newData.balance = balance;
    newData.cusid = cusid;
    newData.cusfullname = cusfullname
    newData.cusemail = cusemail
    newData.cusposition = cusposition
    newData.cusdepartment = cusdepartment
    newData.datewithdraw = datewithdraw
    newData.itemWithdraw = itemWithdraw
    newData.id = id
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
