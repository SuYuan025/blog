const express = require("express");
const router = express.Router()
const fs = require('fs')
const { db, genId } = require('../db/dbUtils.js')

router.post('/rich_editor_upload', async (req, res) => {

  if (!req.files) {
    res.send({
      errno: 1,
      message: '上传失败'
    })
    return
  }

  let files = req.files
  let ret_files = []

  for (let file of files) {
    // 获取文件名字后缀
    let file_ext = file.originalname.substring(file.originalname.lastIndexOf('.') + 1)
    // 随机文件名称
    let file_name = genId.NextId() + '.' + file_ext

    // 修改名字加移动文件
    fs.renameSync(
      process.cwd() + '/public/uploads/temp/' + file.filename,
      process.cwd() + '/public/uploads/' + file_name
    )
    ret_files.push({
      url: '/uploads/' + file_name
    })
  }

  res.send({
    errno: 0,
    data: {
      url: ret_files[0],
    }
  })

})

module.exports = router