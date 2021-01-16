import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import CircleButton from '../components/CircleButton'
import KeyboardSafeView from '../components/KeyboardSafeView'

export default function MemoCreateScreen(props) {
  const { navigation } = props
  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput value="" multiline style={styles.textInput} />
      </View>
      <CircleButton
        name="check"
        onPress={() => {
          navigation.goBack()
        }}
      />
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
