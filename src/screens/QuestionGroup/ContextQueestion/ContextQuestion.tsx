import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useQuestionContext } from '../../../provider/QuestionProvider';
import RenderHtml from 'react-native-render-html'
import { Colors, HEIGHT } from '../../../constant/ui';
import globalStyles from '../../../globalStyle/styles';
import { SvgXml } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppContext } from '../../../provider/RootProvider';
import { context_question_solving } from '../../../api/question';


// const xml_symbol_1 = `
//   <svg xmlns="http://www.w3.org/2000/svg" id="ic_circle_nor" width="14" height="14" viewBox="0 0 14 14">
//       <defs>
//           <style>
//               .cls-1{fill:none}
//           </style>
//       </defs>
//       <path id="사각형_5548" d="M0 0H10.732V10.732H0z" class="cls-1" transform="translate(0.295 0.951)"/>
//       <path id="사각형_5549" d="M0 0H14V14H0z" class="cls-1"/>
//       <g id="그룹_111" transform="translate(1.89 2)">
//           <path id="패스_7769" fill={fill} stroke="#75777a" stroke-width="0.5px" d="M7.111 2.715a4.4 4.4 0 1 1-4.4 4.4 4.428 4.428 0 0 1 4.4-4.4m0-.715a5.111 5.111 0 1 0 5.111 5.111A5.126 5.126 0 0 0 7.111 2z" transform="translate(-2 -2)"/>
//       </g>
//   </svg>
// `
// const xml_symbol_2 = `
//   <svg xmlns="http://www.w3.org/2000/svg" id="ic_circle2_nor" width="14" height="14" viewBox="0 0 14 14">
//       <defs>
//           <style>
//               .cls-3{fill:#75777a;stroke:#75777a;stroke-width:.5px}
//           </style>
//       </defs>
//       <path id="사각형_5553" fill="none" d="M0 0H10.732V10.732H0z" transform="translate(0.174 0.951)"/>
//       <path id="사각형_5554" fill="none" d="M0 0H14V14H0z" opacity="0.14"/>
//       <g id="그룹_1132" transform="translate(0 0.793)">
//           <g id="그룹_113" transform="translate(1.89 1.207)">
//               <path id="패스_7771" d="M7.111 2.715a4.4 4.4 0 1 1-4.4 4.4 4.428 4.428 0 0 1 4.4-4.4m0-.715a5.111 5.111 0 1 0 5.111 5.111A5.126 5.126 0 0 0 7.111 2z" class="cls-3" transform="translate(-2 -2)"/>
//           </g>
//           <g id="그룹_114" transform="translate(4.036 3.353)">
//               <path id="패스_7772" d="M9.164 6.915a2.249 2.249 0 1 1-2.249 2.249 2.269 2.269 0 0 1 2.249-2.249m0-.715a2.964 2.964 0 1 0 2.964 2.964A2.966 2.966 0 0 0 9.164 6.2z" class="cls-3" transform="translate(-6.2 -6.2)"/>
//           </g>
//       </g>
//   </svg>
// `
// const xml_symbol_3 = `
//   <svg xmlns="http://www.w3.org/2000/svg" id="ic_triangle_nor" width="14" height="14" viewBox="0 0 14 14">
//       <defs>
//           <style>
//               .cls-1{fill:none}
//           </style>
//       </defs>
//       <path id="사각형_5550" d="M0 0H10.655V10.655H0z" class="cls-1" transform="translate(1.357 0.951)"/>
//       <path id="사각형_5551" d="M0 0H14V14H0z" class="cls-1"/>
//       <g id="그룹_112" transform="translate(1.5 2)">
//           <path id="패스_7770" fill="#75777a" stroke="#75777a" stroke-width="0.5px" d="M6.622 3.11a.383.383 0 0 1 .406.254l4.365 7.505a.452.452 0 0 1 0 .507.512.512 0 0 1-.406.254h-8.73c-.254 0-.406-.152-.406-.254a.429.429 0 0 1 0-.507l4.365-7.505a.383.383 0 0 1 .406-.254m0-.71a1.252 1.252 0 0 0-1.066.609l-4.314 7.505a1.212 1.212 0 0 0 1.015 1.826h8.679A1.234 1.234 0 0 0 12 10.514L7.688 3.009A1.252 1.252 0 0 0 6.622 2.4z" transform="translate(-1.08 -2.4)"/>
//       </g>
//   </svg>
// `
// const xml_symbol_4 = `
//   <svg xmlns="http://www.w3.org/2000/svg" id="ic_triangle2_nor" width="14" height="14" viewBox="0 0 14 14">
//       <defs>
//           <style>
//               .cls-1{fill:none}.cls-2{fill:#75777a;stroke:#75777a;stroke-width:.5px}
//           </style>
//       </defs>
//       <path id="사각형_5555" d="M0 0H10.732V10.732H0z" class="cls-1" transform="translate(1.236 0.951)"/>
//       <path id="사각형_5556" d="M0 0H14V14H0z" class="cls-1"/>
//       <g id="그룹_1171" transform="translate(0.479 0.589)">
//           <g id="그룹_115" transform="translate(1.021 1.411)">
//               <path id="패스_7773" d="M6.66 3.115a.386.386 0 0 1 .409.256l4.4 7.564a.456.456 0 0 1 0 .511.516.516 0 0 1-.409.256H2.265c-.256 0-.409-.153-.409-.256a.433.433 0 0 1 0-.511l4.4-7.564a.386.386 0 0 1 .409-.256m0-.715a1.261 1.261 0 0 0-1.073.613l-4.349 7.564a1.221 1.221 0 0 0 1.022 1.84H11a1.244 1.244 0 0 0 1.073-1.84L7.734 3.013A1.261 1.261 0 0 0 6.66 2.4z" class="cls-2" transform="translate(-1.08 -2.4)"/>
//           </g>
//           <g id="그룹_116" transform="translate(3.943 4.682)">
//               <path id="패스_7774" d="M9.455 9.515c.051 0 .1 0 .1.051l1.84 3.169v.1c0 .051-.051.051-.1.051H7.616c-.051 0-.1 0-.1-.051v-.1l1.84-3.169a.178.178 0 0 1 .1-.051m0-.715a.816.816 0 0 0-.715.409L6.9 12.428a.865.865 0 0 0 .715 1.278H11.3a.831.831 0 0 0 .715-1.278L10.171 9.26a.771.771 0 0 0-.715-.46z" class="cls-2" transform="translate(-6.796 -8.8)"/>
//           </g>
//       </g>
//   </svg>
// `

