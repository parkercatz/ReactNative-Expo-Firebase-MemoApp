import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from './Icon'

export default function MemoList() {
  return (
    <View>
      <View style={styles.memoListItem}>
        <View>
          <Text style={styles.memoListItemTitle}>買い物リスト</Text>
          <Text style={styles.memoListItemDate}>2021年1月11日 11:00</Text>
        </View>
        <TouchableOpacity>
          <Icon name="delete" size={24} color="#b0b0b0" />
        </TouchableOpacity>
      </View>
      <View style={styles.memoListItem}>
        <View>
          <Text style={styles.memoListItemTitle}>買い物リスト</Text>
          <Text style={styles.memoListItemDate}>2021年1月11日 11:00</Text>
        </View>
        <TouchableOpacity>
          <Icon name="delete" size={24} color="#b0b0b0" />
        </TouchableOpacity>
      </View>
      <View style={styles.memoListItem}>
        <View>
          <Text style={styles.memoListItemTitle}>買い物リスト</Text>
          <Text style={styles.memoListItemDate}>2021年1月11日 11:00</Text>
        </View>
        <TouchableOpacity>
          <Icon name="delete" size={24} color="#b0b0b0" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 19,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
})
