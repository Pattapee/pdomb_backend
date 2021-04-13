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
import { ProductStatus } from '../entities/ProductStatus';
import { ProductStatusRepository } from '../repositories/ProductStatusRepository';

let repository: ProductStatusRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ProductStatusRepository);
};

export default class ProductStatusService {

  public static getAllProductStatus = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static getOneProductStatusByID = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static saveProductStatus = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const { status } = req.body;
    const data = new ProductStatus();
    data.status = status;
    try {
      data.created = new Date();
      data.updated = new Date();
      const result = await repository.Save(data);
      res.status(HTTPSTATUS_CREATE).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static updateProductStatus = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const { status, id } = req.body;
    const newData = new ProductStatus();
    newData.status = status;
    newData.id = id;
    try {
      newData.updated = new Date();
      const result = await repository.Update(newData.id, newData);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static deleteProductStatus = async (req: Request, res: Response) => {
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
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static IninitalData = async () => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getAll();
      if (result.length === 0) {
        const data = [
          {
            id: 1,
            status: 'ใช้งานปกติ',
          },
          {
            id: 2,
            status: 'จำหน่าย',
          },
          {
            id: 3,
            status: 'ส่งซ่อม',
          },
          {
            id: 4,
            status: 'อื่นๆ',
          },
          {
            id: 5,
            status: 'สำรอง',
          },
        ];
        forEach(data, async (value) => {
          const newData = new ProductStatus();
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
