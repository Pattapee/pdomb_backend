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
import { ItemWithdraw } from '../entities/ItemWithdraw';
import { ItemWithdrawRepository } from '../repositories/ItemWithdrawRepository';

let repository: ItemWithdrawRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ItemWithdrawRepository);
};

export default class ItemWithdrawService {
  public static getAllItemWithdraw = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getOneItemWithdraw = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static saveitemWithdraw = async (req: Request, res: Response) => {
    initialize();
    const {
      remark,
      no,
      cusid,
      cusfullname,
      cusemail,
      cusposition,
      cusdepartment,
      empusername,
      datewithdraw,
      approved1,
      approved2
    } = req.body;
    const data = new ItemWithdraw();
    data.remark = remark;
    data.no = no;
    data.cusid = cusid;
    data.cusfullname = cusfullname;
    data.cusemail = cusemail;
    data.cusposition = cusposition;
    data.cusdepartment = cusdepartment;
    data.empusername = empusername;
    data.datewithdraw = datewithdraw;
    data.approved1 = approved1
    data.approved2 = approved2
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

  public static updateItemWithdraw = async (req: Request, res: Response) => {
    initialize();
    const {
      remark,
      no,
      cusid,
      cusfullname,
      cusemail,
      cusposition,
      cusdepartment,
      empusername,
      datewithdraw,
      activeStatus,
      id,
      approved1,
      approved2
    } = req.body;
    const newData = new ItemWithdraw();
    newData.remark = remark;
    newData.no = no;
    newData.cusid = cusid;
    newData.cusfullname = cusfullname;
    newData.cusemail = cusemail;
    newData.cusposition = cusposition;
    newData.cusdepartment = cusdepartment;
    newData.empusername = empusername;
    newData.datewithdraw = datewithdraw;
    newData.activeStatus = activeStatus;
    newData.id = id;
    newData.approved1 = approved1
    newData.approved2 = approved2
    try {
      newData.updated = new Date();
      const result = await repository.Update(newData.id, newData);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static delItemWithdraw = async (req: Request, res: Response) => {
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
