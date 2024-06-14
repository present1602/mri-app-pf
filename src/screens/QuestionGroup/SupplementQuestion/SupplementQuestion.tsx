import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import ImageComponent from '../../../component/Image/ImageComponent';
import { assetsServerUrl } from '../../../config';
import { Colors, HEIGHT } from '../../../constant/ui';
import { useQuestionContext } from '../../../provider/QuestionProvider';
import MultipleQuestionContent from '../QuestionAndSolution/MultipleQuestionContent';
import QuestionContent from '../QuestionAndSolution/QuestionContent';
import globalStyles from '../../../globalStyle/styles'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChoiceList from './ChoiceList';

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

const SupplementQuestion = () => {

  const {questionState} = useQuestionContext()
  const forceUpdate = useForceUpdate()
  
  const bs_question_count = questionState.questionData.bs_question_count;

  const questionData = questionState.questionData.data
  const sqlQuestionListData = questionData.ap_question;

  const [splQuestionList, setSplQuestionList] = useState(sqlQuestionListData)

  const selectAnswer = (choice_el:any, index:number, question_index: number) => {
    // let bsQuestion = bsQuestionList[question_index]

    let newBsQuestion:any = {}
    newBsQuestion = splQuestionList[question_index]
   
    let updatedChoiceList = newBsQuestion.choice_list.map((el:any) => {
      if(el.choice_no == choice_el.choice_no){
        return {...el, checked: true}
      }else if(el.checked){
        return {...el, checked: false}
      }else{
        return el;
      }
    })
    
    newBsQuestion.choice_list = updatedChoiceList;
    console.log("newBsQuestion.choice_list : ", newBsQuestion.choice_list)
    
    splQuestionList[question_index] = newBsQuestion;
    setSplQuestionList(splQuestionList)
    forceUpdate()
  }
  return (
    <View style={styles.container}
      key={Math.random() }>
      <View style={{ minHeight: HEIGHT - 100 }}>
        <View style={ styles.titleWrapper }>
          <Text style={ styles.title }>문제</Text>
        </View>
        <View style={styles.sectionContentWrapperWithTopBorder}>
          { bs_question_count == 1 ?
              <QuestionContent />
              :
              <MultipleQuestionContent />
          }
        </View>
      </View>
      {
        sqlQuestionListData.length > 0
        && 
        ( 
          <View >
            <View style={ styles.titleWrapper } />
            <View style={styles.sectionContentWrapper}>
              
              {sqlQuestionListData.map((splq_el:any, question_index: number) => {
                  return (
                    <View style={{display: 'flex', flex: 1, marginVertical: 20 }}
                      key={Math.random()}
                    >
                      <View style={{marginVertical: 10}}>
                        <Text style={ [styles.title, {fontSize: 20} ] }>변형문제 {splq_el.order}</Text>
                      </View>
                      <View>
                        <ImageComponent uri={`${assetsServerUrl}/upload/${splq_el.question_image_path}`} />
                      </View>
                      {
                        splq_el.answer_no &&
                          <ChoiceList data={splq_el.choice_list} answer_no={splq_el.answer_no}/>
                      }
                    </View>
                  )
                })
              }
            </View>
          </View>
        )
      }
    </View>
  );
}

export default SupplementQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionContentWrapperWithTopBorder:{
    backgroundColor:'#fff',
    flex:1, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  sectionContentWrapper:{
    backgroundColor:'#fff',
    flex:1, 
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  titleWrapper: {
    marginVertical: 10,
    color: Colors.DeepBlack,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  title: {
    fontSize: 24
  },
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