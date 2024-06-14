import React, { Component } from 'react';
import AmazingCropper from 'react-native-amazing-cropper';;

const CameraTest2 = ({route, navigation}:any) => {
  console.log("route.params : ", route.params)
  console.log("route.params.img : ", route.params.img)

  const onDone = (croppedImageUri:string) => {
    console.log('croppedImageUri = ', croppedImageUri);
    // send image to server for example
  }

  const onError = (err:any) => {
    console.log(err);
  }

  const onCancel = () => {
    console.log('Cancel button was pressed');
    // navigate back
  }

  return (
    <AmazingCropper
      onDone={onDone}
      onError={onError}
      onCancel={onCancel}
      imageUri={route.params.img}
      imageWidth={1600}
      imageHeight={2396}
      NOT_SELECTED_AREA_OPACITY={0.3}
      BORDER_WIDTH={20}
    />
  );
}

export default CameraTest2;

// import React, { useEffect, useState } from 'react';
// import { View, Text, Platform, Alert, Image } from 'react-native';
// import { PermissionsAndroid } from 'react-native'
// import ImagePicker from 'react-native-image-crop-picker';
// import ImageEditor from "@react-native-community/image-editor";
// import { TouchableOpacity } from 'react-native-gesture-handler';
// // import DynamicCropper from 'react-native-dynamic-cropper';

// const timg = 'https://images.chosun.com/resizer/taI1PaMAxWVDBw3j1n0ZUoj0eB8=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/DTPZSPJJJRAWXLDE66PUOIVAF4.jpg';
// const timg2 = 'https://news.hmgjournal.com/images_n/contents/jeju_190828_01.jpg'

// const CameraTest = () => {
//   const [timgPath, setTimagePath] = useState(timg)

//   const requestPermission = async () => {
//     if (Platform.OS === "android") {
//         await PermissionsAndroid.requestMultiple([
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         ]).then((result)=>{
//             if (result['android.permission.CAMERA']
//             && result['android.permission.WRITE_EXTERNAL_STORAGE']
//             && result['android.permission.READ_EXTERNAL_STORAGE']
//             === 'granted') {
//               console.log("모든 권한 획득");
//             } else{
//               console.log("권한거절");
//             }
//         })
      
//     }else{

//     }
//  }
//  type paramType = {
//   offset : any,
//   size : any,
//   displaySize : any,
//   resizeMode: any
//  }

//  type cropDataParam = {
//   offset: any,
//   size: any,
//   displaySize: any,
//   // resizeMode: 'contain' | 'cover' | 'stretch',
//   resizeMode: any,
//  }
//  const cropData:cropDataParam = {
//   offset: {x: 50, y: 50},
//   size: {width: 200, height: 150},
//   displaySize: {width: 200, height: 200},
//   // resizeMode: 'contain' | 'cover' | 'stretch',
//   resizeMode: 'contain',
// };
  
//   // const 
//   useEffect(() => {
//     requestPermission()
//     ImageEditor.cropImage(timg, cropData).then(url => {
//       console.log("Cropped image uri", url);
//       setTimagePath(url)
//     })

//   }, [])
//   return (
//     <View>
//       <Text>camera test</Text>
//       <View>
//         <Image source = {{uri: timgPath}} style={{width:300, height:200}}/>
//       </View>
//       <TouchableOpacity onPress = { () => setTimagePath(timg2) }>
//         <Text style={{margin:20, fontSize:30}}>이미지2 변경</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress = { () => setTimagePath(timg) }>
//         <Text style={{margin:20, fontSize:30}}>이미지1 변경</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// export default CameraTest;