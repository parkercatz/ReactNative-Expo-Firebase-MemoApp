import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import firebase from 'firebase'

import MemoList from '../components/MemoList'
import CircleButton from '../components/CircleButton'
import LogOutButton from '../components/LogOutButton'
import Button from '../components/Button'
import Loading from '../components/Loading'

export default function MemoListScreen(props) {
  const { navigation } = props
  const [memos, setMemos] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    })
  }, [])

  // メモのリストを監視
  useEffect(() => {
    const db = firebase.firestore()
    const { currentUser } = firebase.auth() // ログインしているユーザーの取得
    let unsubscribe = () => {} // ユーザーがログアウト、期限切れした場合などで空関数で実行させる *1
    if (currentUser) {
      setLoading(true)
      const ref = db
        .collection(`users/${currentUser.uid}/memos`) // ユーザーごとのコレクションを取得
        .orderBy('updatedAt', 'desc') // 降順
      // 監視
      unsubscribe = ref.onSnapshot(
        // snapshot = メモのリスト
        (snapshot) => {
          const userMemos = []
          // メモのリスト1つ1つのドキュメントに対してアクセスする
          snapshot.forEach((doc) => {
            console.log(doc.id, doc.data())
            const data = doc.data()
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              updatedAt: data.updatedAt.toDate(), // firestoreのtimestampになっているのでJSでDate型に変換
            })
          })
          setMemos(userMemos) // 加工したメモが入った配列をsetMemosを使用してmemosとして保存
          setLoading(false)
        },
        (error) => {
          console.log(error)
          setLoading(false)
          Alert.alert('データの読み込みに失敗しました。')
        }
      )
    }
    return unsubscribe // 監視がキャンセルされる *1
  }, [])

  // メモが0件だった場合
  if (memos.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={isLoading} />
        <View style={emptyStyles.inner}>
          <Text style={emptyStyles.title}>最初のメモを作成しよう！</Text>
          <Button
            style={emptyStyles.button}
            label="作成する"
            onPress={() => {
              navigation.navigate('MemoCreate')
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => {
          navigation.navigate('MemoCreate')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
})

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: 'center',
  },
})
