// 本地存储工具函数 - 同时支持本地存储和后端API
import { SavedOutfit, UserInfo, UploadedCloth } from '../types';
import * as api from '../services/api';

const STORAGE_KEYS = {
  OUTFITS: 'clothes_change_outfits',
  USER_INFO: 'clothes_change_user_info',
  UPLOADED_CLOTHS: 'clothes_change_uploaded_cloths',
  USER: 'clothes_change_user'
};

// ==================== 穿搭存储 ====================

// 保存穿搭（同时保存到本地和服务器）
export async function saveOutfit(outfit: SavedOutfit): Promise<void> {
  // 先保存到本地
  saveOutfitLocal(outfit);
  
  // 如果已登录，同步到服务器
  if (api.isLoggedIn()) {
    try {
      await api.saveOutfitToServer({
        id: outfit.id,
        name: outfit.name,
        items: outfit.items,
        placedImages: outfit.placedImages,
        thumbnail: outfit.thumbnail
      });
    } catch (error) {
      console.warn('同步穿搭到服务器失败:', error);
    }
  }
}

// 本地保存穿搭
function saveOutfitLocal(outfit: SavedOutfit): void {
  const outfits = getSavedOutfitsLocal();
  const existingIndex = outfits.findIndex(o => o.id === outfit.id);
  
  if (existingIndex >= 0) {
    outfits[existingIndex] = outfit;
  } else {
    outfits.push(outfit);
  }
  
  localStorage.setItem(STORAGE_KEYS.OUTFITS, JSON.stringify(outfits));
}

// 获取保存的穿搭
export function getSavedOutfits(): SavedOutfit[] {
  return getSavedOutfitsLocal();
}

// 从服务器获取穿搭列表
export async function fetchOutfitsFromServer(): Promise<SavedOutfit[]> {
  if (!api.isLoggedIn()) {
    return getSavedOutfitsLocal();
  }
  
  try {
    const response = await api.getOutfits();
    if (response.success) {
      // 同步到本地
      localStorage.setItem(STORAGE_KEYS.OUTFITS, JSON.stringify(response.data));
      return response.data as unknown as SavedOutfit[];
    }
  } catch (error) {
    console.warn('从服务器获取穿搭失败:', error);
  }
  
  return getSavedOutfitsLocal();
}

// 本地获取穿搭
function getSavedOutfitsLocal(): SavedOutfit[] {
  const data = localStorage.getItem(STORAGE_KEYS.OUTFITS);
  return data ? JSON.parse(data) : [];
}

// 删除穿搭
export async function deleteOutfit(outfitId: string): Promise<void> {
  // 本地删除
  deleteOutfitLocal(outfitId);
  
  // 同步到服务器
  if (api.isLoggedIn()) {
    try {
      await api.deleteOutfitFromServer(outfitId);
    } catch (error) {
      console.warn('从服务器删除穿搭失败:', error);
    }
  }
}

// 本地删除穿搭
function deleteOutfitLocal(outfitId: string): void {
  const outfits = getSavedOutfitsLocal();
  const filtered = outfits.filter(o => o.id !== outfitId);
  localStorage.setItem(STORAGE_KEYS.OUTFITS, JSON.stringify(filtered));
}

// 根据ID获取穿搭
export function getOutfitById(outfitId: string): SavedOutfit | null {
  const outfits = getSavedOutfitsLocal();
  return outfits.find(o => o.id === outfitId) || null;
}

// ==================== 用户信息存储 ====================

// 保存用户信息
export async function saveUserInfo(userInfo: UserInfo): Promise<void> {
  // 保存到本地
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
  
  // 同步到服务器
  if (api.isLoggedIn()) {
    try {
      await api.updateProfile({
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        avatar: userInfo.avatar
      });
    } catch (error) {
      console.warn('同步用户信息到服务器失败:', error);
    }
  }
}

// 获取用户信息
export function getUserInfo(): UserInfo | null {
  // 优先从登录用户信息获取
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  if (userData) {
    const user = JSON.parse(userData);
    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar
    };
  }
  
  const data = localStorage.getItem(STORAGE_KEYS.USER_INFO);
  return data ? JSON.parse(data) : null;
}

// 从服务器获取用户信息
export async function fetchUserInfoFromServer(): Promise<UserInfo | null> {
  if (!api.isLoggedIn()) {
    return getUserInfo();
  }
  
  try {
    const response = await api.getCurrentUser();
    if (response.success) {
      const userInfo: UserInfo = {
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        avatar: response.data.avatar
      };
      localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
      return userInfo;
    }
  } catch (error) {
    console.warn('从服务器获取用户信息失败:', error);
  }
  
  return getUserInfo();
}

// ==================== 上传服饰存储 ====================

// 保存上传的服饰
export async function saveUploadedCloth(cloth: UploadedCloth): Promise<void> {
  // 本地保存
  saveUploadedClothLocal(cloth);
  
  // 同步到服务器
  if (api.isLoggedIn()) {
    try {
      await api.uploadClothToServer({
        id: cloth.id,
        name: cloth.name,
        imagePath: cloth.imagePath,
        category: cloth.category,
        clothType: cloth.clothType
      });
    } catch (error) {
      console.warn('同步服饰到服务器失败:', error);
    }
  }
}

// 本地保存服饰
function saveUploadedClothLocal(cloth: UploadedCloth): void {
  const cloths = getUploadedClothsLocal();
  cloths.push(cloth);
  localStorage.setItem(STORAGE_KEYS.UPLOADED_CLOTHS, JSON.stringify(cloths));
}

// 获取上传的服饰
export function getUploadedCloths(): UploadedCloth[] {
  return getUploadedClothsLocal();
}

// 从服务器获取服饰列表
export async function fetchClothsFromServer(): Promise<UploadedCloth[]> {
  if (!api.isLoggedIn()) {
    return getUploadedClothsLocal();
  }
  
  try {
    const response = await api.getCloths();
    if (response.success) {
      const cloths = response.data.map(item => ({
        id: item.id,
        name: item.name,
        imagePath: item.imagePath,
        category: item.category as any,
        clothType: item.clothType as any,
        uploadedAt: item.uploadedAt
      }));
      localStorage.setItem(STORAGE_KEYS.UPLOADED_CLOTHS, JSON.stringify(cloths));
      return cloths;
    }
  } catch (error) {
    console.warn('从服务器获取服饰失败:', error);
  }
  
  return getUploadedClothsLocal();
}

// 本地获取服饰
function getUploadedClothsLocal(): UploadedCloth[] {
  const data = localStorage.getItem(STORAGE_KEYS.UPLOADED_CLOTHS);
  return data ? JSON.parse(data) : [];
}

// 删除服饰
export async function deleteUploadedCloth(clothId: string): Promise<void> {
  // 本地删除
  deleteUploadedClothLocal(clothId);
  
  // 同步到服务器
  if (api.isLoggedIn()) {
    try {
      await api.deleteClothFromServer(clothId);
    } catch (error) {
      console.warn('从服务器删除服饰失败:', error);
    }
  }
}

// 本地删除服饰
function deleteUploadedClothLocal(clothId: string): void {
  const cloths = getUploadedClothsLocal();
  const filtered = cloths.filter(c => c.id !== clothId);
  localStorage.setItem(STORAGE_KEYS.UPLOADED_CLOTHS, JSON.stringify(filtered));
}

// ==================== 登出清理 ====================

export function clearUserData(): void {
  api.logout();
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  // 保留本地穿搭和服饰数据
}
