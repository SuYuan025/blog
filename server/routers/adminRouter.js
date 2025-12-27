const express = require("express");
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const { db, genId } = require('../db/dbUtils.js')

router.post('/login', async (req, res) => {
  try {
    let { account, password } = req.body
    let result = await db.all('select * from admin where account = ? and password = ?', [account, password])

    if (result.data.length === 0) {
      return res.send({
        code: 400,
        msg: '账号或密码错误'
      })
    }

    let login_token = uuidv4()
    let upload_token_sql = 'update admin set token = ? where id = ?'

    await db.run(upload_token_sql, [login_token, result.data[0].id])

    let admin_info = result.data[0]
    admin_info.token = login_token
    // admin_info.password = ''

    res.send({
      code: 200,
      msg: '登陆成功',
      data: {
        user: result.data[0]
      }
    })
  } catch (error) {
    console.error('登录错误:', error)
    res.send({
      code: 500,
      msg: '登陆失败'
    })
  }
})

module.exports = router