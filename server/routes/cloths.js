// 服饰管理路由
const express = require('express');
const db = require('../database');

const router = express.Router();

// 获取用户所有上传的服饰
router.get('/', (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: '未登录' 
      });
    }

    const cloths = db.prepare(`
      SELECT cloth_id, name, image_path, category, cloth_type, uploaded_at
      FROM uploaded_cloths
      WHERE user_id = ?
      ORDER BY uploaded_at DESC
    `).all(user.userId);

    // 转换字段名
    const parsedCloths = cloths.map(cloth => ({
      id: cloth.cloth_id,
      name: cloth.name,
      imagePath: cloth.image_path,
      category: cloth.category,
      clothType: cloth.cloth_type,
      uploadedAt: cloth.uploaded_at
    }));

    res.json({
      success: true,
      data: parsedCloths
    });
  } catch (error) {
    console.error('获取服饰列表失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '获取服饰列表失败' 
    });
  }
});

// 上传服饰
router.post('/', (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: '未登录' 
      });
    }

    const { id, name, imagePath, category, clothType } = req.body;

    if (!name || !imagePath || !category || !clothType) {
      return res.status(400).json({ 
        success: false, 
        message: '请填写完整信息' 
      });
    }

    const clothId = id || `cloth_${Date.now()}`;

    db.prepare(`
      INSERT INTO uploaded_cloths (user_id, cloth_id, name, image_path, category, cloth_type)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(user.userId, clothId, name, imagePath, category, clothType);

    res.json({
      success: true,
      message: '上传成功',
      data: { id: clothId }
    });
  } catch (error) {
    console.error('上传服饰失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '上传服饰失败' 
    });
  }
});

// 删除服饰
router.delete('/:clothId', (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: '未登录' 
      });
    }

    const { clothId } = req.params;

    const result = db.prepare(`
      DELETE FROM uploaded_cloths WHERE user_id = ? AND cloth_id = ?
    `).run(user.userId, clothId);

    if (result.changes === 0) {
      return res.status(404).json({ 
        success: false, 
        message: '服饰不存在' 
      });
    }

    res.json({
      success: true,
      message: '删除成功'
    });
  } catch (error) {
    console.error('删除服饰失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '删除服饰失败' 
    });
  }
});

module.exports = router;

