import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const QuestionHistoryEmpty = () => {
  return (
    <View style={styles.content}>
      <View style={styles.mainImageWrapper}>
        <Image source ={require('../../../assets/img/not_found.png')} />
      </View>
      <View style={styles.infoTextSection}>
        <View style={styles.lineWrapper}>
          <Text style={styles.infoText}>아직</Text>
        </View>
        <View style={styles.lineWrapper}>
          <Text style={styles.infoText}>풀어본 문제가 없어요</Text>
        </View>
      </View>
    </View>
  );
}

export default QuestionHistoryEmpty;

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
  },
  mainImageWrapper: {
    marginTop: 200
  },
  infoTextSection: {
    paddingTop: 30
  },
  infoText: {
    fontSize: 24,
    textAlign: 'center'
  },
  lineWrapper:{
    padding: 5
  },
})