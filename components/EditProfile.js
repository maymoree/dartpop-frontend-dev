import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getUserUsername, updateInfo } from '../src/firestore';

function EditProfile({ navigation }) {
  const [name, changeName] = useState('');
  const [username, changeUserName] = useState('');
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [userName, setUsername] = useState([]);
  const [oldName, setName] = useState([]);
  const [oldPassword, setPassword] = useState([]);
  const [oldEmail, setEmail] = useState([]);
  const [newPage, reload] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserUsername();
      console.log(data);
      setName(data.name);
      setUsername(data.username);
      setPassword(data.bio);
      setEmail(data.email);
    };
    getData();
  }, [newPage]);

  const placeholderName = ` ${oldName}`;
  const placeholderUser = ` ${userName}`;
  const placeholderEmail = ` ${oldEmail}`;
  const placeholderPassword = ` ${oldPassword}`;

  const onReload = useCallback(() => {
    reload(true);
    setTimeout(() => {
      reload(false);
    }, 60);
  }, []);

  return (

    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      extraHeight={200}
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <SafeAreaView>
        <View>
          <Text style={styles.text}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newName) => changeName(newName)}
            value={name}
            placeholder={placeholderName}
            keyboardType="default"
          />
          <Text style={styles.text}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newUserName) => changeUserName(newUserName)}
            value={username}
            placeholder={placeholderUser}
            keyboardType="default"
          />
          <Text style={styles.text}>Student Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(newEmail) => changeEmail(newEmail)}
            value={email}
            placeholder={placeholderEmail}
            keyboardType="default"
          />
          <Text style={styles.text}>Bio</Text>
          <TextInput
            style={styles.bioInput}
            onChangeText={(newPassword) => changePassword(newPassword)}
            value={password}
            placeholder={placeholderPassword}
            keyboardType="default"
          />
        </View>
        {/* refreshControl=
        <RefreshControl refreshing={reload} onRefresh={onReload} /> */}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('ProfileScreen'); updateInfo(name, email, username, password); onReload(); }}>
            <Text style={styles.buttonText}>Done!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: 330,
    height: 40,
    padding: 3,
    borderWidth: 1,
    borderColor: '#8DAA91',
    borderRadius: 10,
    margin: 20,
  },
  bioInput: {
    width: 330,
    height: 60,
    padding: 3,
    borderWidth: 1,
    borderColor: '#8DAA91',
    borderRadius: 10,
    margin: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 35,
    borderRadius: 8,
    backgroundColor: '#A9D1BE',
    marginBottom: 15,
  },

  buttonText:
  {
    color: 'white',
  },

  text: {
    flex: 1,
    fontSize: 18,
    justifyContent: 'flex-start',
    padding: 13,
  },
});

export default EditProfile;
