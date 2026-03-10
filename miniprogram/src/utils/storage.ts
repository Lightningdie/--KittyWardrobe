// 小程序本地存储工具函数
import Taro from '@tarojs/taro'
import { SavedOutfit, UserInfo, UploadedCloth } from '../types'
import * as api from '../services/api'

const STORAGE_KEYS = {
  OUTFITS: 'clothes_change_outfits',
  USER_INFO: 'clothes_change_user_info',
  UPLOADED_CLOTHS: 'clothes_change_uploaded_cloths',
  USER: 'clothes_change_user'
}

// ==================== 穿搭存储 ====================

export async function saveOutfit(outfit: SavedOutfit): Promise<void> {
  saveOutfitLocal(outfit)
  
  if (api.isLoggedIn()) {
    try {
      await api.saveOutfitToServer({
        id: outfit.id,
        name: outfit.name,
        items: outfit.items,
        placedImages: outfit.placedImages,
        thumbnail: outfit.thumbnail
      })
    } catch (error) {
      console.warn('同步穿搭到服务器失败:', error)
    }
  }
}

function saveOutfitLocal(outfit: SavedOutfit): void {
  const outfits = getSavedOutfitsLocal()
  const existingIndex = outfits.findIndex(o => o.id === outfit.id)
  
  if (existingIndex >= 0) {
    outfits[existingIndex] = outfit
  } else {
    outfits.push(outfit)
  }
  
  Taro.setStorageSync(STORAGE_KEYS.OUTFITS, outfits)
}

export function getSavedOutfits(): SavedOutfit[] {
  return getSavedOutfitsLocal()
}

function getSavedOutfitsLocal(): SavedOutfit[] {
  return Taro.getStorageSync(STORAGE_KEYS.OUTFITS) || []
}

export async function deleteOutfit(outfitId: string): Promise<void> {
  deleteOutfitLocal(outfitId)
  
  if (api.isLoggedIn()) {
    try {
      await api.deleteOutfitFromServer(outfitId)
    } catch (error) {
      console.warn('从服务器删除穿搭失败:', error)
    }
  }
}

function deleteOutfitLocal(outfitId: string): void {
  const outfits = getSavedOutfitsLocal()
  const filtered = outfits.filter(o => o.id !== outfitId)
  Taro.setStorageSync(STORAGE_KEYS.OUTFITS, filtered)
}

export function getOutfitById(outfitId: string): SavedOutfit | null {
  const outfits = getSavedOutfitsLocal()
  return outfits.find(o => o.id === outfitId) || null
}

// ==================== 用户信息存储 ====================

export async function saveUserInfo(userInfo: UserInfo): Promise<void> {
  Taro.setStorageSync(STORAGE_KEYS.USER_INFO, userInfo)
  
  if (api.isLoggedIn()) {
    try {
      await api.updateProfile({
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        avatar: userInfo.avatar
      })
    } catch (error) {
      console.warn('同步用户信息到服务器失败:', error)
    }
  }
}

export function getUserInfo(): UserInfo | null {
  const userData = Taro.getStorageSync(STORAGE_KEYS.USER)
  if (userData) {
    return {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      avatar: userData.avatar
    }
  }
  
  return Taro.getStorageSync(STORAGE_KEYS.USER_INFO) || null
}

// ==================== 上传服饰存储 ====================

export async function saveUploadedCloth(cloth: UploadedCloth): Promise<void> {
  saveUploadedClothLocal(cloth)
  
  if (api.isLoggedIn()) {
    try {
      await api.uploadClothToServer({
        id: cloth.id,
        name: cloth.name,
        imagePath: cloth.imagePath,
        category: cloth.category,
        clothType: cloth.clothType
      })
    } catch (error) {
      console.warn('同步服饰到服务器失败:', error)
    }
  }
}

function saveUploadedClothLocal(cloth: UploadedCloth): void {
  const cloths = getUploadedClothsLocal()
  cloths.push(cloth)
  Taro.setStorageSync(STORAGE_KEYS.UPLOADED_CLOTHS, cloths)
}

export function getUploadedCloths(): UploadedCloth[] {
  return getUploadedClothsLocal()
}

function getUploadedClothsLocal(): UploadedCloth[] {
  return Taro.getStorageSync(STORAGE_KEYS.UPLOADED_CLOTHS) || []
}

export async function deleteUploadedCloth(clothId: string): Promise<void> {
  deleteUploadedClothLocal(clothId)
  
  if (api.isLoggedIn()) {
    try {
      await api.deleteClothFromServer(clothId)
    } catch (error) {
      console.warn('从服务器删除服饰失败:', error)
    }
  }
}

function deleteUploadedClothLocal(clothId: string): void {
  const cloths = getUploadedClothsLocal()
  const filtered = cloths.filter(c => c.id !== clothId)
  Taro.setStorageSync(STORAGE_KEYS.UPLOADED_CLOTHS, filtered)
}

// ==================== 登出清理 ====================

export function clearUserData(): void {
  api.logout()
  Taro.removeStorageSync(STORAGE_KEYS.USER)
  Taro.removeStorageSync(STORAGE_KEYS.USER_INFO)
}

