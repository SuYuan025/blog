const express = require("express");
const router = express.Router()
const { db, genId } = require('../db/dbUtils.js')

// 添加博客
router.post('/add', async (req, res) => {
  try {
    let { title, categoryId, content } = req.body
    let id = genId.NextId()
    let create_time = new Date().getTime()

    const insert_sql = 'insert into blog(id, title, category_id, content, create_time) values (?,?,?,?,?)'
    let params = [id, title, categoryId, content, create_time]

    let result = await db.run(insert_sql, [params])

    res.send({
      code: 200,
      msg: '添加成功',
      data: result.data
    })
  } catch {
    res.send({
      code: 500,
      msg: '添加失败'
    })
  }
})

// 删除博客
router.delete('/delete', async (req, res) => {
  try {
    let id = req.query.id
    const delete_sql = 'delete from blog where id = ?'
    let result = await db.run(delete_sql, [id])

    res.send({
      code: 200,
      msg: '删除成功',
      data: result.data
    })
  } catch {
    res.send({
      code: 500,
      msg: '删除失败'
    })
  }
})

// 修改博客
router.put('/update', async (req, res) => {
  try {
    let { id, title, categoryId, content } = req.body
    let create_time = new Date().getTime()

    const update_sql = 'update blog set title = ?, content = ?, category_id = ? where id = ?'
    let params = [title, content, categoryId, id]

    let result = await db.run(update_sql, [params])

    res.send({
      code: 200,
      msg: '修改成功',
      data: result.data
    })
  } catch {
    res.send({
      code: 500,
      msg: '修改失败'
    })
  }
})

// 查询博客
router.get('/search', async (req, res) => {
  try {


    res.send({
      code: 200,
      msg: '查询成功',
      data: result.data
    })
  } catch {
    res.send({
      code: 500,
      msg: '查询失败'
    })
  }
})

module.exports = router