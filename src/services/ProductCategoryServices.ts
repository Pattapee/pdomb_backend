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
import { ProductCategory } from '../entities/ProductCategory';
import { ProductCategoryRepository } from '../repositories/ProductCategoryRepository';

let repository: ProductCategoryRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ProductCategoryRepository);
};

export default class ProductCategoryService {
  public static getAllProductCategory = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find ProductCategory !!!' });
    }
  };

  public static getOneProductCategoryByID = async (
    req: Request,
    res: Response
  ) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find ProductCategory !!!' });
    }
  };

  public static getCountCategory = async (req: Request,    res: Response  ) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.Count();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find ProductCategory !!!' });
    }
  }

  public static saveProductCategory = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const { category } = req.body;
    const data = new ProductCategory();
    data.category = category;
    try {
      data.created = new Date();
      data.updated = new Date();
      const result = await repository.Save(data);
      res.status(HTTPSTATUS_CREATE).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find ProductCategory !!!' });
    }
  };

  public static updateProductCategory = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const { category, id } = req.body;
    const newData = new ProductCategory();
    newData.category = category;
    newData.id = id;
    try {
      newData.updated = new Date();
      const result = await repository.Update(newData.id, newData);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find ProductCategory !!!' });
    }
  };
  public static deleteProductCategory = async (req: Request, res: Response) => {
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
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find ProductCategory !!!' });
    }
  };
}
