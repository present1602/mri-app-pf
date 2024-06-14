import React, { Fragment, Component, useEffect } from 'react';
// import ImagePicker from 'react-native-image-picker';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  BackHandler,
  Alert,
  Platform
} from 'react-native';
import CameraTest2 from './CameraTest2'
import ImagePicker from 'react-native-image-crop-picker'

const CameraTest4 = ({navigation}:any) => {
  const requestPermission = async () => {
    if(Platform.OS == 'android'){
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then((result) => {
      })
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      ]).then((result) => {
        if(result['android.permission.CAMERA']
          && result['android.permission.READ_EXTERNAL_STORAGE']
          && result['android.permission.WRITE_EXTERNAL_STORAGE']
          == 'granted'
        )
        {
          console.log("testcamera4 all permissions granted")
          // ImagePicker.openCamera({
          //   width: 300,
          //   height: 400,
          //   cropping: true,
          // }).then(image => {
          //   console.log(image);
          // });
          takePhoto()
        }
        else{
          Alert.alert(
            "MRI",
            "앱 이용을 위해 [설정] > [애플리케이션]에서 카메라와 미디어파일 접근 권한을 허용해주세요",
            [{text:'앱 종료', onPress: () => { BackHandler.exitApp()} }]
          )
        }
      })
    }
  }

  useEffect(() => {
    requestPermission()
  }, [])
  
  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  

  const takePhoto = () => {
    // Alert.alert("tk")
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log("take picrue then")
      console.log(image);
      const imgPath = image.path
      navigation.navigate("CameraTest2")
    });
    
    // ImagePicker.launchCamera({mediaType: 'photo', includeBase64: true}, (response:any) => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else {
    //   }
    // })
    // ImagePicker.openCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then(image => {
    //   console.log(image);
    // });
  }

  return (
    <View>
      <TouchableOpacity onPress = { () => takePhoto() }>
        <Text style={{ margin: 15, fontSize: 22}}> img test 4 </Text>
      </TouchableOpacity>

    </View>
  );
}

export default CameraTest4;