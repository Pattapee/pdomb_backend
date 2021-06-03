import { Request, Response } from 'express';
import * as _ from 'lodash';
import { forEach } from 'lodash';
import { getConnection } from 'typeorm';
import {
  HTTPSTATUS_ACCEPT,
  HTTPSTATUS_BADREQUEST,
  HTTPSTATUS_CONFLICT,
  HTTPSTATUS_CREATE,
  HTTPSTATUS_NOTFOUND,
  HTTPSTATUS_OK,
} from '../constants/HttpStatus';
import { ItemStatus } from '../entities/ItemStatus';
import { ItemStatusRepository } from '../repositories/ItemStatusRepository';

let repository: ItemStatusRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ItemStatusRepository);
};

export default class ItemStatusService {
  public static getAllItemStatus = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static getOneItemStatusByID = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static saveItemStatus = async (req: Request, res: Response) => {
    initialize();
    const { status } = req.body;
    const data = new ItemStatus();
    data.status = status;
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

  public static updateItemStatus = async (req: Request, res: Response) => {
    initialize();
    const { status, id } = req.body;
    const newData = new ItemStatus();
    newData.status = status;
    newData.id = id;
    try {
      newData.updated = new Date();
      const result = await repository.Update(newData.id, newData);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Item !!!' });
    }
  };

  public static IninitalData = async () => {
    initialize();
    try {
      const result = await repository.getAll();
      if (result.length === 0) {
        const data = [
          {
            id: 1,
            status: 'มีของพร้อมเบิก',
          },
          {
            id: 2,
            status: 'ของหมด',
          },
          {
            id: 3,
            status: 'อื่นๆ',
          },
        ];
        forEach(data, async (value) => {
          const newData = new ItemStatus();
          newData.id = value.id;
          newData.status = value.status;
          newData.created = new Date();
          newData.updated = new Date();
          await repository.Save(newData);
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
}
