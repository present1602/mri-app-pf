import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AmazingCropper from 'react-native-amazing-cropper';;
import CustomCropperFooter from './CustomCropperFooter';
import axios from 'axios'
import { apiServerUrl } from '../../config';
import { useAppContext } from '../../provider/RootProvider';
import { useQuestionContext } from '../../provider/QuestionProvider';
import { handleQuestionData } from '../../common/util';
import { StackActions } from '@react-navigation/native';
import { WIDTH } from '../../constant/ui';


const Cropper = ({route, navigation}:any) => {
  
  const {questionState, setQuestionData} = useQuestionContext()


  const onDone = async (croppedImageUri:string) => {
    console.log('croppedImageUri = ', croppedImageUri);

    navigation.replace("OCRInProgress", {imgUrl: croppedImageUri})
    

    // var photo = {
    //   uri: croppedImageUri,
    //   type: 'image/jpg',
    //   name: 'question_image.jpg',
    // };

    // const data = new FormData();
    // data.append('file', photo)
    // data.append('user_id', user_id)
    
    // const response:any = await sendImage(data)


    // console.log("ocr response : ", response)
    // if(response.result == 'success' && response.aid){
    //   const data:any = await handleQuestionData(response.aid)
    //   console.log("ocr aid data : ", data)
    //   setQuestionData(data)
    // }

  }

  const onError = (err:any) => {
    console.log(err);
  }

  const onCancel = () => {
    console.log('Cancel button was pressed');
    // navigate back
  }

  useEffect(() => {
    console.log("route.params.img : ", route.params.img)
    if(questionState.loading){
      navigation.navigate("QuestionScreen")
    }
  }, [questionState])

  return (
    <AmazingCropper
      onDone={onDone}
      onError={onError}
      onCancel={onCancel}
      imageUri={route.params.img.uri}
      imageWidth={route.params.img.width}
      imageHeight={route.params.img.height}

      // imageWidth={route.params.img.width > route.params.img.height ?  route.params.img.height : route.params.img.width}
      // imageHeight={route.params.img.width > route.params.img.height ?  route.params.img.width : route.params.img.height}
      
      // imageWidth={WIDTH}
      // imageHeight={route.params.img.height* WIDTH/route.params.img.width}
      // imageWidth={1600}
      // imageHeight={2496}
      NOT_SELECTED_AREA_OPACITY={0.3}
      BORDER_WIDTH={20}
      footerComponent={<CustomCropperFooter />}
    />
  );
}

export default Cropper;