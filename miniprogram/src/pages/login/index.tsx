import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import { login, register } from '../../services/api'
import './index.less'

export default function Login() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  
  // 登录表单
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })
  
  // 注册表单
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: ''
  })

  const handleLogin = async () => {
    if (!loginForm.username || !loginForm.password) {
      Taro.showToast({ title: '请填写用户名和密码', icon: 'none' })
      return
    }

    setLoading(true)
    try {
      const response = await login({
        username: loginForm.username,
        password: loginForm.password
      })

      if (response.success) {
        Taro.setStorageSync('clothes_change_user', response.data.user)
        Taro.showToast({ title: '登录成功', icon: 'success' })
        setTimeout(() => {
          Taro.switchTab({ url: '/pages/index/index' })
        }, 1500)
      }
    } catch (error: any) {
      Taro.showToast({ title: error.message || '登录失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!registerForm.username || !registerForm.password) {
      Taro.showToast({ title: '请填写用户名和密码', icon: 'none' })
      return
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      Taro.showToast({ title: '两次密码输入不一致', icon: 'none' })
      return
    }

    if (registerForm.password.length < 6) {
      Taro.showToast({ title: '密码至少6位', icon: 'none' })
      return
    }

    setLoading(true)
    try {
      const response = await register({
        username: registerForm.username,
        password: registerForm.password,
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone
      })

      if (response.success) {
        Taro.setStorageSync('clothes_change_user', response.data.user)
        Taro.showToast({ title: '注册成功', icon: 'success' })
        setTimeout(() => {
          Taro.switchTab({ url: '/pages/index/index' })
        }, 1500)
      }
    } catch (error: any) {
      Taro.showToast({ title: error.message || '注册失败', icon: 'none' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className='login-page'>
      <View className='login-header'>
        <Text className='login-title'>小猫猫的衣橱</Text>
        <Text className='login-subtitle'>记录你的每一次穿搭</Text>
      </View>

      <View className='login-card'>
        {/* Tab切换 */}
        <View className='tabs'>
          <View 
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            登录
          </View>
          <View 
            className={`tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            注册
          </View>
        </View>

        {/* 登录表单 */}
        {activeTab === 'login' && (
          <View className='form'>
            <View className='form-item'>
              <Input
                className='input'
                placeholder='用户名'
                value={loginForm.username}
                onInput={(e) => setLoginForm({ ...loginForm, username: e.detail.value })}
              />
            </View>
            <View className='form-item'>
              <Input
                className='input'
                placeholder='密码'
                password
                value={loginForm.password}
                onInput={(e) => setLoginForm({ ...loginForm, password: e.detail.value })}
              />
            </View>
            <View 
              className={`btn btn-primary ${loading ? 'loading' : ''}`}
              onClick={handleLogin}
            >
              {loading ? '登录中...' : '登录'}
            </View>
          </View>
        )}

        {/* 注册表单 */}
        {activeTab === 'register' && (
          <View className='form'>
            <View className='form-item'>
              <Input
                className='input'
                placeholder='用户名'
                value={registerForm.username}
                onInput={(e) => setRegisterForm({ ...registerForm, username: e.detail.value })}
              />
            </View>
            <View className='form-item'>
              <Input
                className='input'
                placeholder='密码'
                password
                value={registerForm.password}
                onInput={(e) => setRegisterForm({ ...registerForm, password: e.detail.value })}
              />
            </View>
            <View className='form-item'>
              <Input
                className='input'
                placeholder='确认密码'
                password
                value={registerForm.confirmPassword}
                onInput={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.detail.value })}
              />
            </View>
            <View className='form-item'>
              <Input
                className='input'
                placeholder='昵称（选填）'
                value={registerForm.name}
                onInput={(e) => setRegisterForm({ ...registerForm, name: e.detail.value })}
              />
            </View>
            <View className='form-item'>
              <Input
                className='input'
                placeholder='邮箱（选填）'
                value={registerForm.email}
                onInput={(e) => setRegisterForm({ ...registerForm, email: e.detail.value })}
              />
            </View>
            <View className='form-item'>
              <Input
                className='input'
                placeholder='手机号（选填）'
                type='number'
                value={registerForm.phone}
                onInput={(e) => setRegisterForm({ ...registerForm, phone: e.detail.value })}
              />
            </View>
            <View 
              className={`btn btn-primary ${loading ? 'loading' : ''}`}
              onClick={handleRegister}
            >
              {loading ? '注册中...' : '注册'}
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