const xml_symbol_1 = `
<svg width="20" height="20" viewBox="0 0 20 20" style={{margin:'auto'}} >
  <circle cx="10" cy="10" r="8" fill="none" stroke="black" strokeWidth="1"/>
</svg>
`
const xml_symbol_2 = `
<svg width="20" height="20" viewBox="0 0 20 20" style={{margin:'auto'}} >
<polygon points="9 2, 18 18, 0 18" stroke="black" fill="none" />
</svg>
`
const xml_symbol_3 = `
<svg width="20" height="20" viewBox="0 0 20 20" style={{margin:'auto'}} >
<circle cx="10" cy="10" r="8" fill="none" stroke="black" strokeWidth="1"/>
<circle cx="10" cy="10" r="4" fill="none" stroke="black" strokeWidth="1"/>
</svg>
`
const xml_symbol_4 = `
<svg width="20" height="20" viewBox="0 0 20 20" style={{margin:'auto'}} >
<polygon points="10 0, 20 20, 0 20" stroke="black" fill="none" />
<polygon points="10 6, 15 16, 5 16" stroke="black" fill="none" />
</svg>
`

const symbolChoiceNumberList = [1, 2, 3, 4]

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

const ContextQuestion = () => {
  const {state}:any = useAppContext()

  const forceUpdate = useForceUpdate();

  const {questionState} = useQuestionContext()
  
  const data = questionState.questionData.data;
  
  
  const [sentenceDataList, setSentenceDataList] = useState(data.sentence_list)
  

  const handleContextQuestionChoice = async (choice_el:any, caq_index:number, sentence_index:number) => {
    
    let newSentenceList = sentenceDataList
    
    var updatedChoiceList = newSentenceList[sentence_index].ca_question[caq_index].choice_list
    
    updatedChoiceList = updatedChoiceList.map((el:any) => {
      if(el.choice_no == choice_el.choice_no){
        return {...el, checked: true}
      }else if(el.checked){
        return {...el, checked: false}
      }else{
        return el;
      }
    })

    updatedChoiceList.sort((a:any, b:any) => a.choice_no > b.choice_no && 1 || -1)
    // if(!newSentenceList[sentence_index].ca_question[caq_index].answer_check){
    //   newSentenceList[sentence_index].ca_question[caq_index].answer_check = true
    // }

    newSentenceList[sentence_index].ca_question[caq_index].choice_list = updatedChoiceList
    
    // setSentenceDataList(newSentenceList)
    
    if(!newSentenceList[sentence_index].ca_question[caq_index].answer_check){

      const ca_question = sentenceDataList[sentence_index].ca_question[caq_index]
      const user_id = state.user.id

      let params =  {
        student_id : user_id,
        question_id: ca_question.id,
        student_answer: choice_el.choice_no,
        is_correct: choice_el.choice_no == ca_question.answer_no ? true : false
      }
      newSentenceList[sentence_index].ca_question[caq_index].answer_check = true

      const response:any = await context_question_solving(params)
      if(response.result == 'success'){
        console.log('respones suc : ', response)
      }else{
        console.log('respones fail : ', response)
      }
    }
    
    setSentenceDataList(newSentenceList)

    forceUpdate()
    
  }

  const getSvgSymbol = (number:any) => {
    switch (number){
      case 1:
        return ( <SvgXml xml={xml_symbol_1} /> )
      case 2:
        return ( <SvgXml xml={xml_symbol_2} /> )
      case 3:
        return ( <SvgXml xml={xml_symbol_3} /> )
      case 4:
        return ( <SvgXml xml={xml_symbol_4} /> )
      
    }
  }
  return (
    <View style={ styles.container }>
      <View style={{ minHeight: HEIGHT - 100 }}>
        <View style={ styles.titleWrapper }>
          <Text style={ styles.title }>전개식</Text>
        </View>

        <View style={ styles.sectionContentWrapperWithTopBorder }>
          {sentenceDataList.map((sentenceData:any, sentence_index:number) => {
            return ( 
              <View key={ Math.random() }
                style={ styles.sentenceDataWrapper }
                >
                
                <View style={{display: 'flex', flexDirection: 'row' }}>
                  <View style={{ width: 26 }} >
                    {sentenceData.sentence.number ? 
                      <Text style={{ textAlign:'center' }}>{sentenceData.sentence.number}</Text>
                      :
                      null
                    }
                  </View>
                  <View style={{ paddingRight: 30 }}>
                    <RenderHtml html = {sentenceData.sentence.content_format} />

                    { sentenceData.ca_question.map((caq_el:any, caq_index:number) => {
                        return (
                          <View style={{display:'flex'}} key={ Math.random() }>
                            <View style={ styles.questionTextBlock }>
                              <View style={ globalStyles.roundNumberWrapper } >
                                <Text style={{fontSize: 12}}>{caq_el.question_no}</Text>
                              </View>
                              <View style={{marginHorizontal: 10}}>
                                <Text>{caq_el.question_text}</Text>
                              </View>
                            </View>
                            <View style={ styles.symbolListWrapper }>
                              { 
                                caq_el.choice_list.map((ca_choice_el:any) => {
                                  return (
                                    // <View style={[styles.topSection, listShow ? {display: 'none'} : null] }>
                                    // <View style={{flex: 1, symbolChoiceNumberList.length != el && {borderRight: 1} }}>
                                    <View 
                                      key= { Math.random() }
                                      style={[styles.symbolContainer, symbolChoiceNumberList.length == ca_choice_el.choice_no && { borderRightWidth: 0} ]}
                                      >
                                      <TouchableOpacity
                                      style={{ alignSelf: 'center' }}
                                      onPress = { () => handleContextQuestionChoice(ca_choice_el, caq_index, sentence_index)  }
                                      // style={{ alignSelf: 'center', borderWidth: 3, backgroundColor: 'green' }}
                                      >
                                        <View style={[styles.symbolWrapper, ca_choice_el.checked && 
                                            ( caq_el.answer_no == ca_choice_el.choice_no ? { backgroundColor: 'rgb(221,246,220)' } : { backgroundColor: 'rgb(254,238,239)' }  )
                                          ]}
                                          >
                                          { getSvgSymbol(ca_choice_el.choice_no) }
                                        </View>
                                      </TouchableOpacity>
                                    </View>
                                  )
                                })
                              }
                            </View>
                          </View>
                        )    
                      })
                    }
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>

    </View>
  );
}

export default ContextQuestion;

export const styles = StyleSheet.create({
  container: {
    flex:1, 
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
  symbolListWrapper: {
    marginHorizontal: 30,
    paddingVertical: 3,
    display:'flex', 
    flexDirection:'row',
    borderWidth: 1,
    // width: 200,
    borderRadius: 5
  },
  symbolContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: 'rgb(232,232,232)'
  },
  symbolWrapper: {
    alignSelf: 'baseline',
    margin:3,
    padding:6,
    // backgroundColor: 'rgb(254,238,239)',
    // borderWidth: 1,
    alignItems: 'center',
    borderRadius: 20
  },
  sectionContentWrapperWithTopBorder:{
    backgroundColor:'#fff',
    flex:1, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingHorizontal: 25,
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
  }
})