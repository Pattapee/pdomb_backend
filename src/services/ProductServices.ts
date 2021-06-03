import { Request, Response } from 'express';
import * as _ from 'lodash';
import moment from 'moment'
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
import { ProductStatus } from '../entities/ProductStatus';
import { ProductCategoryRepository } from '../repositories/ProductCategoryRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { ProductStatusRepository } from '../repositories/ProductStatusRepository';

let repository: ProductRepository;
let repositorystatus: ProductStatusRepository;
let repositorycategory: ProductCategoryRepository;
const initialize = () => {
  const connection = getConnection();
  repository = connection.getCustomRepository(ProductRepository);
  repositorystatus = connection.getCustomRepository(ProductStatusRepository)
  repositorycategory = connection.getCustomRepository(ProductCategoryRepository)

};

export default class ProductServices {

  public static getAllProduct = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getAll();
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static getAllByproductTypes = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getAllByTypeID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static getAllByproductStatus = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getAllByStatusID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static getOneProductByID = async (req: Request, res: Response) => {
    initialize();
    try {
      const result = await repository.getOneByID(+req.params.id);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  };

  public static getCountByCategoryandstatus = async (req: Request, res: Response) => {
    initialize();
    const {
      category,
      status,
    } = req.body;
    try {
      const result = await repository.getCountByCategoryandstatus(category, status);
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  }

  public static getProductList = async (req: Request, res: Response) => {
    initialize();
    try {
      const { datecheckageproduct, productstatus, producttype } = req.body
      let products = []
      if (productstatus <= 0) {
        products = await repository.getAllByTypeID(producttype)
      } else {
        products = await repository.getAllByStatusAndType(productstatus, producttype)
      }
      if (datecheckageproduct) {
        products = await _.filter(products, (value, key) => {
          const datecal = moment(value.datereceivedconfirm).add(+value.ageproductyear, 'year').add(+value.ageproductday, 'day')
          return (moment(datecal).diff(moment(datecheckageproduct), 'days') <= 0)
        })
      }
      res.status(HTTPSTATUS_OK).send(products);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_NOTFOUND).send({ data: 'Invalid find Product !!!' });
    }
  }

  public static SaveProduct = async (req: Request, res: Response) => {
    initialize();
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
      remark,
      owneridhistory,
      ownernamehistory,
      detailproduct,
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
    data.owneridhistory = owneridhistory
    data.ownernamehistory = ownernamehistory
    data.ageproductday = ageproductday
    data.ageproductmonth = ageproductmonth
    data.ageproductyear = ageproductyear
    data.remark = remark
    data.atarea = atarea
    data.detailproduct = detailproduct
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
    initialize();
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
      owneridhistory,
      ownernamehistory,
      ageproductyear,
      ageproductmonth,
      ageproductday,
      remark,
      activeStatus,
      atarea,
      detailproduct,
      id
    } = req.body;
    const newdata = new Product();
    newdata.code = code
    newdata.datereceived = datereceived
    newdata.datereceivedconfirm = datereceivedconfirm
    newdata.datewarranty = datewarranty
    newdata.name = name
    newdata.detailproduct = detailproduct
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
    newdata.owneridhistory = owneridhistory
    newdata.ownernamehistory = ownernamehistory
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
    initialize();
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

  public static getCountProductDashboard = async (req: Request, res: Response) => {
    if (repositorycategory === undefined && repositorystatus === undefined) {
      initialize();
    }
    try {
      const categorys = await repositorycategory.getAll();

      const result = await Promise.all(_.map(categorys, async (value1) => {
        const status = await repositorystatus.getAll()
        const statusNew = await Promise.all(_.map(status, async (value2) => {
          return {
            status: value2.status,
            id: value2.id,
            count: await repository.getCountByCategoryandstatus(value1.id, value2.id)
          }
        }))
        const productlated5 = await repository.getAlllimit(value1.id, 10)
        return {
          category: value1.category,
          id: value1.id,
          status: statusNew,
          productCategory5: productlated5
        }
      }))
      res.status(HTTPSTATUS_OK).send(result);
    } catch (e) {
      console.error(e);
      res.status(HTTPSTATUS_BADREQUEST).send({ data: 'Invalid find Dashboard !!!' });
    }
  }
}
