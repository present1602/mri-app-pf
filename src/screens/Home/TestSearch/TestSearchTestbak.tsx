import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

const TestSearch = () => {

  return (
    <View style={styles.content}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>문제검색</Text>
      </View>
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoText}>학년과 출제년월을 선택해주세요</Text>
      </View>
      <View style={styles.searchOptionSection}>
        <View style={styles.buttonGroupWrapper} >
          <View style={styles.gradeSelectBox}>
            <RNPickerSelect
              // key='grade_selection'
              style={{ // 스타일은 아래 3가지로 나누어 적용한다 
                placeholder: {color:'blue'},
              }}
              onValueChange={(value) => console.log(value)}
              items={[
                  { label: '고1', value: '10' },
                  { label: '고2', value: '11' },
                  { label: '고3', value: '12' },
              ]}
            />
          </View>
          <View style={styles.dateSelectBox}>
            <RNPickerSelect
              placeholder="출제년월"
              key='date_selection'
              onValueChange={(value) => console.log(value)}
              items={[
                  { label: '2021년 3월', value: '202103'},
                  { label: '2020년 11월', value: '202011'},
                  { label: '2020년 9월', value: '202009'},
                  { label: '2020년 6월', value: '202006'},
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default TestSearch;

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25
  },
  titleWrapper: {
    marginTop: 30,
    marginBottom: 10
  },
  title: {
    fontSize: 24
  },
  infoTextWrapper: {
    
  },
  infoText: {
    fontSize: 18,
    color: 'rgb(63, 63, 63)'
  },
  searchOptionSection: {

  },
  buttonGroupWrapper: {
    display: 'flex',
    flexDirection: 'row',
    
  },
  gradeSelectBox: {
    borderWidth: 1,
    borderColor: 'blue',
    flex: 2,
    margin: 10
  },
  dateSelectBox: {
    borderWidth: 1,
    borderColor: 'blue',
    flex: 3,
    margin: 10
  },
})
