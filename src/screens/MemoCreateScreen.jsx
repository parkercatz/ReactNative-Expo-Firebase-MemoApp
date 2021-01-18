import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Alert,
} from 'react-native';
import firebase from 'firebase';
import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';
import { translateErrors } from '../utils';

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  const [bodyText, setBodyText] = useState('');

  function handlePress() {
    const { currentUser } = firebase.auth(); // ログインしているユーザー
    const db = firebase.firestore(); // firestoreの参照
    const ref = db.collection(`users/${currentUser.uid}/memos`); // ユーザーごとのコレクションを取得
    ref
      .add({
        bodyText,
        updatedAt: new Date(),
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        const errorMessage = translateErrors(error.code);
        Alert.alert(errorMessage.title, errorMessage.description);
      });
  }

  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          value={bodyText}
          multiline
          autoFocus
          style={styles.textInput}
          onChangeText={(text) => {
            setBodyText(text);
          }}
        />
      </View>
      <CircleButton name="check" onPress={handlePress} />
    </KeyboardSafeView>
  );
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
});
