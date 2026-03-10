// 服务器主入口
const express = require('express');
const cors = require('cors');
const path = require('path');

// 初始化数据库
require('./database');

// 导入中间件
const { authMiddleware } = require('./middleware/auth');

// 导入路由
const authRoutes = require('./routes/auth');
const outfitsRoutes = require('./routes/outfits');
const clothsRoutes = require('./routes/cloths');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件配置
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 静态文件服务（用于上传的图片）
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 认证中间件
app.use(authMiddleware);

// 路由注册
app.use('/api/auth', authRoutes);
app.use('/api/outfits', outfitsRoutes);
app.use('/api/cloths', clothsRoutes);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: '服务器运行正常',
    timestamp: new Date().toISOString()
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ 
    success: false, 
    message: '服务器内部错误' 
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: '接口不存在' 
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║     小猫猫的衣橱 - 后端服务器启动成功          ║
╠════════════════════════════════════════════════╣
║  服务地址: http://localhost:${PORT}               ║
║  API前缀:  /api                                ║
╠════════════════════════════════════════════════╣
║  接口列表:                                     ║
║  POST /api/auth/register  - 用户注册           ║
║  POST /api/auth/login     - 用户登录           ║
║  GET  /api/auth/me        - 获取用户信息       ║
║  PUT  /api/auth/profile   - 更新用户信息       ║
║  GET  /api/outfits        - 获取穿搭列表       ║
║  POST /api/outfits        - 保存穿搭           ║
║  DELETE /api/outfits/:id  - 删除穿搭           ║
║  GET  /api/cloths         - 获取服饰列表       ║
║  POST /api/cloths         - 上传服饰           ║
║  DELETE /api/cloths/:id   - 删除服饰           ║
╚════════════════════════════════════════════════╝
  `);
});

