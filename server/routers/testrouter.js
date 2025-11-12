const express = require("express");
const router = express.Router()
const { db, genId } = require('../db/dbUtils.js')

router.get('/', async (req, res) => {
  try {
    // 查询语句
    const result = await db.all('select * from admin')


    // 状态
    if (!result.success) {
      throw new Error(result.error)
    }

    // 数据返回
    res.send({
      id: genId.NextId(),
      result: result.data
    })

  } catch (error) {
    console.error('失败:', error)
    res.status(500).send({ error: '查询失败' })
  }
})

module.exports = router