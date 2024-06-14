import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useQuestionContext } from '../../../provider/QuestionProvider';
import RenderHtml from "react-native-render-html";
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Colors, HEIGHT } from '../../../constant/ui';


const BlankQuestion = ({blankSentenceDataList, setQuestionLayerContent, initialQuestionLayerData }:any) => {
  
  const {questionState} = useQuestionContext()
  
  const data = questionState.questionData.data;
  
  const [sentenceDataList, setSentenceDataList] = useState(blankSentenceDataList)
  
  // let datasample = [
  //   {
  //     text:'aaa',
  //     hasBlQuestion: false
  //   },
  //   {
  //     // text:'bbbaaa',
  //     hasBlQuestion: true,
  //     segArr: [
  //       {
  //         text: 'bb',
  //         is_question: false
  //       },
  //       {
  //         text: '__aa',
  //         is_question: true,
  //         question_data: {
  //          full_text: 'bbaa',
  //          answer_text: 'bb' 
  //         }
  //       },
  //     ]
  //   },
  // ]

  const resetBlankSentenceList = () => {
    const updatedList = sentenceDataList.map((data:any) => {
      if(data.has_question){
        
        data.seg_arr.map((seg_el:any) => {
          if(seg_el.is_answer_open){
            seg_el.is_answer_open = false;
          }
        })
        return data
      }else{
        return data
      }
    })
    setSentenceDataList(updatedList)
  }


  const tryBlankQuestion = (data:any, sentence_index:number, seg_index:number) => {
    // Alert.alert("data.full_text : " + data.full_text + ", data.answer_text : ", data.answer_text)
    
    // let dataList = sentenceDataList;
    // let updatedData = sentenceDataList[sentence_index].seg_arr.map((data:any, index:number) => {
    //   if(index == seg_index){
    //     return {...data, text: data.question_data.full_text}
    //   }else{
    //     return data
    //   }
    // })
    
    // dataList[sentence_index] = updatedData
    
    // setSentenceDataList(dataList)

    setQuestionLayerContent({
      ...initialQuestionLayerData,
      isLayerShow: true,
      sentenceIndex: sentence_index,
      segIndex: seg_index,
      questionLayerData: data
    })
  }
  
  return (
    <View style={ styles.container } >
      <View>
        <View style={{ minHeight: HEIGHT - 100 }}>
          <View style={ styles.titleWrapper }>
            <View style={{flex:1}}>
              <Text style={ styles.title }>빈칸문제</Text>
            </View>
            <View style={{display: 'flex', flexDirection:'column-reverse'}}>
              <TouchableOpacity 
                onPress = { () => resetBlankSentenceList() }>
                <Text>다시풀기</Text>
              </TouchableOpacity> 
            </View>
          </View>

          <View style={ styles.sectionContentWrapperWithTopBorder }>
            {sentenceDataList.map((sentenceData:any, sentence_index:number) => {
              
              return (
                !sentenceData.has_question ?
                <View style={ styles.questionWrapper }>
                  <View style={{ width: 28 }}>
                    {sentenceData.sentence_number ? 
                      <Text style={{ textAlign:'center', lineHeight: 22 }}>{sentenceData.sentence_number}</Text>
                      : 
                      null
                    }
                  </View>
                  <View>
                      <Text style={{ lineHeight: 22 }}>{sentenceData.sentence}</Text>
                  </View>
                </View>
                :
                <View style={ styles.questionWrapper }>
                  <View style={{ width: 28 }}>
                    {sentenceData.sentence_number ? 
                      <Text style={{ textAlign:'center', lineHeight: 22 }}>{sentenceData.sentence_number}</Text>
                      :
                      null
                    }
                  </View>
                  
                  <View>
                    {/* <Text>app <Text>inner</Text></Text> */}
                    <Text style={{ lineHeight: 22 }}>
                    {sentenceData.seg_arr.map((seg:any, seg_index: number) => {
                        return ( 
                          <>
                            { !seg.is_question ? 
                                <Text style={{lineHeight: 22}}>{seg.text}</Text>
                              :
                              <TouchableOpacity style={{
                                // borderWidth: 1, 
                                  alignItems:'center',
                                  backgroundColor: 'rgb(242,242,242)',
                                  height:25, 
                                  marginBottom: -8
                                }}
                                onPress = { () => tryBlankQuestion(seg.question_data, sentence_index, seg_index) }
                                >
                                {/* <Text style={{  }}>{seg.text}</Text>  */}
                                {!seg.is_answer_open ? 
                                  <Text style={{  }}>{seg.text}</Text> 
                                  :
                                  <Text style={{  }}>{seg.question_data.full_text}</Text> 
                                }
                              </TouchableOpacity>
                            }
                          </>
                        )
                      })
                    }
                    </Text>
                  </View>
                </View>
              )

            })}
          </View>
        </View>
      </View>
    </View>
    
    // <View>
    //   <Text>빈칸문제</Text>
      // {sentenceDataList.map((sentenceData:any) => {
      //   return (
      //     !sentenceData.hasBlQuestion ?
      //     <View><Text>{sentenceData.sentence}</Text></View>
      //     :
      //     <View>
      //       {sentenceData.segArr.map((seg:any) => {
      //         return ( 
      //           <View><Text>{seg.text}</Text></View>
      //         )
      //       })
      //     }
      //     </View>
      //   )

      // })}
    // </View>
  );
}

export default BlankQuestion;


export const styles = StyleSheet.create({
  container: {
    flex:1, 
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    color: Colors.DeepBlack,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  title: {
    fontSize: 24
  },
  sectionContentWrapperWithTopBorder:{
    backgroundColor:'#fff',
    flex:1, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  sentenceDataWrapper: {
    marginTop: 10,
    marginBottom: 25,
  },
  questionTextBlock: {
    display:'flex', 
    flexDirection:'row', 
    marginVertical: 20
  },
  questionWrapper: {
    display: 'flex', 
    flexDirection: 'row',
    marginVertical: 5,
    marginRight: 28
  }
})