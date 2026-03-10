import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import './app.less'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('小猫猫的衣橱启动')
  })

  return children
}

export default App

