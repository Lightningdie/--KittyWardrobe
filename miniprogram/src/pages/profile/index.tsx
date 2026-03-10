import { View, Text, Image, Input } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { useState } from 'react'
import { getUserInfo, saveUserInfo, clearUserData } from '../../utils/storage'
import { UserInfo } from '../../types'
import './index.less'

export default function Profile() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  })
  const [loading, setLoading] = useState(false)

  useDidShow(() => {
    const info = getUserInfo()
    if (info) {
      setUserInfo(info)
    }
  })

  const handleChooseAvatar = () => {
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
            setUserInfo({ ...userInfo, avatar: base64 })
          }
        })
      }
    })
  }

  const handleSave = async () => {
    if (!userInfo.name) {
      Taro.showToast({ title: '请输入姓名', icon: 'none' })
      return
    }

    setLoading(true)
    try {
      await saveUserInfo(userInfo)
      Taro.showToast({ title: '保存成功', icon: 'success' })
    } catch (error) {
      Taro.showToast({ title: '保存失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

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

  return (
    <View className='profile-page'>
      <View className='profile-card'>
        {/* 头像 */}
        <View className='avatar-section' onClick={handleChooseAvatar}>
          <Image 
            className='avatar' 
            src={userInfo.avatar || '/assets/default-avatar.png'} 
            mode='aspectFill'
          />
          <Text className='avatar-tip'>点击更换头像</Text>
        </View>

        {/* 表单 */}
        <View className='form'>
          <View className='form-item'>
            <Text className='label'>姓名</Text>
            <Input
              className='input'
              placeholder='请输入姓名'
              value={userInfo.name}
              onInput={(e) => setUserInfo({ ...userInfo, name: e.detail.value })}
            />
          </View>

          <View className='form-item'>
            <Text className='label'>邮箱</Text>
            <Input
              className='input'
              placeholder='请输入邮箱'
              value={userInfo.email}
              onInput={(e) => setUserInfo({ ...userInfo, email: e.detail.value })}
            />
          </View>

          <View className='form-item'>
            <Text className='label'>手机号</Text>
            <Input
              className='input'
              placeholder='请输入手机号'
              type='number'
              value={userInfo.phone}
              onInput={(e) => setUserInfo({ ...userInfo, phone: e.detail.value })}
            />
          </View>
        </View>

        {/* 保存按钮 */}
        <View 
          className={`btn btn-primary ${loading ? 'loading' : ''}`}
          onClick={handleSave}
        >
          {loading ? '保存中...' : '保存信息'}
        </View>
      </View>

      {/* 退出登录 */}
      <View className='logout-btn' onClick={handleLogout}>
        退出登录
      </View>
    </View>
  )
}

