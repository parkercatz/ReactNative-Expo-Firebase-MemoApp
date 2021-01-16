import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import CircleButton from '../components/CircleButton'

export default function MemoDetailScreen(props) {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>買い物リスト</Text>
        <Text style={styles.memoDate}>2021年1月11日 11:00</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus,
          itaque ipsam non quos quibusdam ut eligendi doloribus ipsum voluptas
          quaerat, optio nesciunt soluta perferendis eum ullam? Similique amet
          eveniet perferendis.
        </Text>
      </ScrollView>
      <CircleButton
        style={styles.memoEditButton}
        name="pencil"
        onPress={() => {
          navigation.navigate('MemoEdit')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  memoHeader: {
    backgroundColor: '#467fd3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
  memoEditButton: {
    top: 60,
    bottom: 'auto',
  },
})
