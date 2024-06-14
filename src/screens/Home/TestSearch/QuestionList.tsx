import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../constant/ui';

const QuestionList = () => {
  const [isHistoryEmpty, setHistoryEmpty] = useState(false)
  
  return (
    <ScrollView>
      <View style={styles.itemContainer}>
        <View style={styles.itemContentWrapper}>
          <View>
            <Text style={ styles.itemTop }>고1 202103</Text>
          </View>
          <View style={{ display:'flex', flexDirection: 'row' }}>
            <View style={{flex: 1, paddingTop:5, paddingBottom:5,}}>
              <Text style={ styles.questionText }>문제 28.</Text>
            </View>
            <View style={{flex: 4, padding: 5}}>
              <Text style={ styles.questionText }>다음 글의 목적은?</Text>
            </View>
          </View>
        </View>
        <View style={styles.moveIconArea}>
          <TouchableOpacity onPress = { () => {} } style={styles.imageEventArea}>
            <Image source= { require('../../../assets/img/move_icon.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default QuestionList;


export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    height: 62,
  },
  topTabWrapper: {
    // display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:32,
    // flexGrow: 1
  },
  tabActive: {
    color: Colors.Main,
    borderBottomColor: Colors.Main,
    borderBottomWidth: 2
  },
  tabText:{
    fontSize: 15
  },
  tabTextActive: {
    color: Colors.Main
  },
  itemTop:{
    color: 'rgb(128,128,128)',
    fontSize: 12
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 5,
    padding: 15
  },
  itemContentWrapper: {
    flex: 1
  },
  imageEventArea: {
    padding: 5
  },
  moveIconArea: {
    width: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionText:{
    fontSize: 14
  }
})
