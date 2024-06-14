import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, Modal, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GradeSelection from './ModalContent/GradeSelection'
import DateSelection from './ModalContent/DateSelection'
import { Colors } from '../../../constant/ui';
import QuestionListItem from '../component/QuestionListItem'
import { get_question_list, get_question_data } from '../../../api/question';
import { handleQuestionData } from '../../../common/util'
import { useQuestionContext } from '../../../provider/QuestionProvider';
import { useNavigation } from '@react-navigation/native';


const inigialGradeDataList=[
  { label: '고1', value: '10', active:false},
  { label: '고2', value: '11', active:false},
  { label: '고3', value: '12', active:false},
]

const inigialDateDataList=[
  { label: '2021년 6월', value: '2106', active:false},
  { label: '2021년 3월', value: '2103', active:false},
  { label: '2020년 11월', value: '2011', active:false},
  { label: '2020년 9월', value: '2009', active:false},
  { label: '2020년 6월', value: '2006', active:false},
]

const TestSearch = () => {
  const navigation = useNavigation()
  const { questionState, setQuestionData } = useQuestionContext(); 
  
  const [gradeDataList, setGradeDataList] = useState(inigialGradeDataList)
  const [dateDataList, setDateDataList] = useState(inigialDateDataList)
  
  
  const [isGradeModalVisible, setGradeModalVisible] = useState(false)
  const [isDateModalVisible, setDateModalVisible] = useState(false)
  
  const [activeGrade, setActiveGrade] = useState<any>({})
  const [activeDate, setActiveDate] = useState<any>({})

  const [questionList, setQuestionList] = useState([])

  const [listShow, isListShow] = useState(false)

  const changeGradeModalVisibility = (bool:boolean) => {
    setGradeModalVisible(bool)
  }

  const changeDateModalVisibility = (bool:boolean) => {
    setDateModalVisible(bool)
  }

  const onPressItem = async (aid:string) => {
    
    // requestQuestionData(aid)
    
    const data:any = await handleQuestionData(aid)
    
    console.log("after data:", data)
    setQuestionData(data)
    
    // const response = await get_question_data(aid) 
    // if(response.result == 'success' && response.data){
    //   const data = response.data
    //   const aid = data.article.aid
    //   // const bs_question_count = data.article.aid
    //   // const bs_solution = data.bs_solution
    //   // const sentence_list = data.sentence
    //   const article = {
    //     content_format: data.article.content_format,
    //   }
    //   // console.log("sentence_lsit : ", sentence_list)
    //   // console.log("bs_solution : ", bs_solution)

    //   const formula = {
    //     formula_id : data.article.formula_id,
    //     formula_image_path : data.article.formula_image_path
    //   }
      
    //   const bs_solution = {
    //     order: data.bs_solution.order,
    //     image_path: data.bs_solution.image_path, 
    //   }
      
    //   const bs_question = data.bs_question.map((el:any) => {
        
    //      let bs_question:any = {
    //         id: el.bs_question.id,
    //         question_no: el.bs_question.question_no,
    //         question_text: el.bs_question.question_text,
    //         choice_type: el.bs_question.choice_type
    //       }
    //     if(el.bs_question.choice_type == '30'){
    //       bs_question.choice_list = el.bs_choice.map((choice_el:any) => {
    //         return {
    //           choice_no: choice_el.choice_no,
    //           choice_text: choice_el.choice_text,
    //           is_answer: el.bs_question.answer_no == choice_el.choice_no ? true : false
    //         }
    //       })
    //     }
    //   });
    //   const sentence_list = data.sentence.map((el:any) => {
    //     return {
    //       sentence: {
    //         number: el.article_sentence.number,
    //         content: el.article_sentence.content,
    //         content_format: el.article_sentence.content_format,
    //       },
    //       ca_question: el.ca_question.map((caq_el:any) => {
    //         return {
    //           id: caq_el.id,
    //           answer_no: caq_el.answer_no,
    //           question_no: caq_el.question_no,
    //           question_text: caq_el.question_text
    //         }
    //       }),
    //       bl_question: el.ca_question.map((blq_el:any) => {
    //         return {
    //           id: blq_el.id,
    //           answer_text: blq_el.answer_text,
    //           question_text: blq_el.question_text,
    //         }
    //       })
    //     }
    //   })

    //   const ap_question = data.ap_question.map((ap_el:any) => {
    //     return {
    //       order: ap_el.order,
    //       answer_no: ap_el.answer_no,
    //       question_image_path: ap_el.question_image_path,
    //     }
    //   })

    //   const questionData = {
    //     aid: aid,
    //     isQuestionSet: true,
    //     bs_question_count: data.article.question_count,
    //     data: {
    //       article: article,
    //       formula: formula,
    //       bs_question: bs_question,
    //       sentence_list: sentence_list,
    //       bs_solution: bs_solution,
    //       ap_question: ap_question,
    //     }
    //   }

    //   setQuestionData(questionData)

    // }
    
    // console.log("response : ", response)
  }


  useEffect(() => {
    const findActiveItem = gradeDataList.find((el:any) => el.active)
    if(findActiveItem){  
      setActiveGrade(findActiveItem)
      if(isGradeModalVisible){
        setGradeModalVisible(false)
      }
    }
  }, [gradeDataList])

  useEffect(() => {
    const findActiveItem = dateDataList.find((el:any) => el.active)
    if(findActiveItem){
      setActiveDate(findActiveItem)
      if(isDateModalVisible){
        setDateModalVisible(false)
      }
    }
  }, [dateDataList])

  const getQuestionList:any = async () => {
    const grade = activeGrade.value
    const date = activeDate.value
    
    const params = {
      grade: grade,
      date: date,
    }
    const result = await get_question_list(params)
    if(result.data && result.data.length > 0){
      const filterList = result.data.filter((el:any) => el.question_list.length > 0)
      setQuestionList(filterList)
    }else{
      setQuestionList([])
    }
  }

  useEffect(() => {
    console.log("ui activegrade, activedate")
    console.log("activeGrade.value : ", activeGrade.value)
    if(activeGrade.value && activeDate.value){
      getQuestionList()       
    }
  }, [activeGrade, activeDate])
  
  useEffect(() => {
    if(questionState.loading){
      navigation.navigate("QuestionScreen")
    }
  }, [questionState.loading])
  // }, [questionState.questionData.aid])



  return (
    <View style={styles.content}>
      <View style={[styles.topSection, listShow ? {display: 'none'} : null] }>

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>문제검색</Text>
        </View>
        <View style={styles.infoTextWrapper}>
          <Text style={styles.infoText}>학년과 출제년월을 선택해주세요</Text>
        </View>
      </View>
      <View style={styles.searchOptionSection}>
        <View style={styles.buttonGroupWrapper} >
          <View style={{flex:1.5, marginRight:20}}> 
            <TouchableOpacity 
              onPress = { () => changeGradeModalVisibility(true) }  
              // style={styles.gradeSelectBox}
              >
              <View style={{display:'flex', justifyContent:'center', 
                borderWidth:1, borderColor:Colors.Main,
                height:'100%'}}
                >
                <Text style={{ textAlign: 'center'}}>
                  {activeGrade.value ? activeGrade.label : '학년'}
                </Text>
              </View>
              <Modal
                  transparent={true}
                  // animationType="fade"
                  visible={isGradeModalVisible}
                >
                  <GradeSelection 
                    type={"GRADE"} 
                    gradeDataList={gradeDataList}
                    setGradeDataList={setGradeDataList}
                    setActiveGrade={setActiveGrade}
                    isGradeModalVisible={isGradeModalVisible}
                    changeGradeModalVisibility={changeGradeModalVisibility}
                  />
                </Modal>
            </TouchableOpacity>
          </View>
          <View style={{flex:3}}>
            <TouchableOpacity 
              onPress = { () => changeDateModalVisibility(true) }  
              // style={styles.gradeSelectBox }
              >
              <View style={{display:'flex', justifyContent:'center', borderWidth:1, borderColor:Colors.Main, height:'100%'}}>
                <Text style={{ textAlign:'center'}}>
                  {activeDate.value ? activeDate.label : '출제년월'}
                </Text>
              </View>
              <Modal
                transparent={true}
                // animationType="fade"
                visible={isDateModalVisible}
              >
                <DateSelection 
                  dateDataList={dateDataList}
                  setDateDataList={setDateDataList}
                  changeDateModalVisibility={changeDateModalVisibility}
                />
              </Modal>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <View>
        { <QuestionList />}
      </View> */}
      <ScrollView>
        {/* QuestionListItem */}
        { 
        questionList.map((data:any) => {
          return (
            <QuestionListItem 
              data={data} 
              onPressItem = {onPressItem} 
              key={ Math.random() }
            />
            )
        })
        // questionList.map((data:any) => (
        //   <QuestionListItem data={data} />
        // )
        }
        {
          (activeGrade.value != '' && activeDate.value !='' &&  questionList.length == 0)
          && <View style={{paddingHorizontal: 30, paddingVertical: 80}}>
              <Text style={{fontSize: 16, textAlign: 'center'}}>조회결과가 없습니다</Text>
            </View>         
        }
      </ScrollView>
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
  topSection:{
    display: 'flex'
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
    height: 40, 
    marginVertical: 20,
    // borderWidth: 1,
    // borderColor: Colors.Main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeSelectBox: {
    // borderWidth: 1,
    // borderColor: 'red',
    // flex: 2,
    // display: 'flex',
    // // height: 10,
    // alignItems:'center',
    // width: 60
    
    // margin: 10
  },
  dateSelectBox: {
    borderWidth: 1,
    borderColor: Colors.Main,
    flex: 1,
    margin: 10
  },
})
