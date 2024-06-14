import { StackActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { handleQuestionData } from '../../common/util';
import { apiServerUrl } from '../../config';
import { useQuestionContext } from '../../provider/QuestionProvider';
import { useAppContext } from '../../provider/RootProvider';
import * as Progress from 'react-native-progress';
import { HEIGHT } from '../../constant/ui';
import axios from 'axios';

const OCRInProgress = ({route, navigation}:any) => {
  const {state} = useAppContext()
  const {questionState, setQuestionData} = useQuestionContext()

  const sendImage = async (form:any) => {
    
    // const response = await axios({
    //   url    : apiServerUrl + '/question/ocr',
    //   method : 'POST',
    //   data   : form,
    //   headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'multipart/form-data',
    //           'Authorization':'Basic YnJva2VyOmJyb2tlcl8xMjM='
    //         }
    //     })
    //     .then(function (response) {
    //             console.log("response :", response);
    //   })
    //   .catch(function (error) {
    //             console.log("error from image :");
    //   })

    console.log("sendimage() ocrinprogress")
    try {
      // let response:any = {}
      const response:any = await axios.post(apiServerUrl + '/question/ocr',
        form,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization':'Basic YnJva2VyOmJyb2tlcl8xMjM='
          }
        })
      .then(function (res:any) {
          console.log("response.data :", res.data);
          return res.data
      })
        
      if(response.result == 'success' && response.aid){
        const data:any = await handleQuestionData(response.aid)
        setQuestionData(data)
        // navigation.replace("QuestionScreen")
      }
      else if(response.result == 'fail'){
        navigation.replace("OCRFail");
      }

      // const response = await fetch(apiServerUrl + '/question/ocr', {
      //   method: 'POST',
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "multipart/form-data",
      //   },
      //   body: form
      // })
      // .then((res) => res.json())
      // .then((json) => {
      //   return json
      // })
    
      if(response.result == 'success' && response.aid){
        const data:any = await handleQuestionData(response.aid)
        console.log("ocr aid data.aid : ", data.aid)
        setQuestionData(data)
        // navigation.replace("QuestionScreen")
      }
      else if(response.result == 'fail'){
        navigation.replace("OCRFail");
        // navigation.dispatch(
        //   StackActions.replace("OCRFail")
        // )
      }
    }catch(error){
      console.log("ocr error : ", error)
      navigation.navigate("OCRFail")
    }

    // new Promise((resolve,reject) => {
  
    //   var data = new FormData();
    //   data.append('image',
    //     {
    //        uri:image,
    //        name:'userProfile.jpg',
    //        type:'image/jpg'
    //     });
    //   });
  }
  
  
  console.log("in ocrinprogess route.params : ", route.params)
  const imgUrl = route.params.imgUrl;

  useEffect(() => {
    const user_id:any = state.user?.id
    console.log("ue in ocrinprogress")
    var photo = {
      uri: imgUrl,
      type: 'image/jpg',
      name: 'question_image.jpg',
    };

    const data = new FormData();
    data.append('file', photo)
    data.append('user_id', user_id)
    sendImage(data)

  }, [])

  useEffect(() => {
    console.log("ocrinprogress questionState : ", questionState)
    
    if(questionState.loading){
      navigation.navigate("HomeScreens", {screen: "QuestionScreen"})
    }
  }, [questionState])


  return (
    <View style={ styles.container }>
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Image style={{ height: (HEIGHT/2) - 50, width: '100%', alignSelf: 'center' }} source={{ uri: imgUrl }}  />
      </View>
      
      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, height:200,}}>
        <View style={{display:'flex', alignItems: 'center'}}>
          <Progress.Circle size={60} indeterminate={true} />
        </View>
        <View style={{marginVertical: 30}}>
          <Text style={{ textAlign:'center', fontSize: 18 }}>문제를 인식중입니다</Text>
        </View>
      </View>
    </View>
  );
}

export default OCRInProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff'
  }
})