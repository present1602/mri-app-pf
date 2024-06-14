import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, Dimensions, TextInput, Modal, Image, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, WIDTH } from '../../constant/ui';
import { useQuestionContext } from '../../provider/QuestionProvider';
import QuestionAndSolution from './QuestionAndSolution/QuestionAndSolution'
import ContextQuestion from './ContextQueestion/ContextQuestion'
import BlankQuestion from './BlankQuestion/BlankQuestion'
import SupplementQuestion from './SupplementQuestion/SupplementQuestion'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNGestureHandlerButton from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerButton';
import { SafeAreaView } from 'react-native-safe-area-context';


const QuestionScreen = () => {
  const initialActivePageData = {
    number:1, content:"question", title:'문제', active:true
  }
  const initialQuestionLayerData = {
    isLayerShow: false,
    sentenceIndex: 0,
    segIndex: 0,
    isOpenAnswer : false,
    userInput: '빈칸의 정답을 입력해주세요',
    isSubmitAnswer: false,
    isCorrect: false,
    questionLayerData: {}
  }
  const {questionState, setQuestionDataComplete} = useQuestionContext()
  
  const [questionData, ] = useState(questionState.questionData)

  const [blankSentenceDataList, setBlankSentenceDataList] = useState<any>([])

  const [questionLayerContent, setQuestionLayerContent] = useState<any>(initialQuestionLayerData)

  const [pageDataList, setPageDataList] = useState(questionState.questionData.page_list)

  const [activePageData, setActivePageData] = useState<any>(initialActivePageData)
  
  const [bottomHeight, setBottomHeight] = useState<any>(0)

  
  const handleActivePageData = (data:any) => {
  
    console.log("handleactivepageData data : ",data)
    if(activePageData.number == data.number){
      return
    }
    
    setActivePageData(data)

    // console.log("handleactivepageData data : ",data)
    // if(data.active == true){
    //   return
    // }else{
      
    //   const newPageList = pageDataList.map((el:any) => {
    //     if(el.number == data.number){
    //       const updatedData = {...data, active:true}
    //       return updatedData
    //     }else if(el.active == true){ 
    //       return {...el, active:false }
    //     }else{
    //       return el
    //     }
    //   })
    //   setPageDataList(newPageList)
    // }
  }

  const changeComponent = () => {
    if(activePageData.content == 'question'){
      return <QuestionAndSolution key="component_question" />
    }
    else if(activePageData.content == 'ca_question'){
      return <ContextQuestion key="component_ca_question" />
    }
    else if(activePageData.content == 'bl_question'){
      return (
        <BlankQuestion key="component_bl_question" 
          setQuestionLayerContent = {setQuestionLayerContent} 
          blankSentenceDataList = {blankSentenceDataList}
          initialQuestionLayerData = {initialQuestionLayerData}
        />
      )
    }
    else if(activePageData.content == 'ap_question'){
      return <SupplementQuestion key="component_ap_question" />
    }
  }

  // useEffect(() => {
  //   if(activePageData.number == 0){
  //     const activePageData = pageDataList.find((data:any) => data.active == true)
  //     setActivePageData(activePageData)
  //     return;
  //   }
  // }, [])

  useEffect(() => {
    console.log("useeffect in questoinscreen questionState.questionData.page_list : ", questionState.questionData.page_list)
    setPageDataList(questionState.questionData.page_list)
    setActivePageData(initialActivePageData)
    setBlankSentenceDataList(questionState.questionData.data.bl_sentence_list)
    
    // if(activePageData.number == 0){
    //   const activePageData = pageDataList.find((data:any) => data.active == true)
    //   setActivePageData(activePageData)
    // }
    if(questionState.loading){
      setQuestionDataComplete() 
    }
    
  }, [questionState])

  const handleBlankQuestionUserInput = (value:string) => {
    setQuestionLayerContent({...questionLayerContent, userInput:value })
    console.log("questionLayerContent.userInput : ", value)
  }

  const openAnswer = () => {
    const updatedLayerContent = {...questionLayerContent, isOpenAnswer: true}
    setQuestionLayerContent(updatedLayerContent)

    Keyboard.dismiss()

    const sentenceIndex = questionLayerContent.sentenceIndex
    const segIndex = questionLayerContent.segIndex
    
    let dataList = blankSentenceDataList;
    
    let updatedData = blankSentenceDataList[sentenceIndex].seg_arr.map((data:any, index:number) => {
      if(index == segIndex){
        return {...data, is_answer_open: true }
      }else{
        return data
      }
    })
    
    dataList[sentenceIndex] = {...dataList[sentenceIndex], seg_arr: updatedData}
    
    setBlankSentenceDataList(dataList)
    
  }

  const submitBlankQuestionAnswer = () => {
    
    const blankQuestionData = questionLayerContent.questionLayerData
    let updateData:any = {
      isSubmitAnswer: true,
      isCorrect: false
    } 
    
    if(blankQuestionData.answer_text == questionLayerContent.userInput){
      Keyboard.dismiss()
      updateData.isCorrect = true

      const sentenceIndex = questionLayerContent.sentenceIndex
      const segIndex = questionLayerContent.segIndex
      
      let dataList = blankSentenceDataList;
      
      let updatedData = blankSentenceDataList[sentenceIndex].seg_arr.map((data:any, index:number) => {
        if(index == segIndex){
          return {...data, is_answer_open: true }
        }else{
          return data
        }
      })
      
      dataList[sentenceIndex] = {...dataList[sentenceIndex], seg_arr: updatedData}
      
      setBlankSentenceDataList(dataList)
      
    }
    setQuestionLayerContent({...questionLayerContent, ...updateData})
    

  }

  useEffect(() => {

    if(activePageData.content != 'bl_question' && questionLayerContent.isLayerShow){
      setQuestionLayerContent(initialQuestionLayerData)
      // setBlankSentenceDataList(questionState.questionData.data.bl_sentence_list)
    }
  }, [activePageData])

  const _keyboardDidShow = (e:any) => {
    const bottomHeight =  e.endCoordinates.height - 63
    setBottomHeight(bottomHeight)
  }
  const _keyboardDidHide = (e:any) => {
    setBottomHeight(0)
  }

  useEffect(() => {
    if(Platform.OS == 'ios'){
      Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    }
  }, [])

  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView 
        style={styles.container}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        behavior="padding"
        >
        <ScrollView 
          stickyHeaderIndices = {[1]}
          contentContainerStyle={{
            flexGrow:1, display:'flex'
          }}
          >
          <View style={{height: 40}}></View>
          <View>
            <View style={{display:'flex', flexDirection: 'row', zIndex:10,
              justifyContent:'center', alignItems: 'center',
              height: 60,
              backgroundColor: 'rgb(242,242,242)'
              }}>
              { pageDataList.map((el:any, index:number) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress = { () => handleActivePageData(el)  }
                      >
                        <View style={[styles.pageNumberWrapper, el.number == activePageData.number && {backgroundColor: Colors.DeepMain}]}>
                          <Text style={ styles.pageNumber }>
                            {el.number}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      { pageDataList.length-1 != index 
                          ?
                          <View style={{ width: 20, height: 1, borderWidth: 1, borderColor: 'rgb(226,226,226)'}}/>
                          : null
                        }
                    </>
                  )
                })
              }
            </View>
          </View>
          <View style={{ 
            flex:1,
            }}>
              {activePageData.number != 0 && changeComponent()}  
          </View>
        </ScrollView>
        {/* <Modal
              transparent={true}
              // animationType="fade"
              visible={questionLayerContent.isShow }
            > */}
          { questionLayerContent.isLayerShow && 
            <View style={[styles.questionLayer, {bottom:bottomHeight} ]}>
              <View style={{
                flex:1,
                paddingHorizontal: 25,
                paddingVertical: 15,
                }}>
                <View>
                  <TouchableOpacity 
                    style={{ alignSelf:'flex-end', padding:3, }}
                    onPress={ () => setQuestionLayerContent(initialActivePageData) } 
                    >
                    <Image source ={ require('../../assets/img/cancel.png')} 
                    style={{width:24, height:24, opacity:0.5}}/>
                  </TouchableOpacity>
                </View>
                <View style={{
                  display: 'flex', 
                  flexDirection: 'row',
                  paddingBottom: 15
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={{fontSize: 18 }}>{questionLayerContent.questionLayerData.question_text}</Text>
                  </View>
                  {/* <View style={{width: 30 }}>
                    <TouchableOpacity onPress={ () => setQuestionLayerContent(initialActivePageData) } 
                      >
                      <Image source ={ require('../../assets/img/cancel.png')} 
                      style={{width:24, height:24, opacity:0.5}}/>
                    </TouchableOpacity>
                  </View> */}
                </View>
                <View style={ styles.questionLayerAnswerInputSection } >
                  <View style={{flex: 1}}>
                    <TextInput 
                      defaultValue={'빈칸을 입력해주세요'}
                      value={ questionLayerContent.userInput }
                      style={styles.answerTextInput}
                      onFocus={ () => setQuestionLayerContent({...questionLayerContent, userInput:'' })  }
                      onChangeText = { handleBlankQuestionUserInput } />
                  </View>
                  <View style={{marginHorizontal: 15}}>
                    <TouchableOpacity
                      onPress= { () => submitBlankQuestionAnswer() }
                      style={{width: 60 }}
                      >
                      <View style={ styles.blankQuestionSubmitButton }>
                        <Text>제출</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              { questionLayerContent.isSubmitAnswer && 
                <View style={ styles.gradieResultWrapper}>
                  { questionLayerContent.isCorrect ?
                    <View>
                      <Text style={{ color: 'rgb(51, 167, 47)' }}>정답입니다</Text>
                    </View>
                    :
                    
                    ( !questionLayerContent.isOpenAnswer ?
                    <View style={{ display:'flex', flexDirection:'row' }}>
                      <View style={{ flex:1 }}>
                        <Text style={{ color: 'rgb(246, 92, 98)' }}>틀렸습니다</Text>
                      </View>
                      <View style={{ width: 80, display: 'flex', alignItems:'center' }}>
                        <TouchableOpacity
                          onPress= { () => openAnswer() }
                          >
                          <Text style={{ color: Colors.DeepMain }}>정답확인</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    :
                    <View style={{ display:'flex', flexDirection:'row' }}>
                      <View style={{marginHorizontal: 10}}>
                        <Text style={{color:Colors.DeepMain}}>정답</Text>
                      </View>
                      <View style={{marginHorizontal: 10}}>
                        <Text>{questionLayerContent.questionLayerData.answer_text}</Text>
                      </View>
                    </View>
                    )
                  }
                </View>
              }
            </View>
          }
          {/* </Modal> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex: 1
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
  questionLayer: {
    backgroundColor:'#fff',
    borderWidth: 1,
    borderColor: 'rgb(222,222,222)',
    display: 'flex',
    flex:1,
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    // paddingHorizontal: 25,
    // paddingVertical: 15,
    height: 240,
    position: 'absolute', 
    bottom: 0, 
    left:0, 
    right:0, 
  },
  pageNumberWrapper: {
    backgroundColor: 'rgb(226,226,226)',
    width: 24,
    height: 24,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageNumber:{
    color: '#fff'
  },
  answerTextInput: {
    color:'black',
    borderWidth: 1,
    padding: 5,
    borderColor: 'rgb(242,242,242)',
  },
  questionLayerAnswerInputSection: {
    display: 'flex', 
    flexDirection: 'row', 
    flex:1, 
    borderTopWidth: 1,
    borderColor: 'rgb(232,232,232)',
    alignItems: 'center',
    marginVertical:5, 
    paddingVertical: 15 
  },
  blankQuestionSubmitButton: {
    display:'flex', 
    borderRadius: 5, 
    paddingHorizontal: 10, 
    borderWidth: 1, 
    alignItems:'center', 
    paddingVertical: 5 
  },
  gradieResultWrapper: {
    backgroundColor: 'rgb(242,242,242)',
    paddingVertical: 12,
    paddingHorizontal: 20
  }

})