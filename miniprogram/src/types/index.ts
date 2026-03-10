// 类型定义文件

export type ClothType = '内搭' | '外套' | '下装' | '鞋子' | '配饰' | '袜子' | 
  '帽子' | '包包' | '发夹' | '墨镜' | '耳环' | '项链' | 
  '裙子' | '裤子';

export type CategoryType = '上装' | '下装' | '配饰' | '鞋类';

export interface CategoryItem {
  id: ClothType;
  name: string;
  imagePath: string;
  description: string;
}

export interface CategoryConfig {
  category: CategoryType;
  name: string;
  items: CategoryItem[];
  hasSubMenu: boolean;
}

export interface PlacedImage {
  src: string;
  x: number;
  y: number;
}

export interface DraggableImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  clothType: ClothType;
}

export interface OutfitItem {
  clothType: ClothType;
  position: { x: number; y: number };
}

export interface SavedOutfit {
  id: string;
  name: string;
  items: OutfitItem[];
  placedImages: PlacedImage[];
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
}

export interface UserInfo {
  name: string;
  avatar?: string;
  email?: string;
  phone?: string;
}

export interface UploadedCloth {
  id: string;
  name: string;
  imagePath: string;
  category: CategoryType;
  clothType: ClothType;
  uploadedAt: string;
}

