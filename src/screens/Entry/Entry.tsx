import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, PermissionsAndroid, Alert, BackHandler, Dimensions, SafeAreaView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker, { launchImageLibrary }  from 'react-native-image-picker'
import { apiServerUrl } from '../../config';




const CameraComponent = ({navigation}:any) => {
  
  const takePicture = async (camera:any) => {
    
    let options:any = {}
    if(Platform.OS == 'android'){
      options = { quality: 0.5, base64: true, fixOrientation: true, };
    }else if(Platform.OS = 'ios'){
      options = { quality: 0.5, base64: true, forceUpOrientation: true, };
    }
    const data = await camera.takePictureAsync(options);
    navigation.navigate("OCRScreens", {screen:"Cropper",params:{img: data} })
    // navigation.navigate("Login")
  };

  const openImageLibrary = async () => {

    launchImageLibrary({mediaType: 'photo'}, (response:any) => {
      console.log("Test3 response : ", response)
      
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const data = response.assets[0]
        console.log("else response uri : ", response.assets[0])
        console.log("else response assets : ", response.assets[0])
        navigation.navigate("OCRScreens", {screen:"Cropper", params:{img: data} })
      }
    })
  }

  // useEffect(() => {
  //   var form = new FormData()
  //   form.append("file", photo)
  //   form.append("user_id", 40)

  //   sendImage(form)
  // }, [photo])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageLibraryButtonWrapper}>
        <TouchableOpacity onPress = { () =>  openImageLibrary() }>
          <Image source = {require('../../assets/img/image_library_icon.png')}  />
        </TouchableOpacity>
      </View>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        // ratio={'4:4'}
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
    </SafeAreaView>
  );
}


const OCREntry = ({navigation}:any) => {
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

export default OCREntry;


const styles= StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    // backgroundColor:'black'
    backgroundColor:'rgb(222,222,222)'
  },
  imageLibraryButtonWrapper: {
    position: 'absolute', 
    zIndex: 10, 
    margin: 12, 
    paddingHorizontal: 12,
    paddingVertical: 16
  },
  camera: {
    display:'flex', 
    alignItems:'center',
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
