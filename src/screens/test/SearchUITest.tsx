import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SearchUITest = () => {
  return (
    <View style={styles.container}>
      <View style = {styles.MainSearchButtonWrapper}>
        <TouchableOpacity onPress={() => {} } style={styles.MainSearchButton}>
            <Image source = {require('../../assets/img/main_search_icon.png')} style={ styles.MainSearchImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SearchUITest;

const styles= StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems:'center',
    backgroundColor:'rgb(66,66,66)'
  },
  MainSearchButtonWrapper: {
    borderWidth:3, borderColor:'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(42,147,255, 0.13)',
    borderRadius: 52,
    width: 110, 
    height: 110,
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    
  },
  MainSearchButton : {
    backgroundColor: '#fff',
    borderRadius: 44,
    width: 88,
    height: 88,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  MainSearchImage: {
    width: 40,
    height: 40
  },
})