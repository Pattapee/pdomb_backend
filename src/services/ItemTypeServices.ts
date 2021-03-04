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
import { ItemType } from '../entities/ItemType';
import { ItemTypeRepository } from '../repositories/ItemTypeRepository';

let repository: ItemTypeRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ItemTypeRepository);
};

export default class ItemTypeService {
  public static getAllItemType = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getOneItemTypeByID = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getAllByCategoryID = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getAllByCategoryID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static saveItemType = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const { type, itemcategorys } = req.body;
    const data = new ItemType();
    data.type = type;
    data.itemcategorys = itemcategorys;
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

  public static updateItemType = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const { type, id, itemcategorys } = req.body;
    const newData = new ItemType();
    newData.type = type;
    newData.id = id;
    newData.itemcategorys = itemcategorys;
    try {
      newData.updated = new Date();
      const result = await repository.Update(newData.id, newData);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static deleteItemType = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const data = await repository.getOneByID(+req.params.id);
      const result = await repository.Delete(_.last(data));
      if (result) {
        res.status(HTTPSTATUS_OK).send(result);
      }
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };
}
