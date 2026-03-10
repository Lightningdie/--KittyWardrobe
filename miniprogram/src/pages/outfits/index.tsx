import { View, Text, Image } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { getSavedOutfits, deleteOutfit } from '../../utils/storage'
import { SavedOutfit } from '../../types'
import './index.less'

export default function Outfits() {
  const [outfits, setOutfits] = useState<SavedOutfit[]>([])

  useDidShow(() => {
    loadOutfits()
  })

  const loadOutfits = () => {
    const saved = getSavedOutfits()
    setOutfits(saved)
  }

  const handleDelete = (outfitId: string) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这个穿搭吗？',
      success: async (res) => {
        if (res.confirm) {
          await deleteOutfit(outfitId)
          Taro.showToast({ title: '删除成功', icon: 'success' })
          loadOutfits()
        }
      }
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  return (
    <View className='outfits-page'>
      <View className='header'>
        <Text className='title'>我的穿搭</Text>
        <Text className='count'>共 {outfits.length} 套</Text>
      </View>

      {outfits.length === 0 ? (
        <View className='empty'>
          <Text className='empty-icon'>👔</Text>
          <Text className='empty-text'>还没有保存的穿搭</Text>
          <View 
            className='btn btn-primary'
            onClick={() => Taro.switchTab({ url: '/pages/edit/index' })}
          >
            去创建穿搭
          </View>
        </View>
      ) : (
        <View className='outfit-list'>
          {outfits.map(outfit => (
            <View key={outfit.id} className='outfit-card'>
              <View className='outfit-header'>
                <Text className='outfit-name'>{outfit.name}</Text>
                <Text className='outfit-date'>{formatDate(outfit.createdAt)}</Text>
              </View>
              
              <View className='outfit-preview'>
                {outfit.placedImages && outfit.placedImages.length > 0 ? (
                  outfit.placedImages.slice(0, 4).map((img, index) => (
                    <Image 
                      key={index} 
                      src={img.src} 
                      mode='aspectFit' 
                      className='preview-image'
                    />
                  ))
                ) : (
                  <Text className='no-images'>暂无图片</Text>
                )}
                {outfit.placedImages && outfit.placedImages.length > 4 && (
                  <View className='more-count'>+{outfit.placedImages.length - 4}</View>
                )}
              </View>

              <View className='outfit-actions'>
                <View className='action-btn' onClick={() => handleDelete(outfit.id)}>
                  <Text className='action-icon'>🗑️</Text>
                  <Text>删除</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

