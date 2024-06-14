import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useQuestionContext } from '../../../provider/QuestionProvider';
import RenderHtml from "react-native-render-html";
import NumberChoiceList from '../../../component/choiceList/NumberChoiceList' 
import AlphabetChoiceList from '../../../component/choiceList/AlphabetChoiceList' 
import { RotationGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import globalStyles from '../../../globalStyle/styles'
import { Colors } from '../../../constant/ui';

const numChoiceList = [1,2,3,4,5]
const allChoiceList = ['(a)', '(b)', '(c)', '(d)', '(e)']

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

const Question = () => {

  const {questionState} = useQuestionContext()
  const forceUpdate = useForceUpdate()

  const [data, setData] = useState(questionState.questionData.data);

  const [bsQuestion, setBsQuestion] = useState(data.bs_question[0])

  // console.log("in question data : ", data)


  const selectAnswer = (choice_el:any, index:number) => {

    // const answer_no = bsQuestion.answer_no
    let newBsQuestion:any = {}
    newBsQuestion = bsQuestion;
   
    let updatedChoiceList = bsQuestion.choice_list.map((el:any) => {
      if(el.choice_no == choice_el.choice_no){
        return {...el, checked: true}
      }else if(el.checked){
        return {...el, checked: false}
      }else{
        return el;
      }
    })
    
    bsQuestion.choice_list = updatedChoiceList;
    console.log("newBsQuestion.choice_list : ", newBsQuestion.choice_list)

    setBsQuestion(bsQuestion)
    forceUpdate()
  }
  
  useEffect(() => {
    // forceUpdate()
    console.log("question conteint useeffect ")
    setData(questionState.questionData.data)
    setBsQuestion(questionState.questionData.data.bs_question[0])
  }, [questionState])


  return (
      <View>
        <View style={ styles.testInfoWrapper }>
          {data.article.gradeText &&
             ( <Text style={ styles.textInfoText }>{data.article.gradeText}</Text> )
          }
          {data.article.test_date && 
            ( <Text style={ styles.textInfoText }>{data.article.test_date.substring(0,2)}년 {Number(data.article.test_date.substring(2))}월</Text> )
          }
        </View>
        <View style={ styles.questionWrapper }>
          <View>
            <Text style={{lineHeight: 24 }}>{bsQuestion.question_no}.</Text>
          </View>
          <View style={{ marginHorizontal: 5 }}>
            <Text style={{lineHeight: 24 }}>{bsQuestion.question_text}</Text>
          </View>
        </View>
        <View>
          <RenderHtml html = {data.article.content_format} />
        </View>
        <View style={{marginVertical: 10}}>
          { 
            bsQuestion.choice_list.map((el:any, index:number) => {
              return (
                <View key={ Math.random() }>
                  <TouchableOpacity
                    onPress= { () => selectAnswer(el, index) }
                    >
                    { 
                      !el.checked
                      ?
                      <View style={styles.choiceWrapper}>
                        <View 
                          style={globalStyles.roundNumberWrapper} >
                          <Text 
                            style={ styles.choiceNumber } >
                            {el.choice_no}
                          </Text>
                        </View>
                        <Text style={{marginHorizontal: 8}}>{el.choice_text}</Text>
                      </View>
                      :
                      <View style={styles.choiceWrapper}>
                        { el.choice_no == bsQuestion.answer_no
                          ?
                          <>
                            <View 
                              style={[globalStyles.roundNumberWrapper, {borderColor: Colors.WramMain, borderWidth: 2 } ]} >
                            {/* <View> */}
                              <Text 
                                style={[styles.choiceNumber, {color: Colors.WramMain } ]} >
                                {el.choice_no}
                              </Text>
                            </View>
                            <Text style={{marginHorizontal: 8, color: Colors.WramMain }} >{el.choice_text}</Text>
                          </>
                          :
                          <>
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
                            <Text style={{marginHorizontal: 8, color: 'rgb(126,126,126)' }} >{el.choice_text}</Text>
                          </>
                        }
                      </View>

                    }


                    {/* <View>
                      <Text>ck:{String(el.checked)}</Text>
                      <Text>ans:{JSON.stringify(bsQuestion.answer_no)}</Text>
                    </View> */}
                  </TouchableOpacity>
                </View>
              )
            })
          }

        </View>
      </View>
  );
}

export default Question;

export const styles = StyleSheet.create({
  testInfoWrapper: {
    display:'flex', 
    flexDirection:'row', 
    alignSelf:'flex-end',
    marginHorizontal: 10,
  },
  textInfoText:{
    paddingHorizontal: 2,
    fontSize: 12,
  },
  questionWrapper : {
    display: 'flex', 
    flexDirection: 'row', 
    marginBottom: 10,
    paddingRight: 15
  },
  choiceWrapper: {
    display: 'flex',
    flexDirection: 'row', 
    padding:5, 
    margin: 2
  },
  choiceNumber: {
    fontSize: 12
  }
})