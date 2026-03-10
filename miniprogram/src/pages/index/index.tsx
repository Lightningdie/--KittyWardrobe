import { View, Text, Image } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { getUserInfo, clearUserData } from '../../utils/storage'
import { isLoggedIn } from '../../services/api'
import './index.less'

export default function Index() {
  const [userInfo, setUserInfo] = useState(getUserInfo())

  useDidShow(() => {
    // 检查登录状态
    if (!isLoggedIn()) {
      Taro.redirectTo({ url: '/pages/login/index' })
      return
    }
    setUserInfo(getUserInfo())
  })

  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          clearUserData()
          Taro.redirectTo({ url: '/pages/login/index' })
        }
      }
    })
  }

  const navigateTo = (url: string) => {
    Taro.navigateTo({ url })
  }

  return (
    <View className='index-page'>
      {/* 头部 */}
      <View className='header'>
        <Text className='title'>小猫猫的衣橱</Text>
      </View>

      {/* 用户信息卡片 */}
      <View className='user-card'>
        <View className='user-info'>
          <Image 
            className='avatar' 
            src={userInfo?.avatar || '/assets/default-avatar.png'} 
            mode='aspectFill'
          />
          <View className='user-details'>
            <Text className='user-name'>{userInfo?.name || '未设置'}</Text>
            <Text className='user-email'>{userInfo?.email || '暂无邮箱'}</Text>
          </View>
        </View>
        <View className='user-actions'>
          <View className='btn btn-small' onClick={() => navigateTo('/pages/profile/index')}>
            编辑信息
          </View>
          <View className='btn btn-small btn-danger' onClick={handleLogout}>
            退出
          </View>
        </View>
      </View>

      {/* 功能卡片 */}
      <View className='function-cards'>
        <View className='function-card' onClick={() => Taro.switchTab({ url: '/pages/edit/index' })}>
          <View className='function-icon'>✏️</View>
          <Text className='function-title'>编辑穿搭</Text>
          <Text className='function-desc'>创建和编辑穿搭搭配</Text>
        </View>

        <View className='function-card' onClick={() => navigateTo('/pages/outfits/index')}>
          <View className='function-icon'>📁</View>
          <Text className='function-title'>我的穿搭</Text>
          <Text className='function-desc'>查看已保存的穿搭</Text>
        </View>

        <View className='function-card' onClick={() => navigateTo('/pages/upload/index')}>
          <View className='function-icon'>📤</View>
          <Text className='function-title'>上传服饰</Text>
          <Text className='function-desc'>添加新的服饰图片</Text>
        </View>
      </View>
    </View>
  )
}

