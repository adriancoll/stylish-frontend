import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BackArrow } from './BackArrow'
export const MapOverlay = () => {
  return (
    <View style={[styles.container]}>
      <BackArrow />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
