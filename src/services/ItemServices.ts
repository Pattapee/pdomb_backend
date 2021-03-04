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
import { Item } from '../entities/Item';
import { ItemRepository } from '../repositories/ItemRepository';

let repository: ItemRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ItemRepository);
};

export default class ItemService {
  public static getAllItem = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getItemforwithdraw = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getItemforwithdraw();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getAllByitemTypes = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getAllByitemTypes(req.body);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getOneItemByID = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getOneBycodename = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const {
      codename,
    } = req.body;
    try {
      const result = await repository.getOneBycodename(codename);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static SaveItem = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const {
      uuid,
      itemname,
      quantityname,
      balance,
      codename,
      remark,
      itemtypes,
      itemstatus,
      minimum,
      picture
    } = req.body;
    const data = new Item();
    data.uuid = uuid;
    data.codename = codename
    data.itemname = itemname;
    data.quantityname = quantityname;
    data.balance = balance;
    data.remark = remark;
    data.itemtypes = itemtypes;
    data.itemstatus = itemstatus;
    data.minimum = minimum;
    data.picture = picture;
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

  public static updateItem = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const {
      itemname,
      uuid,
      quantityname,
      balance,
      remark,
      codename,
      itemtypes,
      itemstatus,
      activeStatus,
      minimum,
      id,
      picture
    } = req.body;
    const newData = new Item();
    newData.uuid = uuid;
    newData.codename = codename;
    newData.itemname = itemname;
    newData.quantityname = quantityname;
    newData.balance = balance;
    newData.remark = remark;
    newData.itemtypes = itemtypes;
    newData.itemstatus = itemstatus;
    newData.activeStatus = activeStatus;
    newData.minimum = minimum;
    newData.id = id;
    newData.picture = picture
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
