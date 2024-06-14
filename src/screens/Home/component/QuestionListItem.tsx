import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../../constant/ui';

const QuestionListItem = ({data, onPressItem}:any) => {
  


  console.log("qdata : ", data)
  return (
    <TouchableOpacity 
      onPress = { () => onPressItem(data.aid)} 
      >
      <View style={styles.itemContainer}>
        <View style={styles.itemContentWrapper}>
          <View>
            <Text style={ styles.itemTop }>{data.aid}</Text>
          </View>
          { data.question_list.map((el:any) => {
              return (
                <View style={{ display:'flex', flexDirection: 'row' }}
                  key= {Math.random() }
                  >
                  <View style={{flex: 1, paddingTop:5, paddingBottom:5,}}>
                    <Text style={ styles.questionText }>문제 {el.question_no}</Text>
                  </View>
                  <View style={{flex: 4, padding: 5}}>
                    <Text style={ styles.questionText }>{el.question_text}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
        <View style={styles.moveIconArea}>
          <TouchableOpacity onPress = { () => {} } style={styles.imageEventArea}>
            <Image source= { require('../../../assets/img/move_icon.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default QuestionListItem;


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
    marginBottom: 5,
    padding: 15,
  },
  itemContentWrapper: {
    flex: 1,
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
