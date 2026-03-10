# 小猫猫的衣橱 - 后端服务器

## 技术栈
- Node.js + Express
- SQLite (better-sqlite3)
- JWT 认证
- bcryptjs 密码加密

## 安装与启动

### 1. 安装后端依赖
```bash
cd server
npm install
```

### 2. 启动服务器
```bash
npm start
```

服务器将在 http://localhost:3001 启动

## API 接口

### 认证相关

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| POST | /api/auth/register | 用户注册 | 否 |
| POST | /api/auth/login | 用户登录 | 否 |
| GET | /api/auth/me | 获取当前用户信息 | 是 |
| PUT | /api/auth/profile | 更新用户信息 | 是 |

### 穿搭管理

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| GET | /api/outfits | 获取穿搭列表 | 是 |
| GET | /api/outfits/:id | 获取穿搭详情 | 是 |
| POST | /api/outfits | 创建/更新穿搭 | 是 |
| DELETE | /api/outfits/:id | 删除穿搭 | 是 |

### 服饰管理

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| GET | /api/cloths | 获取服饰列表 | 是 |
| POST | /api/cloths | 上传服饰 | 是 |
| DELETE | /api/cloths/:id | 删除服饰 | 是 |

## 数据库结构

### users 表
| 字段 | 类型 | 描述 |
|------|------|------|
| id | INTEGER | 主键 |
| username | TEXT | 用户名（唯一） |
| password | TEXT | 密码（加密） |
| name | TEXT | 昵称 |
| avatar | TEXT | 头像（base64） |
| email | TEXT | 邮箱 |
| phone | TEXT | 手机号 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

### outfits 表
| 字段 | 类型 | 描述 |
|------|------|------|
| id | INTEGER | 主键 |
| user_id | INTEGER | 用户ID |
| outfit_id | TEXT | 穿搭唯一标识 |
| name | TEXT | 穿搭名称 |
| items | TEXT | 服饰项目（JSON） |
| placed_images | TEXT | 放置的图片（JSON） |
| thumbnail | TEXT | 缩略图 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

### uploaded_cloths 表
| 字段 | 类型 | 描述 |
|------|------|------|
| id | INTEGER | 主键 |
| user_id | INTEGER | 用户ID |
| cloth_id | TEXT | 服饰唯一标识 |
| name | TEXT | 服饰名称 |
| image_path | TEXT | 图片路径（base64） |
| category | TEXT | 分类 |
| cloth_type | TEXT | 服饰类型 |
| uploaded_at | DATETIME | 上传时间 |

## 认证方式

使用 JWT Token 认证，请求时在 Header 中添加：
```
Authorization: Bearer <token>
```

Token 有效期：7天

