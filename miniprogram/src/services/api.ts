// API 服务层 - 小程序版本
import Taro from '@tarojs/taro'

// 后端服务器地址 - 请根据实际情况修改
const API_BASE_URL = 'https://your-server.com/api'

// Token 管理
const TOKEN_KEY = 'clothes_change_token'

export function getToken(): string | null {
  return Taro.getStorageSync(TOKEN_KEY) || null
}

export function setToken(token: string): void {
  Taro.setStorageSync(TOKEN_KEY, token)
}

export function removeToken(): void {
  Taro.removeStorageSync(TOKEN_KEY)
}

export function isLoggedIn(): boolean {
  return !!getToken()
}

// 通用请求方法
async function request<T>(
  endpoint: string, 
  options: { method?: string; data?: any } = {}
): Promise<T> {
  const token = getToken()
  
  const header: Record<string, string> = {
    'Content-Type': 'application/json'
  }

  if (token) {
    header['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await Taro.request({
      url: `${API_BASE_URL}${endpoint}`,
      method: (options.method as any) || 'GET',
      data: options.data,
      header
    })

    if (response.statusCode >= 400) {
      throw new Error(response.data?.message || '请求失败')
    }

    return response.data
  } catch (error: any) {
    console.error('API请求失败:', error)
    throw error
  }
}

// ==================== 认证相关 API ====================

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
  name?: string
  email?: string
  phone?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    token: string
    user: UserData
  }
}

export interface UserData {
  id: number
  username: string
  name: string
  email: string
  phone: string
  avatar: string
}

// 登录
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    data
  })
  
  if (response.success && response.data.token) {
    setToken(response.data.token)
  }
  
  return response
}

// 注册
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await request<AuthResponse>('/auth/register', {
    method: 'POST',
    data
  })
  
  if (response.success && response.data.token) {
    setToken(response.data.token)
  }
  
  return response
}

// 登出
export function logout(): void {
  removeToken()
  Taro.removeStorageSync('clothes_change_user')
}

// 获取当前用户信息
export async function getCurrentUser(): Promise<{ success: boolean; data: UserData }> {
  return request('/auth/me')
}

// 更新用户信息
export async function updateProfile(data: Partial<UserData>): Promise<{ success: boolean; message: string }> {
  return request('/auth/profile', {
    method: 'PUT',
    data
  })
}

// ==================== 穿搭相关 API ====================

export interface OutfitData {
  id: string
  name: string
  items: any[]
  placedImages: any[]
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

// 获取穿搭列表
export async function getOutfits(): Promise<{ success: boolean; data: OutfitData[] }> {
  return request('/outfits')
}

// 保存穿搭
export async function saveOutfitToServer(outfit: Partial<OutfitData>): Promise<{ success: boolean; message: string; data: { id: string } }> {
  return request('/outfits', {
    method: 'POST',
    data: outfit
  })
}

// 删除穿搭
export async function deleteOutfitFromServer(outfitId: string): Promise<{ success: boolean; message: string }> {
  return request(`/outfits/${outfitId}`, {
    method: 'DELETE'
  })
}

// ==================== 服饰相关 API ====================

export interface ClothData {
  id: string
  name: string
  imagePath: string
  category: string
  clothType: string
  uploadedAt: string
}

// 获取服饰列表
export async function getCloths(): Promise<{ success: boolean; data: ClothData[] }> {
  return request('/cloths')
}

// 上传服饰
export async function uploadClothToServer(cloth: Partial<ClothData>): Promise<{ success: boolean; message: string; data: { id: string } }> {
  return request('/cloths', {
    method: 'POST',
    data: cloth
  })
}

// 删除服饰
export async function deleteClothFromServer(clothId: string): Promise<{ success: boolean; message: string }> {
  return request(`/cloths/${clothId}`, {
    method: 'DELETE'
  })
}

