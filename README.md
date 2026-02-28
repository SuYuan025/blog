# 博客项目

一个基于 Vue 3 和 Express 的前后端分离博客系统，支持文章管理、分类管理和用户登录等功能。

## 技术栈

### 前端
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite** - 下一代前端构建工具
- **Naive UI** - Vue 3 组件库
- **Pinia** - Vue 3 状态管理库
- **Vue Router** - Vue 路由管理器
- **Axios** - HTTP 客户端
- **WangEditor** - 富文本编辑器

### 后端
- **Node.js** - JavaScript 运行时环境
- **Express** - Node.js Web 应用框架
- **MySQL** - 关系型数据库
- **Multer** - 文件上传中间件
- **SnowFlake** - 分布式 ID 生成器

## 功能特性

### 前端功能
- 登录页面
- 主页文章列表展示
- 文章详情页
- 后台管理系统
  - 文章管理（增删改查）
  - 分类管理（增删改查）

### 后端功能
- 文章管理接口
- 分类管理接口
- 用户登录接口
- 文件上传接口
- 跨域支持

## API 接口

### 文章管理
- `GET /blog/search` - 获取文章列表
- `GET /blog/detail` - 获取文章详情
- `POST /blog/_token/add` - 新增文章
- `DELETE /blog/_token/delete` - 删除文章
- `PUT /blog/_token/update` - 修改文章

### 分类管理
- `GET /category/list` - 获取分类列表
- `POST /category/_token/add` - 新增分类
- `DELETE /category/_token/delete` - 删除分类
- `PUT /category/_token/update` - 修改分类

### 用户管理
- `POST /admin/login` - 用户登录
