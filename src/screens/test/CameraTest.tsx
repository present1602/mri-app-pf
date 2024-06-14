import React, { useEffect, useState } from 'react';
import { View, Text, Platform, Alert, Image } from 'react-native';
import { PermissionsAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
// import DynamicCropper from 'react-native-dynamic-cropper';


// const timg = 'https://images.chosun.com/resizer/taI1PaMAxWVDBw3j1n0ZUoj0eB8=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/DTPZSPJJJRAWXLDE66PUOIVAF4.jpg';
const timg = 'file:///data/user/0/com.mriapp/cache/Camera/c0b3d962-40c4-47da-ae00-f63947fd6744.jpg';
const timg2 = 'https://news.hmgjournal.com/images_n/contents/jeju_190828_01.jpg'

const CameraTest = () => {
  const [timgPath, setTimagePath] = useState(timg)

  const requestPermission = async () => {
    if (Platform.OS === "android") {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]).then((result)=>{
            if (result['android.permission.CAMERA']
            && result['android.permission.WRITE_EXTERNAL_STORAGE']
            && result['android.permission.READ_EXTERNAL_STORAGE']
            === 'granted') {
              console.log("모든 권한 획득");
            } else{
              console.log("권한거절");
            }
        })
      
    }else{

    }
 }
 type paramType = {
  offset : any,
  size : any,
  displaySize : any,
  resizeMode: any
 }

 type cropDataParam = {
  offset: any,
  size: any,
  displaySize: any,
  // resizeMode: 'contain' | 'cover' | 'stretch',
  resizeMode: any,
 }
 const cropData:cropDataParam = {
  offset: {x: 50, y: 50},
  size: {width: 200, height: 150},
  displaySize: {width: 200, height: 200},
  // resizeMode: 'contain' | 'cover' | 'stretch',
  resizeMode: 'contain',
};
  
  // const 
  useEffect(() => {
    requestPermission()
    // ImageEditor.cropImage(timg, cropData).then(url => {
    //   console.log("Cropped image uri", url);
    //   setTimagePath(url)
    // })
    
    

    // console.log(image);

    // ImagePicker.openCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: false,
    // }).then(image => {
    //   // ImageEditor.cropImage(image.path, cropData).then(url => {
    //   //   console.log("Cropped image uri", url);
    //   // })
    //   console.log(image);
    // });

  }, [])
  return (
    <View>
      <Text>camera test</Text>
      <View>
        <Image source = {{uri: timgPath}} style={{width:300, height:200}}/>
      </View>
      <TouchableOpacity onPress = { () => setTimagePath(timg2) }>
        <Text style={{margin:20, fontSize:30}}>이미지2 변경</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress = { () => setTimagePath(timg) }>
        <Text style={{margin:20, fontSize:30}}>이미지1 변경</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CameraTest;