import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constant/ui';
import globalStyles from '../../../globalStyle/styles'


function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

const ChoiceList = ({data, answer_no}:any) => {
  const [choiceDataList, setChoiceDataList] = useState([])

  const forceUpdate = useForceUpdate()

  const selectAnswer = (choice_el:any, index:number) => {
    // let bsQuestion = bsQuestionList[question_index]

    let newChoiceList:any = []

    // let newChoiceData:any = {}
    // newChoiceData = choiceDataList[index]
   
    newChoiceList = choiceDataList.map((el:any) => {
      if(el.choice_no == choice_el.choice_no){
        return {...el, checked: true}
      }else if(el.checked){
        return {...el, checked: false}
      }else{
        return el;
      }
    })
    
    setChoiceDataList(newChoiceList)
    forceUpdate()
  }

  useEffect(() => {
    setChoiceDataList(data)
  }, [])

  return (
    <View style={{display: 'flex', flexDirection: 'row' }}>
      {
        choiceDataList.map((choice_el:any, index:number) => {
          return (
            <TouchableOpacity
              onPress = { () => selectAnswer(choice_el, index) } >
              {/* onPress = { () => Alert.alert(String(choice_el.choice_no))}> */}
              {   !choice_el.checked ? 
                  <View style={styles.choiceWrapper}>
                    <View 
                      style={globalStyles.roundNumberWrapper} >
                      <Text 
                        style={ styles.choiceNumber } >
                        {choice_el.choice_no}
                      </Text>
                    </View>
                  </View>
                : 
                <View>
                  { choice_el.choice_no == answer_no 
                    ?
                    <View style={styles.choiceWrapper}>
                      <View 
                        style={[globalStyles.roundNumberWrapper, {borderColor: Colors.WramMain, borderWidth: 2 }]} >
                        <Text 
                          style={[styles.choiceNumber, {color: Colors.WramMain } ]} >
                          {choice_el.choice_no}
                        </Text>
                      </View>
                    </View>
                    :
                    <View style={styles.choiceWrapper}>
                      <View 
                        style={[globalStyles.roundNumberWrapper, 
                          {display: 'flex', borderWidth: 2,
                          backgroundColor: 'rgb(212,212,212)',
                          justifyContent:'center', alignItems:'center'} ]} >
                          <View 
                            style={{
                              position: 'absolute', top:-5, left: 9,
                              height: 28, width: 1, 
                              backgroundColor: 'rgb(146,146,146)',
                              transform: [{skewY:'45deg'}] 
                            }}
                          ></View>
                          <View 
                            style={{
                              position: 'absolute', top:-4.5, left: 8,
                              height: 27, width: 1, 
                              backgroundColor: 'rgb(146,146,146)',
                              transform: [{skewY:'135deg'}] 
                            }}
                          />
                      </View>
                    </View>
                  }
                </View>
              }
            </TouchableOpacity>
          )
        })
      }
    </View>
  );
}

export default ChoiceList;


const styles = StyleSheet.create({
  choiceWrapper: {
    // display: 'flex',
    // flexDirection: 'row', 
    padding:5, 
    marginHorizontal: 12,
    marginVertical: 4
  },
  choiceNumber: {
    fontSize: 12
  }
})