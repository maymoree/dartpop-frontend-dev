import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, ScrollView, Pressable, Image, TouchableOpacity, Text,
} from 'react-native';
import { SearchBar } from '@rneui/themed';
import SafeAreaView from 'react-native-safe-area-view';
import { FlatGrid } from 'react-native-super-grid';
import { colors, fonts } from '../styles/GlobalStyles';

import OneItem from './HomeComponents/OneItem';
import { getItems } from '../src/firestore';

const filterPic = require('../assets/filter.png');
const searchPic = require('../assets/search.png');

const topButtons = [
  { title: 'XS' },
  { title: 'S' },
  { title: 'M' },
  { title: 'L' },
  { title: 'XL' },
  { title: 'one size' },
];

const botButtons = [
  { title: 'tops' },
  { title: 'bottoms' },
  { title: 'one piece' },
  { title: 'active' },
  { title: 'outer' },
  { title: 'shoes' },
  { title: 'flair' },
  { title: 'housing' },
  { title: 'transport' },
  { title: 'textbooks' },
  { title: 'books' },
  { title: 'decor' },
  { title: 'others' },
];

function HomeScreen({ navigation }) {
  // get all Items to display on screen
  const [allItem, setItems] = useState([]);
  const [category, setCat] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const getItem = async () => {
      const data = await getItems();
      setItems(data);
    };

    getItem();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        round
        placeholder="search"
        inputContainerStyle={{
          backgroundColor: '#FCFCFC',
          borderRadius: 15,
        }}
        containerStyle={{
          backgroundColor: '#FCFCFC',
          borderRadius: 10,
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
        }}
        searchIcon=<Image style={styles.searchImage} source={searchPic} />
      />
      <View style={styles.allFilterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            <Image style={styles.filterImage} source={filterPic} />
            {topButtons.map((button) => {
              return (
                <View key={button.title}>
                  <TouchableOpacity
                    // if statement
                    onPress={() => {
                      if (size === '') {
                        setSize(button.title);
                      } else if (size === button.title) {
                        setSize('');
                      } else if (size !== button.title) {
                        setSize(button.title);
                      }
                    }}
                    style={(size === button.title ? styles.buttonPressed : styles.buttonNormal)}
                    color="black"
                  >
                    <Text style={{ fontSize: 17 }}>{button.title}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterContainer}>
            {botButtons.map((button) => {
              return (
                <View key={button.title}>
                  <TouchableOpacity
                    onPress={() => {
                      if (category === '') {
                        setCat(button.title);
                      } else if (category === button.title) {
                        setCat('');
                      } else if (category !== button.title) {
                        setCat(button.title);
                      }
                    }}
                    style={(category === button.title ? styles.buttonPressed : styles.buttonNormal)}
                    color="black"
                  >
                    <Text style={{ fontSize: 17 }}>{button.title}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <FlatGrid
        itemDimension={120}
          // new varaible allItem.filter
        data={allItem}
        spacing={10}
        style={styles.gridView}
        renderItem={({ item }) => (
          <View style={styles.itemContainer} key={item.id}>
            <Pressable onPress={() => navigation.navigate('Item', {
              data: item.data,
            })}
            >
              <OneItem price={item.data.price}
                size={item.data.size}
                filename={item.data.filename}
              />
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    rowGap: 5,
    backgroundColor: colors.backgroundWhite,
  },
  filterContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: '10%',
    height: '100%',
  },
  allFilterContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
  },
  filterImage: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'center',
  },
  gridView: {
    paddingTop: 10,
    flex: 1,
    // backgroundColor: 'blue',
  },
  itemContainer: {
    height: 200,
  },
  buttonNormal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 95,
    backgroundColor: colors.lightGreen,
    borderRadius: '7',
  },
  buttonPressed: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 95,
    backgroundColor: colors.darkGreen,
    borderRadius: '7',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchImage: {
    height: 45,
    width: 45,
  },
  sellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 5,
    backgroundColor: 'pink',
  },
});

export default HomeScreen;
