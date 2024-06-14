import { StackActions } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, WIDTH } from '../../constant/ui';
import { useQuestionContext } from '../../provider/QuestionProvider';

const OCRFail = ({navigation}:any) => {
  
  const { resetQuestionData } = useQuestionContext()

  const backToEntry = () =>{
    navigation.replace("TabScreens")
  }

  useEffect(() => {
    console.log('!=================ocr faile=================!')
    resetQuestionData()
  })

  return (
    <View style={styles.container}>
      <View style={{flex: 1 }}>
        <View style={styles.mainImageWrapper}>
          <Image source ={require('../../assets/img/not_found.png')} />
        </View>
        <View style={styles.infoTextSection}>
          <View style={styles.lineWrapper}>
            <Text style={styles.infoText}>문제 인식에</Text>
          </View>
          <View style={styles.lineWrapper}>
            <Text style={[styles.infoText, {fontWeight:'bold'} ]}>실패했습니다</Text>
          </View>
        </View>
      </View>
      <View style={{height: 200, margin: 20}}>
        <TouchableOpacity
          onPress = { () => backToEntry() } >
          <View style={ styles.mainButtonWrapper }>
            <Text style={{fontSize: 18, color: Colors.WramMain}}>확인</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default OCRFail;


export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    padding: 30,
  },
  mainImageWrapper: {
    marginTop: 200,
    alignItems: 'center'
  },
  infoTextSection: {
    paddingTop: 30,
  },
  infoText: {
    fontSize: 24,
    textAlign: 'center'
  },
  lineWrapper:{
    padding: 5
  },
  mainButtonWrapper: {
    width: 200, 
    borderWidth: 1, 
    height: 56, 
    borderColor: Colors.WramMain, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 8 
  }
})