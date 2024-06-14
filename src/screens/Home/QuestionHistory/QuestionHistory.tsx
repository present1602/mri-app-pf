import React, { useEffect, useState } from 'react';
import QuestionHistoryEmpty from './QuestionHistoryEmpty'
import QuestionHistoryContent from './QuestionHisyoryContent'

import QuestionListItem from '../component/QuestionListItem'
import { useAppContext } from '../../../provider/RootProvider';
import { get_user_search_question_list } from '../../../api/question';
import { handleQuestionData } from '../../../common/util';
import { useQuestionContext } from '../../../provider/QuestionProvider';
import { useNavigation } from '@react-navigation/native';



const QuestionHistory = () => {

  const [questionList, setQuestionList] = useState([])
  const navigation = useNavigation()
  const [content, setContent] = useState<any>(null)
  const {questionState, setQuestionData} = useQuestionContext()

  const {state} = useAppContext()

  const onPressItem = async (aid:string) => {
    const data:any = await handleQuestionData(aid)

    console.log("questino history onpress data1 : ", data.data.bs_question[0])
    console.log("questino history onpress data2 : ", data.data.bs_question[1])
    setQuestionData(data)
  }

  const loadContent = async () => {
    
    if(state.user && state.user.id){
      const user_id = state.user.id
      const response = await get_user_search_question_list(user_id)
      console.log("history response : ", response)
      if(response.result =='success' && response.data){
        const filterList = response.data.filter((el:any) => el.question_list.length > 0 )
        if(filterList.length > 0){
          setContent(<QuestionHistoryContent questionList={filterList} onPressItem={onPressItem} />)
        }else{
          setContent(<QuestionHistoryEmpty />)
        }
      }else{
        setContent(<QuestionHistoryEmpty />)
      }
    }else{
      setContent(<QuestionHistoryEmpty />)
    }
  }

  useEffect(() => {
      loadContent()
  }, [])


  useEffect(() => {
    if(questionState.loading){
      navigation.navigate("QuestionScreen")
    }
  // }, [questionState.questionData.aid])
  }, [questionState.loading])

  return (
    <>
      {content}
    </>
    
  );
}

export default QuestionHistory;

