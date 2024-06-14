import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import GlobalStyles from '../../screens/QuestionGroup/styles'




const AlphabetChoiceList = ({answer_no}:any) => {
  const forceUpdate = useForceUpdate()
  
  const initialChoiceList = [
    {choice_no:1, checked:false, is_answer: answer_no == 1 ? true: false},
    {choice_no:2, checked:false, is_answer: answer_no == 2 ? true: false},
    {choice_no:3, checked:false, is_answer: answer_no == 3 ? true: false},
    {choice_no:4, checked:false, is_answer: answer_no == 4 ? true: false},
    {choice_no:5, checked:false, is_answer: answer_no == 5 ? true: false},
  ]

  var clist = [
    {choice_no:1, checked:false, is_answer:false},
    {choice_no:2, checked:false, is_answer:false},
    {choice_no:3, checked:false, is_answer:false},
    {choice_no:4, checked:false, is_answer:false},
    {choice_no:5, checked:false, is_answer:false},
  ]


  const [choiceList, setChoiceList] = useState(initialChoiceList)


  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }

  const selectChoice = (data:any, index:number) => {
    let targetChoice:any = choiceList.find((el => el.choice_no == data.choice_no))
    targetChoice = targetChoice.checked ? targetChoice : {...targetChoice, checked: true}
    choiceList[index] = targetChoice;
    setChoiceList(choiceList)
    forceUpdate()
  }

  return (
    <View>
      { choiceList.map((data:any, index:number) => {
          return (
            <TouchableOpacity
              onPress = { () => selectChoice(data, index) }>
              {/* <View style={GlobalStyles.roundNumberWrapper}> */}
              <View>
                <Text style={{ color: data.checked ? 'green': 'black' }} >{data.choice_no}</Text>
              </View>
              <View>
                <Text>{data.choice_no}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  );
}

export default AlphabetChoiceList;
