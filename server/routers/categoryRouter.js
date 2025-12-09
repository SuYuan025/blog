const express = require("express");
const router = express.Router()
const { db, genId } = require('../db/dbUtils.js')

// 添加
router.post('/_token/add', async (req, res) => {
  try {
    let { name } = req.body
    const insert_sql = 'insert into category ( id, name ) values ( ?, ? )'
    let result = await db.run(insert_sql, [genId.NextNumber(), name])

    res.send({
      code: 200,
      msg: '添加成功'
    })
  } catch (error) {
    res.send({
      code: 500,
      msg: '添加失败'
    })
  }
})

// 删除
router.delete('/_token/delete', async (req, res) => {
  try {
    let id = req.query.id
    const delete_sql = 'delete from category where id = ?'
    let result = await db.run(delete_sql, [id])

    res.send({
      code: 200,
      msg: '删除成功'
    })
  } catch (error) {
    res.send({
      code: 500,
      msg: '删除失败'
    })
  }
})

// 修改
router.put('/_token/update', async (req, res) => {
  try {
    let { id, name } = req.body
    const update_sql = 'update category set name = ? where id = ?'
    let result = await db.run(update_sql, [name, id])

    res.send({
      code: 200,
      msg: '修改成功'
    })
  } catch (error) {
    res.send({
      code: 500,
      msg: '修改失败'
    })
  }
})

// 列表
router.get('/list', async (req, res) => {
  try {
    const search_sql = 'select * from category'
    let result = await db.all(search_sql, [])

    res.send({
      code: 200,
      msg: '查询成功',
      data: result.data
    })
  } catch (error) {
    res.send({
      code: 500,
      msg: '查询失败'
    })
  }
})

module.exports = router