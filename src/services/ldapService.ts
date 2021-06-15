import axios from 'axios'
import dotenv from 'dotenv';
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import * as _ from 'lodash';
import qs from 'qs'
import {
  HTTPSTATUS_BADREQUEST,
  HTTPSTATUS_NOTFOUND,
  HTTPSTATUS_OK
} from '../constants/HttpStatus'
dotenv.config();

const userDB = 'mssql://sa:Passw0rd!@192.168.2.21/OA_OMB'

export default class LdapServices {

  public static userAuthen = async (req: Request, res: Response) => {
    const mssql = require('mssql')
    let user = []
    const { username, password } = req.body
    // const result = {
    // data: {
    //   fullname: 'Pattapee Singha',
    //   displayname: 'Pattapee Singha',
    //   description: 'นักวิชาการคอมพิวเตอร์ปฎิบัติการ',
    //   mail: 'Pattapee@ombudsman.go.th',
    //   mobile: '0829533091',
    //   title: 'นักวิชาการคอมพิวเตอร์ปฎิบัติการ',
    //   department: 'สำนักเทคโนโลยีสารสนเทศและการสื่อสาร',
    //   company: 'สำนักงานผู้ตรวจการแผ่นดิน',
    //   officeName: 'ส่วนพัฒนาระบบสารสนเทศ',
    //   ipphone: '19161',
    //   fullnamethai: '',
    //   userid: 0
    // }
    // }
    try {
      const result = await axios({
        method: 'post',
        url: 'http://192.168.2.18/ldap/authenuser.php',
        data: qs.stringify({
          username,
          password
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      if (typeof result.data === 'object' && result.data !== null) {
        await mssql.connect(userDB)
        user = await mssql.query(
          `select top 1(u.userid) as userid,
        (u.fullname) as fullname
        from PC_USERS as u
        LEFT OUTER JOIN PC_USERS d on d.USERID = u.PARENTID
        where u.username = '${username}'
        and u.REMOVED is null
        and d.FULLNAME != 'เจ้าหน้าที่ลาออก/เกษียณ'`
        )
        await mssql.close()
        result.data.fullnamethai = user.recordset[0].fullname
        result.data.userid = user.recordset[0].userid
        // result.data.fullnamethai = 'นายปฐพี  สิงหะ'
        // result.data.userid = 739
        const token = await jwt.sign({
          data: result.data
        }, process.env.signtoken, { expiresIn: '3h' });
        res.status(HTTPSTATUS_OK).send(token)
      } else {
        res.status(HTTPSTATUS_OK).send(false)
      }
    } catch (err) {
      console.error(err)
      res.status(HTTPSTATUS_BADREQUEST).send(err)
    }
  }

  public static decoadUser = async (req: Request, res: Response) => {
    const { token } = req.body
    try {
      const user = await jwt.decode(token);
      if (user) {
        res.status(HTTPSTATUS_OK).send(user)
      }
    } catch (err) {
      console.error(err)
      res.status(HTTPSTATUS_BADREQUEST).send(err)
    }
  }

  public static searchByFullname = async (req: Request, res: Response) => {
    const mssql = require('mssql')
    let item = []
    const { fullname } = req.body
    // open connection db mssql and query get userid fullname email by fullname like 'req%'
    try {
      await mssql.close()
      await mssql.connect(userDB)
      item = await mssql.query(
        `select top 1 (u.userid) as userid,
          (u.fullname) as fullname
		      ,(u.email) as email
          ,(u.POSITION1) as position
		     ,d.FULLNAME as subdepartment
		      ,(d2.fullname) as department
        from PC_USERS as u
        LEFT OUTER JOIN PC_USERS d on d.USERID = u.PARENTID
		    LEFT OUTER JOIN PC_USERS d2 on d2.USERID = d.PARENTID
        where u.FULLNAME like '%${fullname}%'
        and u.REMOVED is null
        and d.FULLNAME != 'เจ้าหน้าที่ลาออก/เกษียณ'`
      )
      await mssql.close()
    } catch (err) {
      console.error(err)
      res.status(HTTPSTATUS_BADREQUEST).send(err)
    }
    // IF all ok, Send Http code 200 respons
    res.status(HTTPSTATUS_OK).send(item.recordset[0])
  }

  public static searchByFullnameExit = async (req: Request, res: Response) => {
    const mssql = require('mssql')
    let item = []
    const { fullname } = req.body
    // open connection db mssql and query get userid fullname email by fullname like 'req%'
    try {
      await mssql.close()
      await mssql.connect(userDB)
      item = await mssql.query(
        `select top 1 (u.userid) as userid,
          (u.fullname) as fullname
		      ,(u.email) as email
          ,(u.POSITION1) as position
		     ,d.FULLNAME as subdepartment
		      ,(d2.fullname) as department
        from PC_USERS as u
        LEFT OUTER JOIN PC_USERS d on d.USERID = u.PARENTID
		    LEFT OUTER JOIN PC_USERS d2 on d2.USERID = d.PARENTID
        where u.FULLNAME like '%${fullname}%'
        and u.REMOVED is null`
      )
      await mssql.close()
    } catch (err) {
      console.error(err)
      res.status(HTTPSTATUS_BADREQUEST).send(err)
    }
    // IF all ok, Send Http code 200 respons
    res.status(HTTPSTATUS_OK).send(item.recordset[0])
  }

  public static searchByUserID = async (req: Request, res: Response) => {
    const mssql = require('mssql')
    let item = []
    const { id } = req.body
    // open connection db mssql and query get userid fullname email by userid
    try {
      await mssql.close()
      await mssql.connect(userDB)
      item = await mssql.query(
        `select top 1 (u.userid) as userid,
          (u.fullname) as fullname
		      ,(u.email) as email
          ,(u.POSITION1) as position
		      ,d.FULLNAME as subdepartment
		      ,(d2.fullname) as department
        from PC_USERS as u
        LEFT OUTER JOIN PC_USERS d on d.USERID = u.PARENTID
		    LEFT OUTER JOIN PC_USERS d2 on d2.USERID = d.PARENTID
        where u.USERID = '${id}'
		    and u.REMOVED is null
		    and d.FULLNAME != 'เจ้าหน้าที่ลาออก/เกษียณ'`
      )
      await mssql.close()
    } catch (err) {
      res.status(HTTPSTATUS_BADREQUEST).send(err)
    }
    // IF all ok, Send Http code 200 respons
    res.status(HTTPSTATUS_OK).send(item.recordset[0])
  }

  public static searchByUsername = async (req: Request, res: Response) => {
    const mssql = require('mssql')
    let item = []
    const { username } = req.body
    // open connection db mssql and query get userid fullname email by userid
    try {
      await mssql.close()
      await mssql.connect(userDB)
      item = await mssql.query(
        `select top 1 (u.userid) as userid,
          (u.fullname) as fullname
		  ,(u.email) as email
          ,(u.POSITION1) as position
		  ,d.FULLNAME as subdepartment
		  ,(d2.fullname) as department
        from PC_USERS as u
        LEFT OUTER JOIN PC_USERS d on d.USERID = u.PARENTID
		LEFT OUTER JOIN PC_USERS d2 on d2.USERID = d.PARENTID
        where u.USERNAME = '${username}'
        and u.REMOVED is null
        and d.FULLNAME != 'เจ้าหน้าที่ลาออก/เกษียณ'`
      )
      await mssql.close()
    } catch (err) {
      console.error(err)
      res.status(HTTPSTATUS_BADREQUEST).send(err)
    }
    // IF all ok, Send Http code 200 respons
    res.status(HTTPSTATUS_OK).send(item.recordset[0])
  }

}
