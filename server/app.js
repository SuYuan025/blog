const express = require('express');
const multer = require('multer');
const app = express();
const { connectDB } = require('./db/dbUtils.js');
const port = 1025

app.use(function (req, res, next) {
  // 设置允许跨域的域名
  res.header("Access-Control-Allow-Origin", "*");
  // 设置允许跨域的请求方法
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // 设置允许跨域的请求头
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})

app.use(express.json());

// 连接到 MySQL 数据库
connectDB();

// 上传
const upload = multer({
  dest: './public/uploads/temp',
})

// 使用Multer中间件并添加错误处理
app.use((req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      // 处理"Field name missing"错误
      if (err.code === 'LIMIT_FIELD_NAME') {
        res.status(400).send({
          errno: 1,
          message: '上传失败：请为文件指定字段名（键名）'
        });
        return;
      }
      // 处理其他Multer错误
      res.status(400).send({
        errno: 1,
        message: '上传失败：' + err.message
      });
      return;
    }
    next();
  });
});

// 路由
app.use('/test', require('./routers/testrouter.js'))
app.use('/admin', require('./routers/adminRouter.js'))
app.use('/category', require('./routers/categoryRouter.js'))
app.use('/blog', require('./routers/blogRouter.js'))
app.use('/upload', require('./routers/uploadRouter.js'))

// 添加 favicon 处理
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // 返回空响应
})

app.listen(port, () => {
  console.log(`启动成功: http://localhost:${port}/`);
})