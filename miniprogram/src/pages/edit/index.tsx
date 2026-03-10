import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { saveOutfit, getUploadedCloths } from '../../utils/storage'
import { CategoryType, ClothType, DraggableImage as DraggableImageType } from '../../types'
import './index.less'

// 服饰分类数据
const categories: { category: CategoryType; name: string; items: { id: ClothType; name: string }[] }[] = [
  {
    category: '上装',
    name: '上装',
    items: [
      { id: '内搭', name: '内搭' },
      { id: '外套', name: '外套' }
    ]
  },
  {
    category: '下装',
    name: '下装',
    items: [
      { id: '裤子', name: '裤子' },
      { id: '裙子', name: '裙子' }
    ]
  },
  {
    category: '鞋类',
    name: '鞋类',
    items: [
      { id: '鞋子', name: '鞋子' },
      { id: '袜子', name: '袜子' }
    ]
  },
  {
    category: '配饰',
    name: '配饰',
    items: [
      { id: '帽子', name: '帽子' },
      { id: '包包', name: '包包' },
      { id: '墨镜', name: '墨镜' },
      { id: '耳环', name: '耳环' },
      { id: '项链', name: '项链' }
    ]
  }
]

export default function Edit() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('上装')
  const [selectedImages, setSelectedImages] = useState<DraggableImageType[]>([])
  const [outfitName, setOutfitName] = useState('')

  const uploadedCloths = getUploadedCloths()

  const handleSelectCloth = (imagePath: string, clothType: ClothType) => {
    const newImage: DraggableImageType = {
      id: `img_${Date.now()}`,
      src: imagePath,
      x: 50 + selectedImages.length * 30,
      y: 50 + selectedImages.length * 30,
      width: 120,
      height: 120,
      rotation: 0,
      clothType
    }
    setSelectedImages([...selectedImages, newImage])
  }

  const handleRemoveImage = (id: string) => {
    setSelectedImages(selectedImages.filter(img => img.id !== id))
  }

  const handleSave = async () => {
    if (!outfitName) {
      Taro.showToast({ title: '请输入穿搭名称', icon: 'none' })
      return
    }

    if (selectedImages.length === 0) {
      Taro.showToast({ title: '请选择至少一件服饰', icon: 'none' })
      return
    }

    const outfit = {
      id: `outfit_${Date.now()}`,
      name: outfitName,
      items: [],
      placedImages: selectedImages.map(img => ({
        src: img.src,
        x: img.x,
        y: img.y
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    await saveOutfit(outfit)
    Taro.showToast({ title: '保存成功', icon: 'success' })
    setSelectedImages([])
    setOutfitName('')
  }

  const currentItems = categories.find(c => c.category === selectedCategory)?.items || []
  const categoryUploadedCloths = uploadedCloths.filter(c => c.category === selectedCategory)

  return (
    <View className='edit-page'>
      {/* 展示区域 */}
      <View className='preview-area'>
        <Text className='preview-title'>穿搭预览</Text>
        <View className='preview-content'>
          {selectedImages.length === 0 ? (
            <Text className='preview-empty'>点击下方服饰添加到穿搭</Text>
          ) : (
            selectedImages.map(img => (
              <View key={img.id} className='preview-item' onClick={() => handleRemoveImage(img.id)}>
                <Image src={img.src} mode='aspectFit' className='preview-image' />
                <View className='remove-btn'>✕</View>
              </View>
            ))
          )}
        </View>
      </View>

      {/* 分类Tab */}
      <ScrollView scrollX className='category-tabs'>
        {categories.map(cat => (
          <View 
            key={cat.category}
            className={`category-tab ${selectedCategory === cat.category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.category)}
          >
            {cat.name}
          </View>
        ))}
      </ScrollView>

      {/* 服饰列表 */}
      <ScrollView scrollY className='cloth-list'>
        <View className='cloth-grid'>
          {/* 预设服饰类型 */}
          {currentItems.map(item => (
            <View 
              key={item.id} 
              className='cloth-item'
              onClick={() => handleSelectCloth(`/assets/cloths/${item.id}.png`, item.id)}
            >
              <View className='cloth-placeholder'>
                <Text>{item.name}</Text>
              </View>
              <Text className='cloth-name'>{item.name}</Text>
            </View>
          ))}
          
          {/* 用户上传的服饰 */}
          {categoryUploadedCloths.map(cloth => (
            <View 
              key={cloth.id} 
              className='cloth-item'
              onClick={() => handleSelectCloth(cloth.imagePath, cloth.clothType)}
            >
              <Image src={cloth.imagePath} mode='aspectFit' className='cloth-image' />
              <Text className='cloth-name'>{cloth.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 保存按钮 */}
      <View className='save-area'>
        <View className='input-wrapper'>
          <input
            className='name-input'
            placeholder='穿搭名称'
            value={outfitName}
            onInput={(e: any) => setOutfitName(e.target.value)}
          />
        </View>
        <View className='btn btn-primary' onClick={handleSave}>
          保存穿搭
        </View>
      </View>
    </View>
  )
}

