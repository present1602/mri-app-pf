import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


// const Button = (props:any) => (
//   <View>
//       <Text>{props.text}</Text>
//   </View>
// );

function tfnc(val: string){
  
}
const TestButton = (props:any) => (
  <View style={styles.gradeButton}>
    <TouchableOpacity onPress = { () => { Alert.alert(props.value) } }>   
      <Text>{props.text}</Text>
    </TouchableOpacity>
  </View>
)

const UITest = () => {
  // const gradeData = [{text:'고11'}, {text:'고12'}, {text:'고13'}]
  const gradeData = [
    {text:'고1', value:'10'}, 
    {text:'고2', value:'11'}, 
    {text:'고3', value:'12'}
  ]
  // useEffect(() => {
  //   let items = ['고1', '고2', '고3']
  // }, )
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.topSection}>
          <Text style={styles.title}>UITest</Text>
        </View>
        <View style={styles.mainSection}>
          <View style={styles.inputSection}>
            <View>
              <Text style={styles.infoText}>이름을 입력해주세요</Text>
            </View>
            <View style={styles.textInputWtapper}>
              <TextInput style={styles.textInput}/>
            </View>  
          </View>
          <View style={styles.inputSection}>
            <View>
              <Text style={styles.infoText}>학년을 입력해주세요</Text>
            </View>
            <View style={styles.buttonGronpSection}>
               <FlatList
                data={gradeData}
                renderItem={({item}:any) => (
                  <TestButton text={item.text} value={item.value}/>
                )}
                numColumns={3}
                // keyExtractor={(item:any, index:number) => index}
              />
            </View>  
          </View>
          <View style={styles.inputSection}>
            <TouchableOpacity style={styles.mainButton}
              onPress= { () => {} } 
              >
              <Text style={styles.mainButtonText}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default UITest;

export const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex:1
  },
  title:{
    fontSize:22,
  },
  contentWrapper: {
    display:'flex',
    flex:1,
    flexDirection: 'column',
  },
  topSection:{
    // fontSize: 30
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  mainSection: {
    flex: 1,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  inputSection: {
    margin: 20
  },
  infoText:{
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15
  },
  textInputWtapper: {

  },
  textInput: {
    borderWidth: 1,
    // borderColor: 'gray'
  },
  mainButton:{
    backgroundColor: 'blue',
    padding: 10
  },
  mainButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color:'#fff'
  },
  buttonGronpSection: {
    display:'flex',
    flexDirection: 'row',
  },
  gradeButton: {
    flex:1,
    height: 60,
    borderWidth: 1,
    margin:10,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }
})