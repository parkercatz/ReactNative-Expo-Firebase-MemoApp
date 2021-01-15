import React from 'react'
import { View } from 'react-native'

import AppBar from '../components/AppBar'
import MemoList from '../components/MemoList'
import CircleButton from '../components/CircleButton'

import PropTypes from 'prop-types'

export default function MemoListScreen() {
  return (
    <View style={styles.container}>
      <AppBar />
      <MemoList />
      <CircleButton>+</CircleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
})