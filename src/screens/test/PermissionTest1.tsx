import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, PermissionsAndroid, Alert, BackHandler, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraComponent = ({navigation}:any) => {
  const takePicture = async (camera:any) => {
    
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options)
    navigation.navigate("CameraTest22", {img: data.uri})
    // navigation.navigate("Login")
    console.log("data.uri : ", data.uri);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      >
        {({ camera }) => {
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
const PermissionTest1 = ({navigation}:any) => {
  const [permissionGranted, setPermissionGranted] = useState(true)
  
  const requestPermission = async () => {
    if(Platform.OS == 'android'){

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
          console.log("Permission test all permissions granted")
          setPermissionGranted(true)
        }
        else{
          console.log("no grant result : ", result);
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
  return (
    permissionGranted ? ( 
      <CameraComponent navigation = {navigation}/>
    )
    :
    <View>
      <Text>permission not granted</Text>
    </View>
  )
  
}

export default PermissionTest1;


const styles= StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems:'center',
    // backgroundColor:'black'
    backgroundColor:'rgb(222,222,222)'
  },
  camera: {
    display:'flex', 
    flex:1, 
    justifyContent:'flex-end',
    alignSelf: "stretch",
  },
  MainSearchButtonWrapper: {
    // backgroundColor:'blue',
    borderWidth:3, borderColor:'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(42,147,255, 0.13)',
    borderRadius: 52,
    width: 110, 
    height: 110,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center'
    
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