import { Request, Response } from 'express';
import * as _ from 'lodash';
import { identity } from 'lodash';
import { getConnection } from 'typeorm';
import {
  HTTPSTATUS_ACCEPT,
  HTTPSTATUS_BADREQUEST,
  HTTPSTATUS_CONFLICT,
  HTTPSTATUS_CREATE,
  HTTPSTATUS_NOTFOUND,
  HTTPSTATUS_OK,
} from '../constants/HttpStatus';
import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

let repository: ProductRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ProductRepository);
};

export default class ProductServices {

  public static getAllProduct = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static getAllByproductTypes = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getAllByTypeID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static getOneProductByID = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    try {
      const result = await repository.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static SaveProduct = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const {
      code,
      datereceived,
      datereceivedconfirm,
      datewarranty,
      name,
      picture,
      price,
      productstatus,
      producttype,
      refmoney,
      serial_number,
      license_number,
      ownerid,
      ownername,
      ownerdepartment,
      ageproductyear,
      ageproductmonth,
      ageproductday,
      atarea,
      remark
    } = req.body;
    const data = new Product();
    data.code = code
    data.datereceived = datereceived
    data.datereceivedconfirm = datereceivedconfirm
    data.datewarranty = datewarranty
    data.name = name
    data.picture = picture
    data.price = price
    data.productstatus = productstatus
    data.producttype = producttype
    data.refmoney = refmoney
    data.serial_number = serial_number
    data.license_number = license_number
    data.ownerid = ownerid
    data.ownername = ownername
    data.ownerdepartment = ownerdepartment
    data.ownernamehistory = ownername
    data.ownerdepartmenthistory = ownerdepartment
    data.ageproductday = ageproductday
    data.ageproductmonth = ageproductmonth
    data.ageproductyear = ageproductyear
    data.remark = remark
    data.atarea = atarea
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

  public static updateProduct = async (req: Request, res: Response) => {
    if (repository === undefined) {
      initialize();
    }
    const {
      code,
      datereceived,
      datereceivedconfirm,
      datewarranty,
      name,
      picture,
      price,
      productstatus,
      producttype,
      refmoney,
      serial_number,
      license_number,
      ownerid,
      ownername,
      ownerdepartment,
      ownernamehistory,
      ownerdepartmenthistory,
      ageproductyear,
      ageproductmonth,
      ageproductday,
      remark,
      activeStatus,
      atarea,
      id
    } = req.body;
    const newdata = new Product();
    newdata.code = code
    newdata.datereceived = datereceived
    newdata.datereceivedconfirm = datereceivedconfirm
    newdata.datewarranty = datewarranty
    newdata.name = name
    newdata.picture = picture
    newdata.price = price
    newdata.productstatus = productstatus
    newdata.producttype = producttype
    newdata.refmoney = refmoney
    newdata.serial_number = serial_number
    newdata.license_number = license_number
    newdata.ownerid = ownerid
    newdata.ownername = ownername
    newdata.ownerdepartment = ownerdepartment
    newdata.ownernamehistory = ownernamehistory
    newdata.ownerdepartmenthistory = ownerdepartmenthistory
    newdata.ageproductday = ageproductday
    newdata.ageproductmonth = ageproductmonth
    newdata.ageproductyear = ageproductyear
    newdata.remark = remark
    newdata.activeStatus = activeStatus
    newdata.atarea = atarea
    newdata.id = id
    try {
      newdata.updated = new Date();
      const result = await repository.Update(newdata.id, newdata);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static deleteProduct = async (req: Request, res: Response) => {
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
