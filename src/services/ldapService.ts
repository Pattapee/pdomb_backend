import axios from 'axios'
import { Request, Response } from 'express'
import qs from 'qs'
import {
  HTTPSTATUS_BADREQUEST,
  HTTPSTATUS_NOTFOUND,
  HTTPSTATUS_OK
} from '../constants/HttpStatus'

const userDB = 'mssql://sa:Passw0rd!@192.168.2.21/OA_OMB'

export default class LdapServices {

  public static userAuthen = async (req: Request, res: Response) => {
    const { username, password } = req.body
    try {
      const result = await axios({
        method: 'post',
        url: 'http://127.0.0.1/ldap/connect_ldap.php',
        data: qs.stringify({
          username,
          pass: password
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      if (result.data === 1) {
        // res.status(HTTPSTATUS_OK).send({ data: result.data })
        // Coding in my home.
        res.status(HTTPSTATUS_OK).send({ data: 1 })
      } else {
        res.status(HTTPSTATUS_OK).send({ data: 'Invalid login Active Directory' })
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
          (u.fullname) as fullname, (u.email) as email,
          (u.POSITION1) as position, d.FULLNAME as department
        from PC_USERS as u
        LEFT OUTER JOIN PC_USERS d on d.USERID = u.PARENTID
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
    // Coding in my home
    // const result = {
    //   userid: 739,
    //   fullname: 'นายปฐพี สิงหะ',
    //   email: 'pattapee@ombudsman.go.th',
    //   position: 'นักวิชาการคอมพิวเตอร์ปฏิบัติการ',
    //   department: 'สำนักเทคโนโลยีสารสนเทศและการสื่อสาร'
    // }
    // res.status(HTTPSTATUS_OK).send(result)

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
        `select (u.userid) as userid,
        (u.fullname) as fullname, (u.email) as email,
        (u.POSITION1) as position, d.FULLNAME as department
      from PC_USERS as u
      LEFT OUTER JOIN PC_USERS d on d.USERID = u.PARENTID
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
    // Coding in my home
    // const result = {
    //   userid: 739,
    //   fullname: 'นายปฐพี สิงหะ',
    //   email: 'pattapee@ombudsman.go.th',
    //   position: 'นักวิชาการคอมพิวเตอร์ปฏิบัติการ',
    //   department: 'สำนักเทคโนโลยีสารสนเทศและการสื่อสาร'
    // }
    // res.status(HTTPSTATUS_OK).send(result)
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
        `select (u.userid) as userid,
          (u.fullname) as fullname, (u.email) as email,
          (u.POSITION1) as position, d.FULLNAME as department
        from PC_USERS as u
        LEFT OUTER JOIN PC_USERS d on d.USERID = u.PARENTID
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
    // Coding in my home
    // const result = {
    //   userid: 739,
    //   fullname: 'นายปฐพี สิงหะ',
    //   email: 'pattapee@ombudsman.go.th',
    //   position: 'นักวิชาการคอมพิวเตอร์ปฏิบัติการ',
    //   department: 'สำนักเทคโนโลยีสารสนเทศและการสื่อสาร'
    // }
    // res.status(HTTPSTATUS_OK).send(result)
  }

}
