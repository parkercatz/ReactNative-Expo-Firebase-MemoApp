import React from 'react'
import { View, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import AppBar from '../components/AppBar'
import CircleButton from '../components/CircleButton'

export default function MemoEditScreen() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <AppBar />
      <View style={styles.textInputContainer}>
        <TextInput
          value="買い物リスト"
          multiline
          style={styles.textInput}
        ></TextInput>
      </View>
      <CircleButton name="check" />
    </KeyboardAvoidingView>
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
