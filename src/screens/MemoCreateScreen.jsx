import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import AppBar from '../components/AppBar'
import CircleButton from '../components/CircleButton'
import KeyboardSafeView from '../components/KeyboardSafeView'

export default function MemoCreateScreen() {
  return (
    <KeyboardSafeView style={styles.container}>
      <AppBar />
      <View style={styles.textInputContainer}>
        <TextInput value="" multiline style={styles.textInput} />
      </View>
      <CircleButton name="check" />
    </KeyboardSafeView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  textInput: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
})