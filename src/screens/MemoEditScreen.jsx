import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, Alert,
} from 'react-native';
import { shape, string } from 'prop-types';
import firebase from 'firebase';
import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';
import { translateErrors } from '../utils';

export default function MemoEditScreen(props) {
  const { navigation, route } = props;
  const { id, bodyText } = route.params;
  const [body, setBody] = useState(bodyText);

  function handlePress() {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id); // ドキュメントへの参照
      ref
        // 渡したオブジェクトでデータを上書く
        .set(
          {
            bodyText: body,
            updatedAt: new Date(),
          },
          { merge: true }, // 他のデータを上書きしたくない場合
        )
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          const errorMessage = translateErrors(error.code);
          Alert.alert(errorMessage.title, errorMessage.description);
        });
    }
  }

  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          value={body}
          multiline
          style={styles.textInput}
          onChangeText={(text) => {
            setBody(text);
          }}
        />
      </View>
      <CircleButton name="check" onPress={handlePress} />
    </KeyboardSafeView>
  );
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({
      id: string,
      bodyText: string,
    }),
  }).isRequired,
};

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
