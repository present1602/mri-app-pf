import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, PermissionsAndroid, Platform, BackHandler, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      // flex: 1,
      backgroundColor: 'blue',
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View></View>
  </View>
);

// const checkReadContactsPermission = async ()=>{    

//   //result would be false if not granted and true if required permission is granted.
//   const result =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
//   return result;
// }

const OCR = ({navigation}:any) => {
  // const [ready, setReady] = useState(false)
  // const requestPermissions = async () => {
  //   Alert.alert("request permission call")
  //   await PermissionsAndroid.requestMultiple([
  //     PermissionsAndroid.PERMISSIONS.CAMERA,
  //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  //   ]).then((result) => {
  //     if(result['android.permission.CAMERA']
  //       && result['android.permission.READ_EXTERNAL_STORAGE']
  //       && result['android.permission.WRITE_EXTERNAL_STORAGE']
  //       == 'granted'
  //     )
  //     {
  //       Alert.alert("request permission granted all")
  //     }
  //     else{
  //       Alert.alert("request permission not granted all")
  //       Alert.alert(
  //         "MRI",
  //         "앱 이용을 위해 [설정] > [애플리케이션]에서 카메라와 미디어파일 접근 권한을 허용해주세요",
  //         [{text:'앱 종료', onPress: () => { BackHandler.exitApp()} }]
  //       )
  //     }
  //   })
  // }
  
  // const handlePermissions = async () => {
    
  //   if(Platform.OS == 'android'){
  //     const cameraPermissionState =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
  //     const writeStoragePermissionState =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  //     const readStoragePermissionState =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
  //     console.log("cameraPermissionState : ", cameraPermissionState)
  //     console.log("readStoragePermissionState : ", readStoragePermissionState)
  //     console.log("writeStoragePermissionState : ", writeStoragePermissionState)
  //     if(!cameraPermissionState || !writeStoragePermissionState || !readStoragePermissionState){
  //       requestPermissions()
  //     }
  //   }
    
  // }
  useEffect(() => {
    // handlePermissions();
  }, [])

  const takePicture = async function(camera:any) {
    
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    // navigation.navigate("CameraTest22", {img: data.uri})
    navigation.navigate("UserScreens")
    console.log("data.uri : ", data.uri);
  };
  
  return (
    <View style={styles.container}>
      <RNCamera
        // style={styles.preview}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        // flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: '권한 요청',
          message: '앱 이용을 위해 카메라 권한을 허용해주세요',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        // androidRecordAudioPermissionOptions={{
        //   title: 'Permission to use audio recording',
        //   message: 'We need your permission to use your audio',
        //   buttonPositive: 'Ok',
        //   buttonNegative: 'Cancel',
        // }}
      >
        {({ camera, status }) => {
          // if (status !== 'READY') return <PendingView />;
          return (
            <View style= {styles.MainSearchButtonWrapper}>
              <TouchableOpacity onPress={() => takePicture(camera)} style={styles.MainSearchButton}>
                <Image source = {require('../../assets/img/main_search_icon.png')} style={ styles.MainSearchImage} />
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

export default OCR;

const styles= StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems:'center',
    backgroundColor:'rgb(222,222,222)'
  },
  camera: {
    display:'flex', 
    flex:1, 
    justifyContent:'flex-end'
  },
  MainSearchButtonWrapper: {
    borderWidth:3, borderColor:'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(42,147,255, 0.13)',
    borderRadius: 52,
    width: 110, 
    height: 110,
    display: 'flex',
    justifyContent: 'center',
    // position: 'absolute',
    // bottom: 10,
    
  },
  MainSearchButton : {
    backgroundColor: '#fff',
    borderRadius: 44,
    width: 88,
    height: 88,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  MainSearchImage: {
    width: 40,
    height: 40
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})