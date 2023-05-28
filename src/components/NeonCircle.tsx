import { View, Text } from 'react-native'
import React from 'react'

interface Props{
  position: string;
  color: string;
  size: number;
}

export default function NeonCircle ({position, color, size}: Props) {

  const sizes = {
    original: `h-[${size}px]`,
    second: `h-[${Math.floor(size * 1.15)}px]`,
    third: `h-[${Math.floor(size * 1.30)}px]`,
    fourth: `h-[${Math.floor(size * 1.50)}px]`
  }

  return (
    <View tw={`${position} ${color} ${sizes.original} rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
      <View tw={`${color} ${sizes.second} opacity-75 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
        <View tw={`${color} ${sizes.third} opacity-50 rounded-full flex justify-center items-center`} style={{aspectRatio: 1}}>
          <View tw={`${color} ${sizes.fourth} opacity-25 rounded-full`} style={{aspectRatio: 1}}>
          </View>
        </View>
      </View>
    </View>
  )
}
