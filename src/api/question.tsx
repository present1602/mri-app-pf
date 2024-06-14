import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { apiServerUrl, serverAuthToken } from '../config'



type questionListRequestParams = {
  grade: string,
  date: string,
} 

export const get_question_list = async (params:questionListRequestParams) =>{
  console.log("get_question_list call")
  return await fetch(apiServerUrl + "/question/list", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Authorization": serverAuthToken
    },
    body: JSON.stringify(params),
  })
  .then((res) => res.json())
  .then((json) => {
    console.log("q list json : ", json)    
    return json
  })
}

export const get_question_data = async (aid:string) =>{
  console.log("get_question_data call")
  return await fetch(apiServerUrl + `/question/data?aid=${aid}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      // "Authorization": serverAuthToken
    },
  })
  // .then((res) => console.log("res1 : ", res))
  
  .then((res) => res.json())
  .then((json) => {
    // console.log("q data json : ", json)   
    
    return json
  })
}

export const context_question_solving = async(params:any) => {
  console.log('context_question_solving call params : ', params)
  return await fetch(apiServerUrl + "/question/context_question/try", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  })
  .then((res) => res.json())
  .then((json) => {
    return json
  })
}

export const get_user_search_question_list = async (student_id: number) => {
  const params = {user_id: student_id}
  return await fetch(apiServerUrl + '/question/user_history', {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params)
  })
  .then((res) => res.json())
  .then((json) => {
    return json
    // console.log("-history result : ", result)
    // setQuestionList(result)
  })
} 