import { View, Text, Image, Input, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { saveUploadedCloth } from '../../utils/storage'
import { CategoryType, ClothType } from '../../types'
import './index.less'

const categories: { category: CategoryType; name: string; types: { id: ClothType; name: string }[] }[] = [
  {
    category: '上装',
    name: '上装',
    types: [
      { id: '内搭', name: '内搭' },
      { id: '外套', name: '外套' }
    ]
  },
  {
    category: '下装',
    name: '下装',
    types: [
      { id: '裤子', name: '裤子' },
      { id: '裙子', name: '裙子' }
    ]
  },
  {
    category: '鞋类',
    name: '鞋类',
    types: [
      { id: '鞋子', name: '鞋子' },
      { id: '袜子', name: '袜子' }
    ]
  },
  {
    category: '配饰',
    name: '配饰',
    types: [
      { id: '帽子', name: '帽子' },
      { id: '包包', name: '包包' },
      { id: '墨镜', name: '墨镜' },
      { id: '耳环', name: '耳环' },
      { id: '项链', name: '项链' }
    ]
  }
]

// 构建选择器数据
const categoryNames = categories.map(c => c.name)
const allTypes = categories.map(c => c.types.map(t => t.name))

export default function Upload() {
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState('')
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [typeIndex, setTypeIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleChooseImage = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        // 转换为base64
        Taro.getFileSystemManager().readFile({
          filePath: tempFilePath,
          encoding: 'base64',
          success: (data) => {
            const base64 = `data:image/jpeg;base64,${data.data}`
            setImageUrl(base64)
          }
        })
      }
    })
  }

  const handleCategoryChange = (e: any) => {
    const index = parseInt(e.detail.value)
    setCategoryIndex(index)
    setTypeIndex(0) // 重置类型选择
  }

  const handleTypeChange = (e: any) => {
    setTypeIndex(parseInt(e.detail.value))
  }

  const handleSubmit = async () => {
    if (!imageUrl) {
      Taro.showToast({ title: '请上传图片', icon: 'none' })
      return
    }

    if (!name) {
      Taro.showToast({ title: '请输入服饰名称', icon: 'none' })
      return
    }

    setLoading(true)
    try {
      const selectedCategory = categories[categoryIndex]
      const selectedType = selectedCategory.types[typeIndex]

      await saveUploadedCloth({
        id: `cloth_${Date.now()}`,
        name,
        imagePath: imageUrl,
        category: selectedCategory.category,
        clothType: selectedType.id,
        uploadedAt: new Date().toISOString()
      })

      Taro.showToast({ title: '上传成功', icon: 'success' })
      
      // 重置表单
      setImageUrl('')
      setName('')
      setCategoryIndex(0)
      setTypeIndex(0)
    } catch (error) {
      Taro.showToast({ title: '上传失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const currentTypes = allTypes[categoryIndex] || []

  return (
    <View className='upload-page'>
      <View className='upload-card'>
        {/* 图片上传 */}
        <View className='image-section' onClick={handleChooseImage}>
          {imageUrl ? (
            <Image src={imageUrl} mode='aspectFit' className='preview-image' />
          ) : (
            <View className='upload-placeholder'>
              <Text className='upload-icon'>📷</Text>
              <Text className='upload-text'>点击上传服饰图片</Text>
            </View>
          )}
        </View>

        {/* 表单 */}
        <View className='form'>
          <View className='form-item'>
            <Text className='label'>服饰名称</Text>
            <Input
              className='input'
              placeholder='请输入服饰名称'
              value={name}
              onInput={(e) => setName(e.detail.value)}
            />
          </View>

          <View className='form-item'>
            <Text className='label'>服饰分类</Text>
            <Picker
              mode='selector'
              range={categoryNames}
              value={categoryIndex}
              onChange={handleCategoryChange}
            >
              <View className='picker'>
                {categoryNames[categoryIndex]}
                <Text className='picker-arrow'>▼</Text>
              </View>
            </Picker>
          </View>

          <View className='form-item'>
            <Text className='label'>服饰类型</Text>
            <Picker
              mode='selector'
              range={currentTypes}
              value={typeIndex}
              onChange={handleTypeChange}
            >
              <View className='picker'>
                {currentTypes[typeIndex]}
                <Text className='picker-arrow'>▼</Text>
              </View>
            </Picker>
          </View>
        </View>

        {/* 提交按钮 */}
        <View 
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          onClick={handleSubmit}
        >
          {loading ? '上传中...' : '上传服饰'}
        </View>
      </View>
    </View>
  )
}

