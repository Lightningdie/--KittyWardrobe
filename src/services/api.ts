// API 服务层
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Token 管理
const TOKEN_KEY = 'clothes_change_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

// 通用请求方法
async function request<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '请求失败');
  }

  return data;
}

// ==================== 认证相关 API ====================

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: UserData;
  };
}

export interface UserData {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

// 登录
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  if (response.success && response.data.token) {
    setToken(response.data.token);
  }
  
  return response;
}

// 注册
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await request<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  if (response.success && response.data.token) {
    setToken(response.data.token);
  }
  
  return response;
}

// 登出
export function logout(): void {
  removeToken();
  localStorage.removeItem('clothes_change_user');
}

// 获取当前用户信息
export async function getCurrentUser(): Promise<{ success: boolean; data: UserData }> {
  return request('/auth/me');
}

// 更新用户信息
export async function updateProfile(data: Partial<UserData>): Promise<{ success: boolean; message: string }> {
  return request('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// ==================== 穿搭相关 API ====================

export interface OutfitData {
  id: string;
  name: string;
  items: any[];
  placedImages: any[];
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

// 获取穿搭列表
export async function getOutfits(): Promise<{ success: boolean; data: OutfitData[] }> {
  return request('/outfits');
}

// 获取单个穿搭
export async function getOutfit(outfitId: string): Promise<{ success: boolean; data: OutfitData }> {
  return request(`/outfits/${outfitId}`);
}

// 保存穿搭
export async function saveOutfitToServer(outfit: Partial<OutfitData>): Promise<{ success: boolean; message: string; data: { id: string } }> {
  return request('/outfits', {
    method: 'POST',
    body: JSON.stringify(outfit),
  });
}

// 删除穿搭
export async function deleteOutfitFromServer(outfitId: string): Promise<{ success: boolean; message: string }> {
  return request(`/outfits/${outfitId}`, {
    method: 'DELETE',
  });
}

// ==================== 服饰相关 API ====================

export interface ClothData {
  id: string;
  name: string;
  imagePath: string;
  category: string;
  clothType: string;
  uploadedAt: string;
}

// 获取服饰列表
export async function getCloths(): Promise<{ success: boolean; data: ClothData[] }> {
  return request('/cloths');
}

// 上传服饰
export async function uploadClothToServer(cloth: Partial<ClothData>): Promise<{ success: boolean; message: string; data: { id: string } }> {
  return request('/cloths', {
    method: 'POST',
    body: JSON.stringify(cloth),
  });
}

// 删除服饰
export async function deleteClothFromServer(clothId: string): Promise<{ success: boolean; message: string }> {
  return request(`/cloths/${clothId}`, {
    method: 'DELETE',
  });
}

// ==================== 健康检查 ====================

export async function healthCheck(): Promise<{ success: boolean; message: string }> {
  return request('/health');
}

