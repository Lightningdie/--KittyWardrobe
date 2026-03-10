// 穿搭管理路由
const express = require('express');
const db = require('../database');

const router = express.Router();

// 获取用户所有穿搭
router.get('/', (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: '未登录' 
      });
    }

    const outfits = db.prepare(`
      SELECT outfit_id, name, items, placed_images, thumbnail, created_at, updated_at
      FROM outfits
      WHERE user_id = ?
      ORDER BY updated_at DESC
    `).all(user.userId);

    // 解析JSON字段
    const parsedOutfits = outfits.map(outfit => ({
      id: outfit.outfit_id,
      name: outfit.name,
      items: outfit.items ? JSON.parse(outfit.items) : [],
      placedImages: outfit.placed_images ? JSON.parse(outfit.placed_images) : [],
      thumbnail: outfit.thumbnail,
      createdAt: outfit.created_at,
      updatedAt: outfit.updated_at
    }));

    res.json({
      success: true,
      data: parsedOutfits
    });
  } catch (error) {
    console.error('获取穿搭列表失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '获取穿搭列表失败' 
    });
  }
});

// 获取单个穿搭详情
router.get('/:outfitId', (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: '未登录' 
      });
    }

    const { outfitId } = req.params;

    const outfit = db.prepare(`
      SELECT outfit_id, name, items, placed_images, thumbnail, created_at, updated_at
      FROM outfits
      WHERE user_id = ? AND outfit_id = ?
    `).get(user.userId, outfitId);

    if (!outfit) {
      return res.status(404).json({ 
        success: false, 
        message: '穿搭不存在' 
      });
    }

    res.json({
      success: true,
      data: {
        id: outfit.outfit_id,
        name: outfit.name,
        items: outfit.items ? JSON.parse(outfit.items) : [],
        placedImages: outfit.placed_images ? JSON.parse(outfit.placed_images) : [],
        thumbnail: outfit.thumbnail,
        createdAt: outfit.created_at,
        updatedAt: outfit.updated_at
      }
    });
  } catch (error) {
    console.error('获取穿搭详情失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '获取穿搭详情失败' 
    });
  }
});

// 创建/更新穿搭
router.post('/', (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: '未登录' 
      });
    }

    const { id, name, items, placedImages, thumbnail } = req.body;

    if (!name) {
      return res.status(400).json({ 
        success: false, 
        message: '穿搭名称不能为空' 
      });
    }

    const outfitId = id || `outfit_${Date.now()}`;
    const itemsJson = JSON.stringify(items || []);
    const placedImagesJson = JSON.stringify(placedImages || []);

    // 检查是否已存在
    const existing = db.prepare(`
      SELECT id FROM outfits WHERE user_id = ? AND outfit_id = ?
    `).get(user.userId, outfitId);

    if (existing) {
      // 更新
      db.prepare(`
        UPDATE outfits 
        SET name = ?, items = ?, placed_images = ?, thumbnail = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND outfit_id = ?
      `).run(name, itemsJson, placedImagesJson, thumbnail || '', user.userId, outfitId);
    } else {
      // 创建
      db.prepare(`
        INSERT INTO outfits (user_id, outfit_id, name, items, placed_images, thumbnail)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(user.userId, outfitId, name, itemsJson, placedImagesJson, thumbnail || '');
    }

    res.json({
      success: true,
      message: existing ? '更新成功' : '保存成功',
      data: { id: outfitId }
    });
  } catch (error) {
    console.error('保存穿搭失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '保存穿搭失败' 
    });
  }
});

// 删除穿搭
router.delete('/:outfitId', (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: '未登录' 
      });
    }

    const { outfitId } = req.params;

    const result = db.prepare(`
      DELETE FROM outfits WHERE user_id = ? AND outfit_id = ?
    `).run(user.userId, outfitId);

    if (result.changes === 0) {
      return res.status(404).json({ 
        success: false, 
        message: '穿搭不存在' 
      });
    }

    res.json({
      success: true,
      message: '删除成功'
    });
  } catch (error) {
    console.error('删除穿搭失败:', error);
    res.status(500).json({ 
      success: false, 
      message: '删除穿搭失败' 
    });
  }
});

module.exports = router;

