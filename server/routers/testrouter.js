const express = require("express");
const router = express.Router()
const { db, genId } = require('../db/dbUtils.js')

router.get('/', async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM admin")
  console.log(`output->rows`, rows)
  res.send({
    id: genId.NextId(),
    admin: rows
  })
})

module.exports = router