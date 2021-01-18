import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { bool } from 'prop-types'

export default Loading = (props) => {
  const { isLoading } = props
  // ローディング中でなければ何も表示しない
  if (!isLoading) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </View>
  )
}

Loading.propTypes = {
  isLoading: bool,
}

Loading.defaultProps = {
  isLoading: false,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 5,
  },
  inner: {
    marginBottom: 80,
  },
})
