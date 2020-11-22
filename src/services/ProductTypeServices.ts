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
import { ProductType } from '../entities/ProductType';
import { ProductTypeRepository } from '../repositories/ProductTypeRepository';

let repository: ProductTypeRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ProductTypeRepository);
};

export default class ProductTypeService {
  public static getAllProductType = async (req: Request, res: Response) => {
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

  public static getOneProductTypeByID = async (req: Request, res: Response) => {
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

  public static getAllByCategoryID = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getAllByCategoryID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static saveProductType = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const { type, productcategorys } = req.body;
    const data = new ProductType();
    data.type = type;
    data.productcategorys = productcategorys;
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

  public static updateProductType = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const { type, id, productcategorys } = req.body;
    const newData = new ProductType();
    newData.type = type;
    newData.id = id;
    newData.productcategorys = productcategorys;
    try {
      newData.updated = new Date();
      const result = await repository.Update(newData.id, newData);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static deleteProductType = async (req: Request, res: Response) => {
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
}
