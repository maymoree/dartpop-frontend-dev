import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet, View, ScrollView, Text, TouchableOpacity,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import ListingsProfileSection from '../components/ListingsProfileSection';
import ReviewsProfileSection from '../components/ReviewsProfileSection';
import LikesProfileSection from '../components/LikesProfileSection';
import { getUserUsername } from '../src/firestore';

const PlaceholderImage = require('../assets/dara.avif');

function ProfileScreen({ navigation }) {
  const [editor, setEditor] = useState('likes');
  const [userName, setUsername] = useState([]);
  const [name, setName] = useState([]);
  const [bio, setBio] = useState([]);

  // eslint-disable-next-line consistent-return
  const displaySection = () => {
    if (editor === 'listings') {
      return (
        <ListingsProfileSection navigation={navigation} />
      );
    }

    if (editor === 'reviews') {
      return (
        <ReviewsProfileSection />
      );
    }

    if (editor === 'likes') {
      return (
        <LikesProfileSection navigation={navigation} />
      );
    }
  };

  const getData = async () => {
    const data = await getUserUsername();
    console.log(data);
    setName(data.name);
    setUsername(data.username);
    setBio(data.bio);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData();
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </SafeAreaView>
      <View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text2}>{userName}</Text>
        <Text style={styles.text3}>{bio}</Text>

      </View>
      <View style={styles.footerContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={editor === 'likes' ? styles.btnActive : styles.btn} onPress={() => setEditor('likes')}>
            <Text style={styles.buttonText}>Likes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer2}>
          <TouchableOpacity style={editor === 'listings' ? styles.btnActive : styles.btn} onPress={() => setEditor('listings')}>
            <Text style={styles.buttonText}>Listings</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer3}>
          <TouchableOpacity style={editor === 'reviews' ? styles.btnActive : styles.btn} onPress={() => setEditor('reviews')}>
            <Text style={styles.buttonText}>Reviews</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView vertical showsVerticalScrollIndicator={false} style={{ maxHeight: '60%' }}>
        {displaySection()}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },

  text: {
    fontSize: 24,
    textAlign: 'center',
  },
  text2: {
    fontSize: 18,
    textAlign: 'center',
  },
  text3: {
    fontSize: 14,
    textAlign: 'center',
    padding: 4,
  },

  buttonText: {
    textAlign: 'center',
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    width: 110,
  },

  buttonContainer2: {
    flex: 1,
    alignContent: 'center',
    width: 110,
  },

  buttonContainer3: {
    flex: 1,
    alignContent: 'center',
    width: 110,

  },

  footerContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    gap: 2.5,
  },

  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 90,
  },

  btn: {
    backgroundColor: '#D6E8D9',
  },
  btnActive: {
    backgroundColor: '#D8CBFF',
  },

});

export default ProfileScreen;
