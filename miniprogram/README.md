# 小猫猫的衣橱 - 微信小程序版

基于 Taro 框架开发的微信小程序版本，支持多端构建。

## 技术栈

- **Taro 3.x** - 多端统一开发框架
- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Less** - CSS 预处理器

## 功能特性

- 📝 用户注册登录
- 👔 穿搭编辑与保存
- 📤 服饰图片上传
- 👤 个人信息管理
- 🔄 数据云端同步

## 项目结构

```
miniprogram/
├── config/                 # Taro 配置
│   └── index.ts
├── src/
│   ├── app.config.ts      # 应用配置
│   ├── app.ts             # 应用入口
│   ├── app.less           # 全局样式
│   ├── pages/             # 页面
│   │   ├── index/         # 首页
│   │   ├── login/         # 登录页
│   │   ├── edit/          # 编辑穿搭
│   │   ├── outfits/       # 穿搭列表
│   │   ├── profile/       # 个人信息
│   │   └── upload/        # 上传服饰
│   ├── services/          # API 服务
│   │   └── api.ts
│   ├── utils/             # 工具函数
│   │   └── storage.ts
│   └── types/             # 类型定义
│       └── index.ts
├── project.config.json    # 小程序配置
├── tsconfig.json
├── babel.config.js
└── package.json
```

## 开发指南

### 1. 安装依赖

```bash
cd miniprogram
npm install
```

### 2. 开发模式

```bash
# 微信小程序
npm run dev:weapp

# H5 网页
npm run dev:h5
```

### 3. 构建发布

```bash
# 微信小程序
npm run build:weapp

# H5 网页
npm run build:h5
```

### 4. 微信开发者工具导入

1. 打开微信开发者工具
2. 选择"导入项目"
3. 目录选择 `miniprogram` 文件夹
4. 填入你的 AppID（或使用测试号）
5. 点击确定

## 配置说明

### 后端服务器配置

在 `src/services/api.ts` 中修改 `API_BASE_URL`：

```typescript
const API_BASE_URL = 'https://your-server.com/api'
```

### 小程序 AppID 配置

在 `project.config.json` 中修改 `appid`：

```json
{
  "appid": "你的小程序AppID"
}
```

### 服务器域名配置

在微信公众平台后台配置以下域名：
- request 合法域名：`https://your-server.com`

## 注意事项

1. **图片上传**：小程序中图片会转换为 base64 存储
2. **网络请求**：需要在小程序后台配置服务器域名
3. **本地存储**：使用 `Taro.setStorageSync` 代替 `localStorage`
4. **导航**：使用 `Taro.navigateTo` / `Taro.switchTab` 代替 `react-router`

## 与 Web 版本的差异

| 功能 | Web 版 | 小程序版 |
|------|--------|----------|
| 路由 | react-router | Taro 路由 |
| 存储 | localStorage | wx.setStorageSync |
| UI 组件 | Ant Design | Taro 组件 |
| 网络请求 | fetch | Taro.request |
| 图片选择 | input[type=file] | Taro.chooseImage |

## 发布流程

1. 修改 `project.config.json` 中的 AppID
2. 配置服务器域名（微信公众平台）
3. 运行 `npm run build:weapp`
4. 使用微信开发者工具上传代码
5. 提交审核

## 常见问题

**Q: 提示"不在以下 request 合法域名列表中"**

A: 在微信公众平台 -> 开发 -> 开发设置 中添加服务器域名

**Q: 图片无法显示**

A: 检查图片路径是否正确，或图片是否为有效的 base64 格式

**Q: 请求失败**

A: 确保后端服务器已启动，且域名已配置到小程序后台

