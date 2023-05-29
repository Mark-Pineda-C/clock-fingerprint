import { View, Text } from 'react-native'
import React from 'react'

const ClockLoader = () => {
  return (
    <View className='h-44 w-44 aspect-square border-[15px] border-sky-500 rounded-full flex items-center justify-center'>
      <View className='block bg-sky-500 w-6 h-32 rounded-full absolute top-[-50%] animate-clock'/>
      <View className='block bg-sky-500 w-6 h-28 rounded-full absolute top-[50%] animate-clock-slow'/>
      <View className='block bg-sky-500 w-8 h-8 rounded-full'/>
    </View>
  )
}

export default ClockLoader