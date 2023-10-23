/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, Image, View, TouchableOpacity,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { getAverageRating } from '../src/firestore';

const emptyStar = require('../assets/star.png');
const fiveStars = require('../assets/5STARS.png');
const earrings = require('../assets/earrings.avif');
const overalls = require('../assets/overalls.avif');
const jacket = require('../assets/jacket.avif');

function ReviewsProfileSection() {
  const [rating, getRating] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAverageRating();
      console.log('this is reviews section');
      console.log('data');
      getRating(data);
    };
    getData();
  }, []);

  const StarImages = () => {
    console.log(`review${rating}`);
    if (rating === 5) {
      return (
        <View>
          <Image source={fiveStars} style={styles.starStyling} />

        </View>
      );
    }

    if (rating === 1) {
      return (
        <View>
          <Image source={emptyStar} style={styles.starStyling} />
        </View>
      );
    }

    if (rating === 2) {
      return (
        <View>
          <Image source={emptyStar} style={styles.starStyling} />
        </View>
      );
    }

    if (rating === 3) {
      return (
        <View>
          <Image source={emptyStar} style={styles.starStyling} />
        </View>
      );
    }

    if (rating === 4) {
      return (
        <View>
          <Image source={fiveStars} style={styles.starStyling} />
        </View>
      );
    }

    if (rating === 5) {
      return (
        <View>
          <Image source={emptyStar} style={styles.starStyling} />
        </View>
      );
    }

    return <Text> hi </Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ImageContainer}>
        <Text style={styles.headerReviews}>11 Reviews</Text>
        <View style={styles.ratingAndStars}>
          <Text style={styles.Averagetext}> Average Rating: </Text>
          {StarImages()}
        </View>
        <View style={styles.line} />
        <TouchableOpacity style={styles.button} onPress={() => getAverageRating()}>
          <Image source={earrings} style={styles.image} />
          <Text style={styles.text}>
            This seller was great! Would def buy from again.
          </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.button} onPress={() => getAverageRating()}>
          <Image source={jacket} style={styles.image} />
          <Text style={styles.text}>
            Great buying experience! Affforable price.
          </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.button} onPress={() => getAverageRating()}>
          <Image source={overalls} style={styles.image} />
          <Text style={styles.text}>
            Preety good seller. Clothing was super cute and great for pong.
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingTop: 15,
    flexDirection: 'row',
  },

  image: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 85,

  },

  button: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    gap: 5,
  },

  line: {
    flex: 1,
    height: 0.5,
    width: 330,
    borderBottomColor: '#656565',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignrItems: 'center',
    paddingBottom: 10,
  },

  ratingAndStars: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  headerReviews:
  {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    paddingLeft: 120,
  },

  starStyling: {
    display: 'flex',
    flex: 1,
    width: 230,
    height: 60,
    resizeMode: 'contain',
    padding: 25,
  },

  bigText: {
    flex: 1,
    fontSize: 32,
    padding: 15,

  },

  text: {
    flex: 1,
    fontSize: 14,
    padding: 15,

  },

  averageText: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 140,
    paddingTop: 90,

  },

  ImageContainer: {
    width: 350,
    flexDirection: 'column',
    padding: 15,
    paddingTop: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 10,
  },

});

export default ReviewsProfileSection;
