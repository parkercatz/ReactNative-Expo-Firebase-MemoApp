import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native'
import Icon from './Icon'
import { useNavigation } from '@react-navigation/native'
import { shape, string, instanceOf, arrayOf } from 'prop-types'
import { dateToString } from '../utils'
import firebase from 'firebase'
export default function MemoList(props) {
  const { memos } = props
  const navigation = useNavigation()

  function deleteMemo(id) {
    const { currentUser } = firebase.auth()
    if (currentUser) {
      const db = firebase.firestore()
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id)
      Alert.alert('メモを削除します', 'よろしいですか？', [
        // Androidではネガティブ要素が先のため
        {
          text: 'キャンセル',
          onPress: () => {},
        },
        {
          text: '削除する',
          style: 'destructive', // 文字が赤くなる(iOSのみ)
          onPress: () => {
            // 成功の場合は何もしないため失敗時のみでOK
            ref.delete().catch(() => {
              Alert.alert('削除に失敗しました')
            })
          },
        },
      ])
    }
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => {
          navigation.navigate('MemoDetail', { id: item.id })
        }}
      >
        <View>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>
            {item.bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>
            {dateToString(item.updatedAt)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => {
            deleteMemo(item.id)
          }}
        >
          <Icon name="delete" size={24} color="#b0b0b0" />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={memos} // props
        renderItem={renderItem} // f()
        keyExtractor={(item) => item.id} // keyの指定
      />
    </View>
  )
}

MemoList.propTypes = {
  // 配列
  memos: arrayOf(
    // オブジェクト
    shape({
      id: string,
      bodyText: string,
      updatedAt: instanceOf(Date),
    })
  ).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  memoDelete: {
    padding: 8,
  },
})
