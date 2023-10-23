/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState, useCallback } from 'react';
import {
  StyleSheet, View, TextInput, Pressable, Text, KeyboardAvoidingView, Button,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
// import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import { Storage } from 'react-native-firebase/storage';
import ImageViewer from '../components/ImageViewer';

// import addItem from '../src/firestore';
import { addItem, storage } from '../src/firestore';

function SellScreen({ navigation }) {
  // eslint-disable-next-line global-require
  const PlaceholderImage = require('../assets/default.jpeg');
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [sizeOpen, setSizeOpen] = useState(false);
  const [sizeValue, setSizeValue] = useState(null);
  const [sizeItems, setSizeItems] = useState([
    { label: 'Small', value: 'S' },
    { label: 'Medium', value: 'M' },
    { label: 'Large', value: 'L' },
    { label: 'X-Large', value: 'XL' },
    { label: 'X-Small', value: 'XS' },
  ]);
  const [description, setDescription] = useState('');
  const [tagsOpen, setTagsOpen] = useState(false);
  const [tagsValue, setTagsValue] = useState(null);
  const [tagsItems, setTagsItems] = useState([
    { label: 'tops', value: 'tops' },
    { label: 'bottoms', value: 'bottoms' },
    { label: 'active', value: 'active' },
    { label: 'outer', value: 'outer' },
    { label: 'shoes', value: 'shoes' },
    { label: 'flair', value: 'flair' },
    { label: 'housing', value: 'housing' },
    { label: 'transport', value: 'transport' },
    { label: 'textbooks', value: 'textbooks' },
    { label: 'books', value: 'books' },
    { label: 'decor', value: 'decor' },
    { label: 'other', value: 'other' },
  ]);
  const [isFieldsFilled, setIsFieldsFilled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onSizeOpen = useCallback(() => {
    setTagsOpen(false);
  }, []);
  const onTagsOpen = useCallback(() => {
    setSizeOpen(false);
  }, []);
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      // eslint-disable-next-line no-alert
      alert('You did not select any image.');
    }
  };
  const handleSubmit = async () => {
    if (
      title.trim() === ''
      || price.trim() === ''
      || sizeValue === null
      || description.trim() === ''
      || tagsValue === null
    ) {
      setIsModalVisible(true);
    } else {
      const filename = createFilename();
      const ref = storage.ref().child(filename);
      // 'file' comes from the Blob or File API
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      ref.put(blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
      addItem(title, price, sizeValue, description, tagsValue, filename);
      setIsFieldsFilled(true);
      setIsModalVisible(true);
    }
  };
  const closeModal = () => {
    setIsModalVisible(false);
    if (isFieldsFilled) {
      setTitle('');
      setPrice('');
      setSizeValue(null);
      setDescription('');
      setTagsValue(null);
      setIsFieldsFilled(false);
      setSelectedImage(null);
      navigation.navigate('Profile');
    }
  };
  const createFilename = () => {
    const d = new Date();
    const filename = `${d.getMonth()}-${d.getDay()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
    return filename;
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Pressable onPress={pickImageAsync}>
            <ImageViewer style={styles.selectedImage}
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
          </Pressable>
        </View>
        <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent
          onRequestClose={closeModal}
          presentationStyle="overFullScreen"
          style={styles.modal}
        >
          <View style={styles.modalContainer}>
            <Pressable style={styles.modalButton}>

              <View style={styles.modalContent}>
                {isFieldsFilled ? (
                  <View>
                    <Text style={styles.modalText}>Posted! 🎉</Text>
                    <View style={styles.closePost}>
                      <Button style={styles.closeButton} onPress={closeModal} type="button" title="Done">Done</Button>
                    </View>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.modalText}>Please fill out all the fields! 👀</Text>
                    <View style={styles.closeNotPost}>
                      <Button color="#013220" style={styles.closeButton} onPress={closeModal} type="button" title="Done">Done</Button>
                    </View>
                  </View>
                )}
              </View>
            </Pressable>
          </View>

        </Modal>
        <View style={styles.bigText}>
          <TextInput
            style={styles.titleContainer}
            value={title}
            onChangeText={setTitle}
            placeholder="title"
          />
        </View>
        <View style={styles.smallText}>
          <TextInput
            style={styles.smallTextContainer}
            value={price}
            onChangeText={setPrice}
            placeholder="price"
            keyboardType="numeric"
          />
          <DropDownPicker
            style={styles.sizeContainer}
            open={sizeOpen}
            onOpen={onSizeOpen}
            searchable
            value={sizeValue}
            placeholder="size"
            placeholderStyle={{
              color: '#D3D3D3',
              fontWeight: 'light',
            }}
            containerStyle={{ width: 150 }}
            searchPlaceholder="search sizes"
            zIndex={2000}
            zIndexInverse={1000}
            dropDownDirection="TOP"
            items={sizeItems}
            setOpen={setSizeOpen}
            setValue={setSizeValue}
            setItems={setSizeItems}
            mode="BADGE"
            badgeDotColors={['#e76f51', '#00b4d8', '#e9c46a', '#e76f51', '#8ac926', '#00b4d8', '#e9c46a']}
          />
        </View>
        <View style={styles.bigText}>
          <TextInput
            style={styles.descriptionContainer}
            value={description}
            onChangeText={setDescription}
            placeholder="description"
          />
        </View>
        <View>
          <DropDownPicker
            style={styles.tagsContainer}
            open={tagsOpen}
            onOpen={onTagsOpen}
            searchable
            value={tagsValue}
            placeholder="+ tags"
            placeholderStyle={{
              color: '#D3D3D3',
              fontWeight: 'light',
            }}
            containerStyle={{ width: 330 }}
            searchPlaceholder="search tags"
            zIndex={1000}
            zIndexInverse={2000}
            dropDownDirection="TOP"
            items={tagsItems}
            setOpen={setTagsOpen}
            setValue={setTagsValue}
            setItems={setTagsItems}
          // theme="DARK"
            multiple
            mode="BADGE"
            badgeDotColors={['#e76f51', '#00b4d8', '#e9c46a', '#e76f51', '#8ac926', '#00b4d8', '#e9c46a']}
          />
        </View>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text}>submit</Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    // padding: 10,
  },
  imageContainer: {
    marginTop: 0,
  },
  selectedImage: {
    padding: 0,
  },
  titleContainer: {
    width: 330,
    height: 40,
    padding: 3,
    borderWidth: 1,
    borderColor: '#8DAA91',
    borderRadius: 10,
    paddingLeft: 9,
  },
  smallTextContainer: {
    display: 'flex',
    width: '40%',
    height: 50,
    padding: 3,
    paddingLeft: 9,
    borderWidth: 1,
    borderColor: '#8DAA91',
    borderRadius: 10,
    margin: 10,
  },
  sizeContainer: {
    borderColor: '#8DAA91',
  },
  descriptionContainer: {
    width: 330,
    height: 90,
    padding: 3,
    paddingLeft: 9,
    paddingTop: 9,
    borderWidth: 1,
    borderColor: '#8DAA91',
    borderRadius: 10,
  },
  tagsContainer: {
    borderColor: '#8DAA91',
  },
  smallText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  bigText: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 8,
    backgroundColor: '#A9D1BE',
    marginBottom: 15,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  modal: {
    margin: 0, // This is the important style you need to set
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    // height: '100%',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#8DAA91',
    paddingHorizontal: 60,
    paddingVertical: 30,
    borderRadius: 20,
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
  },
  closePost: {
    marginTop: 20,
    backgroundColor: '#A9D1BE',
    borderRadius: 10,
    width: 70,
    color: 'white',
    marginLeft: 10,
  },
  closeNotPost: {
    marginTop: 20,
    backgroundColor: '#A9D1BE',
    borderRadius: 10,
    width: 70,
    color: 'white',
    marginLeft: 53,
  },
});

export default SellScreen;
