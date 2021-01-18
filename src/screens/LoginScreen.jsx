import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native'
import firebase from 'firebase'
import Button from '../components/Button'
import Loading from '../components/Loading'

export default function LogInScreen(props) {
  const { navigation } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // ユーザーの状態を監視（画面が消える瞬間に実行）
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // もしログインしていたら画面遷移
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        })
      } else {
        setLoading(false)
      }
    })
    return unsubscribe // return f()でユーザーの監視状態をキャンセルさせる
  }, []) //　[]を入れておくと一度だけcallbackを実行

  function handlePress() {
    setLoading(true)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential
        console.log(user.uid)
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        })
      })
      .catch((error) => {
        Alert.alert(error.code)
      })
      .then(() => {
        setLoading(false)
      })
  }

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={(text) => {
            setEmail(text)
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={(text) => {
            setPassword(text)
          }}
          autoCapitalize="none"
          placeholder="Passwprd"
          secureTextEntry
          textContentType="password"
        />
        <Button label="Submit" onPress={handlePress} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignUp' }],
              })
            }}
          >
            <Text style={styles.footerLink}>Sign up here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  textInput: {
    fontSize: 16,
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginBottom: 16,
  },

  footer: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467fd3',
  },
})
