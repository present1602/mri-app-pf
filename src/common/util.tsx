import { get_question_data } from "../api/question"
import { useQuestionContext } from "../provider/QuestionProvider";


export const handleQuestionData = async (aid:string) => {

  // const { questionState, setQuestionData, requestQuestionData } = useQuestionContext(); 
  
  // console.log("1questionState : ", questionState)
  // requestQuestionData(aid)


  const NUMBER_CHOICE_LIST = [
    {choice_no: 1, choice_text:'1', checked: false},
    {choice_no: 2, choice_text:'2', checked: false},
    {choice_no: 3, choice_text:'3', checked: false},
    {choice_no: 4, choice_text:'4', checked: false},
    {choice_no: 5, choice_text:'5', checked: false},
  ]
  const ALPHABET_CHOICE_LIST = [
    {choice_no: 1, choice_text:'(a)', checked: false},
    {choice_no: 2, choice_text:'(b)', checked: false},
    {choice_no: 3, choice_text:'(c)', checked: false},
    {choice_no: 4, choice_text:'(d)', checked: false},
    {choice_no: 5, choice_text:'(e)', checked: false},
  ]


  const response = await get_question_data(aid) 
  if(response.result == 'success' && response.data){

    // console.log("2questionState : ", questionState)
    

    const data = response.data
    const aid = data.article.aid
    // const bs_question_count = data.article.aid
    // const bs_solution = data.bs_solution
    // const sentence_list = data.sentence
    let article:any = {
      content_format: data.article.content_format,
    }
    if(['10', '11', '12'].includes(data.article.grade)){
      switch (data.article.grade){
        case '10':
          article.gradeText = '고1' 
          break
        case '11':
          article.gradeText = '고2' 
          break
        case '12':
          article.gradeText = '고3' 
          break
        default:
          return
      }
    }
    if(data.article.test_date.length == 6){
      article.test_date = data.article.test_date.substring(2)
      // article.month = data.test_date.substring(4)
    }
    // console.log("sentence_lsit : ", sentence_list)
    // console.log("bs_solution : ", bs_solution)
    
    if(data.article.video_url){
      article.video_url = data.article.video_url
    }

    const formula = {
      formula_id : data.article.formula_id,
      formula_image_path: data.formula.image_path,
      formula_solution_image_path : data.article.formula_image_path
    }
    
    const bs_solution = data.bs_solution.map((el:any) => {
      return {
        order: el.order,
        image_path: el.image_path, 
      }
    })
    
    let bs_question = data.bs_question.map((el:any) => {

      let bs_question:any = {
        id: el.bs_question.id,
        question_no: el.bs_question.question_no,
        answer_no: el.bs_question.answer_no,
        question_text: el.bs_question.question_text,
        choice_type: el.bs_question.choice_type
      }
      if(el.bs_question.choice_type == '30'){
        bs_question.choice_list = el.bs_choice.map((choice_el:any) => {
          return {
            choice_no: choice_el.choice_no,
            choice_text: choice_el.choice_text,
            // is_answer: el.bs_question.answer_no == choice_el.choice_no ? true : false
            checked: false
          }
        })
      }else if(el.bs_question.choice_type == '10'){
        bs_question.choice_list = NUMBER_CHOICE_LIST
      }else if(el.bs_question.choice_type == '20'){
        bs_question.choice_list = ALPHABET_CHOICE_LIST
      }
      return bs_question;
    });

    let checkContextQuestion = false;
    let checkBlankQuestion = false;

    const getContextQuestionChoiceList = (answer:any) => {
      const choiceNumbers = [1, 2, 3, 4]
      
      return choiceNumbers.map((choice_no:number) => (
        {choice_no: choice_no, checked: false, is_answer: choice_no == answer ? true : false }
      ))
    }
    const sentence_list = data.sentence.map((el:any) => {

      if(!checkContextQuestion && el.ca_question.length > 0){
        checkContextQuestion = true;
      }
      if(!checkBlankQuestion && el.bl_question.length > 0){
        checkBlankQuestion = true;
      }
      return {
        sentence: {
          number: el.article_sentence.number,
          content: el.article_sentence.content,
          content_format: el.article_sentence.content_format,
        },
        ca_question: el.ca_question.map((caq_el:any) => {
          return {
            id: caq_el.id,
            answer_no: caq_el.answer_no,
            question_no: caq_el.question_no,
            question_text: caq_el.question_text,
            answer_check: false,
            choice_list: getContextQuestionChoiceList(caq_el.answer_no)
          }
        }),
        // bl_question: el.bl_question.map((blq_el:any) => {
        //   return {
        //     id: blq_el.id,
        //     answer_text: blq_el.answer_text,
        //     question_text: blq_el.question_text,
        //     full_text: blq_el.full_text,
        //   }
        // })

      }
    })

    let blSentenceList:any = []  // { hasBlQuestion: true / false, }
    

    data.sentence.map((sentence_el:any) => {
      const sentenceText = sentence_el.article_sentence.content
      
      let segArr:any = []
      
      const blQuestionList = sentence_el.bl_question

      if(blQuestionList.length == 0){
        blSentenceList.push({
          hasBlQuestion : false,
          sentence: sentenceText,
          sentence_number: sentence_el.article_sentence.number
        })
        return;
      }
      
      for(var i=0; i< blQuestionList.length; i++){
        const blQuestionEl = blQuestionList[i]
        const fullText = blQuestionEl.full_text
        const questionText = blQuestionEl.question_text
        

        if(segArr.length == 0){
          const startIndex = sentenceText.indexOf(fullText)
          
          const endIndex = startIndex + fullText.length

          const prevSeg = sentenceText.substring(0, startIndex)
          const nextSeg = sentenceText.substring(endIndex)

          const  prevSegEl = ({
            text: prevSeg,
            is_question: false
          })

          const questionSegEl = ({
            text: questionText,
            is_question: true,
            is_answer_open: false,
            question_data:{
              full_text: fullText,
              question_text : questionText,
              answer_text : blQuestionEl.answer_text
            }
          })

          const nextSegEl = ({
            text: nextSeg,
            is_question: false,
          })
          
          segArr = [prevSegEl, questionSegEl, nextSegEl]
        }else{
          
          const lastSegData = segArr.pop()
          const lastSegText = lastSegData.text
          
          const startIndex = lastSegText.indexOf(fullText)
          const endIndex = startIndex + fullText.length

          const prevSeg = lastSegText.substring(0, startIndex)
          const nextSeg = lastSegText.substring(endIndex)

          const  prevSegEl = ({
            text: prevSeg,
            is_question: false
          })

          const questionSegEl = ({
            text: questionText,
            is_question: true,
            is_answer_open: false,
            question_data:{
              full_text: fullText,
              question_text : questionText,
              answer_text : blQuestionEl.answer_text
            }
          })

          const nextSegEl = ({
            text: nextSeg,
            is_question: false,
          })

          segArr = [...segArr, prevSegEl, questionSegEl, nextSegEl]
        }        
      }

      blSentenceList.push({
        has_question: true,
        sentence_number: sentence_el.article_sentence.number,
        seg_arr : segArr
      })
      
      // sentence_el.bl_question.map((blq_el:any) => {
      //   const fullText = blq_el.full_text
      //   const startIndex = content.indexOf(fullText)
      //   const endIndex = startIndex + fullText.length

      //   segIndexArr.push({
                    
      //   })

      // })
      

    })
    
    const ap_question = data.ap_question.map((ap_el:any) => {
      let item:any = {
        order: ap_el.order,
        // answer_no: ap_el.answer_no,
        question_image_path: ap_el.question_image_path,
      }
      if([1,2,3,4,5].includes(ap_el.answer_no)){
        item.answer_no = ap_el.answer_no,
        item.choice_list = NUMBER_CHOICE_LIST
      }
      return item
    })

    let questionData:any= {
      aid: aid,
      isQuestionSet: true,
      bs_question_count: data.article.question_count,
      page: 1,
      data: {
        article: article,
        formula: formula,
        bs_question: bs_question,
        sentence_list: sentence_list,
        bl_sentence_list: blSentenceList,
        initial_bl_sentence_list: blSentenceList,
        bs_solution: bs_solution,
        ap_question: ap_question,
      }
    }

    // bl_question
    
    let pageList:any = [{number:1, content:"question", title:'문제', active:true}]

    
    if(checkContextQuestion){
      let pageNumber = pageList[pageList.length-1]['number']
      pageList.push({number:pageNumber+1, content:'ca_question', title:'전개식', active:false})
    }
    if(checkBlankQuestion){
      let pageNumber = pageList[pageList.length-1]['number']
      pageList.push({number:pageNumber+1, content:'bl_question', title:'빈칸문제', active:false})
    }
    if(ap_question.length > 0){
      let pageNumber = pageList[pageList.length-1]['number']
      pageList.push({number:pageNumber+1, content:'ap_question', title:'변형문제', active:false})
    }
    
    questionData.page_list = pageList

    return questionData
  }
  
  
  
}